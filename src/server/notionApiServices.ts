import axios from "axios";
import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";
import { getSecondsDiff, getTimeNow } from "server/dateTimeUtils";
import { CacheController } from "server/apiCacheController";

const NOTION_API_TOKEN = process.env.NOTION_API_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_BASEURL = "https://api.notion.com/v1";

const cacheController = new CacheController();

const CACHE_EXPIRE_SECOND = 5;

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

  if (
    cacheController.get(key).data &&
    getSecondsDiff(getTimeNow(), cacheController.get(key).lastUpdated) <
      CACHE_EXPIRE_SECOND * 60 * 1000
  ) {
    return cacheController.get(key).data as NotionPageListResponse;
  }

  const response = await axiosInstance.post<NotionPageListResponse>(
    `${NOTION_API_BASEURL}/databases/${NOTION_DATABASE_ID}/query`,
    postListFilterSorter
  );
  cacheController.set("postList", response.data);

  return response.data;
};

export const getNotionBlockList = async (postId: string) => {
  const key = "postDetail";

  if (
    cacheController.get(key).data &&
    getSecondsDiff(getTimeNow(), cacheController.get(key).lastUpdated) <
      CACHE_EXPIRE_SECOND * 60 * 1000
  ) {
    return cacheController.get(key).data as NotionPageChildrenResponse;
  }

  const response = await axiosInstance.get<NotionPageChildrenResponse>(
    `${NOTION_API_BASEURL}/blocks/${postId}/children`
  );
  cacheController.set(key, response.data);

  return response.data;
};
