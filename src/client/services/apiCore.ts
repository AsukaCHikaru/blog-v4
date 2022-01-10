import axios from "axios";
import { NotionPageListResponse } from "client/types/notion";

export const POST_LIST_API_ENDPOINT = "/api/postList";
export const POST_LIST_QUERY_KEY = "postList";

export const getPostList = async () => {
  const response = await axios.get<NotionPageListResponse>(
    POST_LIST_API_ENDPOINT
  );

  return response.data;
};
