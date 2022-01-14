import * as React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

import { CategoryParams, PostCategory } from "client/types";

const categoryText: Record<PostCategory | "all", string> = {
  all: "ALL",
  gaming: "GAMING",
  programming: "PROGRAMMING",
  others: "OTHERS",
};

export const PostListPageCategories: React.VFC = () => {
  const params = useParams<CategoryParams>();

  return (
    <StyledContainer>
      <StyledCategoryContainer>
        <PostListPageCategoryItem type="all" selected={!params.category} />
        <PostListPageCategoryItem
          type="gaming"
          selected={params.category === "gaming"}
        />
        <PostListPageCategoryItem
          type="programming"
          selected={params.category === "programming"}
        />
        <PostListPageCategoryItem
          type="others"
          selected={params.category === "others"}
        />
      </StyledCategoryContainer>
    </StyledContainer>
  );
};

interface CategoryItem {
  type: PostCategory | "all";
  selected: boolean;
}

const PostListPageCategoryItem: React.VFC<CategoryItem> = ({
  type,
  selected,
}) => {
  return (
    <StyledCategory
      to={type === "all" ? "/" : `/category/${type}`}
      selected={selected}
    >
      {categoryText[type]}
    </StyledCategory>
  );
};

const StyledContainer = styled.div`
  margin-top: 20px;

  @media (max-width: 400px) {
    margin-top: 15px;
  }
`;

const StyledCategoryContainer = styled.div`
  display: inline-block;
  
  @media (max-width: 400px) {
    margin-top: 15p;x
    display: block;
  }
`;

const StyledCategory = styled(Link)<{ selected: boolean }>`
  padding: 0 10px;
  font-family: "Courier New", Courier, "Noto Sans JP", monospace;
  font-size: 20px;
  line-height: 1;
  font-weight: 100;
  color: ${(props) => (props.selected ? "#131313" : "#7a7a7a")};
  text-decoration: ${(props) => (props.selected ? "underline" : "none")};

  border-left: solid 1px #131313;

  &:hover {
    text-decoration: underline;
  }

  &:first-of-type {
    border-left: none;
    padding-left: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 15px;
  }
`;
