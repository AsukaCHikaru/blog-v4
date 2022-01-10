import { useQuery } from "react-query";

import { getPostList, POST_LIST_QUERY_KEY } from "client/services/apiCore";

export const usePostList = () => {
  return useQuery(POST_LIST_QUERY_KEY, getPostList);
};
