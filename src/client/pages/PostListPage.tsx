import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { PostListPageParams } from "client/types";
import { PostListPageHeader } from "client/components/PostListPageHeader";
import { PostLink } from "client/components/PostLink";
import { usePostList } from "client/hooks/usePostList";
import { Footer } from "client/components/Footer";

export const PostListPage: React.VFC = () => {
  const postList = usePostList();
  const params = useParams<PostListPageParams>();

  if (postList.isLoading || !postList.data) {
    return <div>loading</div>;
  }

  const filteredPostList = React.useMemo(() => {
    if (params.category) {
      return postList.data.filter((post) => post.category === params.category);
    }

    if (params.tag) {
      const tag = params.tag;
      return postList.data.filter((post) => post.tags.includes(tag));
    }

    return postList.data;
  }, [params, postList]);

  // todo: error handling
  // todo: no matched category or tag

  return (
    <StyledContainer>
      <PostListPageHeader />
      <div>
        {filteredPostList.map((postSummary) => (
          <PostLink postSummary={postSummary} key={postSummary.pathname} />
        ))}
      </div>
      <Footer />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
`;
