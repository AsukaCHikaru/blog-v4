import * as React from "react";

import { PostListPageHeader } from "client/components/PostListPageHeader";
import { PostLink } from "client/components/PostLink";
import { usePostList } from "client/hooks/usePostList";

export const PostListPage: React.VFC = () => {
  const postList = usePostList();

  if (postList.isLoading || !postList.data) {
    return <div>loading</div>;
  }

  // todo: error handling

  return (
    <div>
      <PostListPageHeader />
      <div>
        {postList?.data.map((postSummary) => (
          <PostLink postSummary={postSummary} key={postSummary.pathname} />
        ))}
      </div>
    </div>
  );
};
