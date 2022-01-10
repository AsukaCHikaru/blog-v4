import * as React from "react";
import { useLocation } from "react-router-dom";

import { usePostList } from "client/hooks/usePostList";
import { usePostDetail } from "client/hooks/usePostDetail";
import { PostDetailPageHeader } from "client/components/PostDetailPageHeader";
import { PostDetailBody } from "client/components/PostDetailBody";

interface OwnProps {}

export const PostDetailPage: React.VFC<OwnProps> = ({}) => {
  const location = useLocation();
  const postList = usePostList();
  const [postId, setPostId] = React.useState<string>("");
  const postDetail = usePostDetail(postId);

  const postSummary = postList.data?.find(
    (post) => post.pathname === location.pathname.replace("/post/", "")
  );

  React.useEffect(() => {
    if (!postSummary || !postSummary.id) {
      return;
    }
    setPostId(postSummary.id);
  }, [postSummary]);

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
