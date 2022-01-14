import * as React from "react";
import { useLocation } from "react-router-dom";

import { usePostList } from "client/hooks/usePostList";
import { usePostDetail } from "client/hooks/usePostDetail";
import { PostDetailPageHeader } from "client/components/PostDetailPageHeader";
import { PostDetailBody } from "client/components/PostDetailBody";

interface OwnProps {}

export const PostDetailPage: React.VFC<OwnProps> = ({}) => {
  const location = useLocation();
  const postPathname = React.useMemo(
    () => location.pathname.replace("/post/", ""),
    [location]
  );
  const postList = usePostList();
  const postDetail = usePostDetail(postPathname);
  const postSummary = React.useMemo(
    () => postList.data?.find((post) => post.pathname === postPathname),
    [postList, postPathname]
  );

  if (
    postList.isLoading ||
    postDetail.isLoading ||
    !postSummary ||
    !postDetail.data
  ) {
    return <div>loading</div>;
  }

  return (
    <div>
      <PostDetailPageHeader postSummary={postSummary} />
      <PostDetailBody postDetail={postDetail.data} />
    </div>
  );
};
