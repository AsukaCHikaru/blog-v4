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

import { App } from "client/App";
import { parseNotionPageListResponse } from "client/utils/parsers";
import { getNotionPageList } from "server/notionApiServices";

export const renderer = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (/\/api\/postList/.test(req.path) || /\/api\/postDetail/.test(req.path)) {
    next();
    return;
  }

  let htmlBody = "";
  // todo: helmet
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("postList", async () => {
    const data = await getNotionPageList();

    return parseNotionPageListResponse(data);
  });
  const dehydratedState = dehydrate(queryClient);

  try {
    htmlBody = ReactDOMServer.renderToString(
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <StaticRouter location={req.url}>
            <App />
          </StaticRouter>
        </Hydrate>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error(error);
  }

  res.send(`
    <!DOCTYPE HTML>
    <html>
      <head>
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
