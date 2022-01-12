import axios from "axios";
import * as express from "express";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASEURL = "https://api.notion.com/v1";

const axiosInstance = axios.create({
  baseURL: NOTION_API_BASEURL,
  headers: {
    Authorization: `Bearer ${NOTION_API_TOKEN}`,
  },
});

const postListFilterSorter = {
  filter: {
    property: "state",
    select: {
      equals: "Done",
    },
  },
  sorts: [
    {
      property: "published",
      direction: "descending",
    },
  ],
};

export const apiProxyHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (/\/api\/postList/.test(req.path)) {
    try {
      const response = await axiosInstance.post(
        `${NOTION_API_BASEURL}/databases/${NOTION_DATABASE_ID}/query`,
        postListFilterSorter
      );

      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  if (/\/api\/postDetail\/\w+/.test(req.path)) {
    const postId = req.path.replace("/api/postDetail/", "");
    try {
      const response = await axiosInstance.get(
        `${NOTION_API_BASEURL}/blocks/${postId}/children`
      );

      res.send(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  next();
};
