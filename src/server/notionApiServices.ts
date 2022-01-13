import axios from "axios";
import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";
import { CacheController } from "./apiCacheController";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASEURL = "https://api.notion.com/v1";

const cacheController = new CacheController();

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
  if (cacheController.get("postList")) {
    return cacheController.get("postList") as NotionPageListResponse;
  }

  const response = await axiosInstance.post<NotionPageListResponse>(
    `${NOTION_API_BASEURL}/databases/${NOTION_DATABASE_ID}/query`,
    postListFilterSorter
  );
  cacheController.set("postList", response.data);

  return response.data;
};

export const getNotionBlockList = async (postId: string) => {
  if (cacheController.get("postDetail")) {
    return cacheController.get("postDetail") as NotionPageChildrenResponse;
  }

  const response = await axiosInstance.get<NotionPageChildrenResponse>(
    `${NOTION_API_BASEURL}/blocks/${postId}/children`
  );
  cacheController.set("postDetail", response.data);

  return response.data;
};
