import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type OwnProps = {};

export const PostDetailPageFooter: React.FC<OwnProps> = ({}) => {
  return (
    <StyledContainer>
      <StyledTitle to="/">The work is undone.</StyledTitle>
      <StyledCategoryContainer>
        <StyledCategory to="/category/gaming">GAMING</StyledCategory>
        <StyledCategory to="/category/programming">PROGRAMMING</StyledCategory>
        <StyledCategory to="/category/others">OTHERS</StyledCategory>
      </StyledCategoryContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-top: 40px;
`;

const StyledTitle = styled(Link)`
  font-size: 30px;
  font-weight: 900;
`;

const StyledCategoryContainer = styled.div``;

const StyledCategory = styled(Link)`
  padding: 0 8px;
  font-size: 18px;
  font-family: "Courier New", Courier, "Noto Sans JP", monospace;
  border-left: solid 1px #131313;

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    border-left: none;
    padding-left: 0;
  }
`;
