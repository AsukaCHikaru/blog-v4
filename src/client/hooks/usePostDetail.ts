import { useQuery } from "react-query";

import { getPostDetail, POST_DETAIL_QUERY_KEY } from "client/services/apiCore";

export const usePostDetail = (pathname: string) => {
  return useQuery(
    [POST_DETAIL_QUERY_KEY, pathname],
    () => getPostDetail(pathname),
    {
      enabled: !!pathname,
    }
  );
};
