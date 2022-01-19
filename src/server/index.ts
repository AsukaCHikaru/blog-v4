import * as express from "express";
import { resolve } from "path";

import { apiProxyHandler } from "server/apiProxyHandler";
import { renderer } from "server/renderer";

const APP_PORT = process.env.PORT || 3000;

const app = express();

app.use("/static", express.static(resolve(__dirname, "../static")));

app.use(apiProxyHandler);

app.use(renderer);

app.listen(APP_PORT);
