import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { CategoryParams } from "client/types";
import { PostListPageHeader } from "client/components/PostListPageHeader";
import { PostLink } from "client/components/PostLink";
import { usePostList } from "client/hooks/usePostList";

export const PostListPage: React.VFC = () => {
  const postList = usePostList();
  const params = useParams<CategoryParams>();

  if (postList.isLoading || !postList.data) {
    return <div>loading</div>;
  }

  const filteredPostList = React.useMemo(() => {
    if (!params.category) {
      return postList.data;
    }

    return postList.data.filter((post) => post.category === params.category);
  }, [params, postList]);

  // todo: error handling

  return (
    <StyledContainer>
      <PostListPageHeader />
      <div>
        {filteredPostList.map((postSummary) => (
          <PostLink postSummary={postSummary} key={postSummary.pathname} />
        ))}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: ${(props) => props.theme.color.background.primary};
`;
