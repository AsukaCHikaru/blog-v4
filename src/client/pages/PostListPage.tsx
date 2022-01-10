import * as React from "react";
import { useQuery } from "react-query";

import { getPostList, POST_LIST_QUERY_KEY } from "client/services/apiCore";
import { parseNotionPageListResponse } from "client/utils/parsers";
import { PostListPageHeader } from "client/components/PostListPageHeader";
import { PostLink } from "client/components/PostLink";

export const PostListPage: React.VFC = () => {
  const postList = useQuery(POST_LIST_QUERY_KEY, getPostList);

  if (postList.isLoading || !postList.data) {
    return <div>loading</div>;
  }

  // todo: error handling

  return (
    <div>
      <PostListPageHeader />
      <div>
        {parseNotionPageListResponse(postList?.data).map((postSummary) => (
          <PostLink postSummary={postSummary} key={postSummary.pathname} />
        ))}
      </div>
    </div>
  );
};
