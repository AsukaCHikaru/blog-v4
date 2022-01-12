import * as express from "express";
import { resolve } from "path";

import { apiProxyHandler } from "./apiProxyHandler";
import { renderer } from "./renderer";

const app = express();

app.use("/static", express.static(resolve(__dirname, "../static")));

app.use(apiProxyHandler);

app.use(renderer);

app.listen(3000);
