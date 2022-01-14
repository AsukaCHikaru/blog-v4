import * as React from "react";
import { useParams } from "react-router-dom";

import { usePostList } from "client/hooks/usePostList";
import { usePostDetail } from "client/hooks/usePostDetail";
import { PostDetailPageHeader } from "client/components/PostDetailPageHeader";
import { PostDetailBody } from "client/components/PostDetailBody";
import { PostDetailPageParams } from "client/types";

interface OwnProps {}

export const PostDetailPage: React.VFC<OwnProps> = ({}) => {
  const { pathname } = useParams<PostDetailPageParams>();
  const postList = usePostList();
  const postDetail = usePostDetail(pathname || "");
  const postSummary = React.useMemo(
    () => postList.data?.find((post) => post.pathname === pathname),
    [postList, pathname]
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
    <>
      <PostDetailPageHeader postSummary={postSummary} />
      <PostDetailBody postDetail={postDetail.data} />
    </>
  );
};
