import * as express from "express";

export const renderer = (req: express.Request, res: express.Response) => {
  res.send(`
    <!DOCTYPE HTML>
    <html>
      <head>
        <script defer src="/static/bundle.js"></script>
      </head>
      <body>
        <div id="app-root"></div>
      </body>
    </html>
  `);
};
