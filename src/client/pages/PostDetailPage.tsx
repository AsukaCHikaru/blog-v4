import * as React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { usePostList } from "client/hooks/usePostList";
import { usePostDetail } from "client/hooks/usePostDetail";
import { PostDetailPageHeader } from "client/components/PostDetailPageHeader";
import { PostDetailBody } from "client/components/PostDetailBody";
import { PostDetailPageParams } from "client/types";
import { Footer } from "client/components/Footer";
import { PostDetailPageFooter } from "client/components/PostDetailPageFooter";
import { Scroller } from "client/components/Scroller";
import { Layout } from "client/components/Layout";

interface OwnProps {}

export const PostDetailPage: React.VFC<OwnProps> = ({}) => {
  const { pathname } = useParams<PostDetailPageParams>();
  const [searchParams] = useSearchParams();
  const postList = usePostList();
  const postDetail = usePostDetail(
    pathname || "",
    searchParams.get("lan") || undefined
  );
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
    <Scroller>
      <Layout>
        <PostDetailPageHeader postSummary={postSummary} />
        <PostDetailBody postDetail={postDetail.data} />
        <PostDetailPageFooter />
        <Footer />
      </Layout>
    </Scroller>
  );
};
