import * as express from "express";
import {
  getNotionBlockList,
  getNotionPageList,
} from "server/notionApiServices";

export const apiProxyHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (/\/api\/postList/.test(req.path)) {
    try {
      const data = await getNotionPageList();

      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }

  if (/\/api\/postDetail\/\w+/.test(req.path)) {
    const postId = req.path.replace("/api/postDetail/", "");
    try {
      const data = await getNotionBlockList(postId);

      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
  next();
};
