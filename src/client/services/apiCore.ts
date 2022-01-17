import axios from "axios";

import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";
import { parseNotionPageListResponse } from "client/utils/parsers";

export const POST_LIST_API_ENDPOINT = "/api/postList";
export const POST_LIST_QUERY_KEY = "postList";

export const POST_DETAIL_API_ENDPOINT = "/api/postDetail";
export const POST_DETAIL_QUERY_KEY = "postDetail";

export const getPostList = async () => {
  const response = await axios.get<NotionPageListResponse>(
    POST_LIST_API_ENDPOINT
  );

  return parseNotionPageListResponse(response.data);
};

export const getPostDetail = async (id: string, lan?: string) => {
  const response = await axios.get<NotionPageChildrenResponse>(
    `${POST_DETAIL_API_ENDPOINT}/${id}`,
    { params: { lan } }
  );

  return response.data;
};
