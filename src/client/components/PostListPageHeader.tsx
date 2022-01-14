import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { PostListPageCategories } from "client/components/PostListPageCategories";

export const PostListPageHeader: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledTitle to="/">The work is undone.</StyledTitle>
      <PostListPageCategories />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-bottom: 40px;
`;

const StyledTitle = styled(Link)`
  font-size: 50px;
  line-height: 1;
  font-weight: 900;

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 30px;
  }
`;
