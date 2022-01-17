import * as express from "express";

import { parseNotionPageListResponse } from "client/utils/parsers";
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
    const postPathname = req.path.replace("/api/postDetail/", "");
    const postLan = req.query.lan;

    try {
      const postList = parseNotionPageListResponse(await getNotionPageList());
      const post = postList.find((post) => post.pathname === postPathname);

      const postId =
        postLan === "zhTW"
          ? post?.id_zhTW?.replace(/.+\/\w+-(\w+)/, "$1")
          : post?.id;

      if (!postId) {
        res.status(404).send({ status: 404, error: "Post not found!" });
        return;
      }

      const data = await getNotionBlockList(postId);

      res.send(data);
    } catch (error) {
      console.error(error);
    }
  }
  next();
};
