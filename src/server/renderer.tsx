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
  // todo: helmet

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

  try {
    htmlBody = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <StaticRouter location={req.url}>
              <App />
            </StaticRouter>
          </Hydrate>
        </QueryClientProvider>
      )
    );

    styleTags = sheet.getStyleTags();
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }

  res.send(`
    <!DOCTYPE HTML>
    <html>
      <head>
        ${styleTags}
        <script defer src="/static/bundle.js"></script>
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
