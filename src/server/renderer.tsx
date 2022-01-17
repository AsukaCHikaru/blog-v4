import * as express from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ServerStyleSheet } from "styled-components";
import { HelmetProvider, FilledContext } from "react-helmet-async";

import { App } from "client/App";
import { parseNotionPageListResponse } from "client/utils/parsers";
import {
  getNotionBlockList,
  getNotionPageList,
} from "server/notionApiServices";
import {
  POST_DETAIL_QUERY_KEY,
  POST_LIST_QUERY_KEY,
} from "client/services/apiCore";
import { PostSummary } from "client/types";

export const renderer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (
    /\/api\/postList/.test(req.path) ||
    /\/api\/postDetail\/\w+/.test(req.path)
  ) {
    next();
    return;
  }

  let htmlBody = "";

  // React Query prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    POST_LIST_QUERY_KEY,
    async (): Promise<PostSummary[]> => {
      const data = await getNotionPageList();

      return parseNotionPageListResponse(data);
    }
  );
  if (/post\/\w+/.test(req.path)) {
    const postPathname = req.path.replace(/\/post\/(.+)/, "$1");
    const postId = queryClient
      .getQueryData<PostSummary[]>(POST_LIST_QUERY_KEY)
      ?.find((post) => post.pathname === postPathname)?.id;

    if (postId) {
      await queryClient.prefetchQuery(
        [POST_DETAIL_QUERY_KEY, postId],
        async () => {
          const data = await getNotionBlockList(postId);
          return data;
        }
      );
    }
  }
  const dehydratedState = dehydrate(queryClient);

  // styled-components
  const sheet = new ServerStyleSheet();
  let styleTags = "";

  // React Helmet Async
  const helmetContext = {};
  let helmet;

  try {
    htmlBody = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <StaticRouter location={req.url}>
              <HelmetProvider context={helmetContext}>
                <App />
              </HelmetProvider>
            </StaticRouter>
          </Hydrate>
        </QueryClientProvider>
      )
    );

    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.error(error);
  } finally {
    helmet = helmetContext as FilledContext;
    sheet.seal();
  }

  res.send(`
    <!DOCTYPE HTML>
    <html>
      <head>
        ${helmet.helmet.title.toString()}
        ${helmet.helmet.link.toString()}
        ${helmet.helmet.meta.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        ${styleTags}
        <script defer src="/static/bundle.js"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400&display=swap');
        </style>
      </head>
      <body>
        <div id="app-root">
          ${htmlBody}
        </div>
        <script>
          window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
        </script>
      </body>
    </html>
  `);
};
