import axios from "axios";

import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";
import { CacheController } from "server/apiCacheController";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASEURL = "https://api.notion.com/v1";

const cacheController = new CacheController([
  {
    key: "postList",
    data: undefined,
    expireSecond: 5,
  },
]);

export const axiosInstance = axios.create({
  baseURL: NOTION_API_BASEURL,
  headers: {
    Authorization: `Bearer ${NOTION_API_TOKEN}`,
  },
});

export const postListFilterSorter = {
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

export const getNotionPageList = async () => {
  const key = "postList";

  if (cacheController.hasFreshData(key)) {
    return cacheController.get(key) as NotionPageListResponse;
  }

  const response = await axiosInstance.post<NotionPageListResponse>(
    `${NOTION_API_BASEURL}/databases/${NOTION_DATABASE_ID}/query`,
    postListFilterSorter
  );
  cacheController.update("postList", response.data);

  return response.data;
};

// todo: only save one post now
export const getNotionBlockList = async (postId: string) => {
  const key = `postDetail/${postId}`;

  if (cacheController.hasFreshData(key)) {
    return cacheController.get(key) as NotionPageChildrenResponse;
  }

  const response = await axiosInstance.get<NotionPageChildrenResponse>(
    `${NOTION_API_BASEURL}/blocks/${postId}/children`
  );
  cacheController.update(key, response.data);

  return response.data;
};
