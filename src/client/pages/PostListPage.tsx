import * as React from "react";
import { useQuery } from "react-query";

import { getPostList, POST_LIST_QUERY_KEY } from "client/services/apiCore";

export const PostListPage: React.VFC = () => {
  const postList = useQuery(POST_LIST_QUERY_KEY, getPostList);

  React.useEffect(() => {
    console.log(postList.data);
  }, [postList.data]);

  if (postList.isLoading) {
    return <div>loading</div>;
  }

  // todo: error handling

  return <div>post list page</div>;
};
