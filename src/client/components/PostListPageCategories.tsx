import * as React from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";

import { PostCategory, PostListPageParams } from "client/types";

const categoryText: Record<PostCategory | "all", string> = {
  all: "ALL",
  gaming: "GAMING",
  programming: "PROGRAMMING",
  others: "OTHERS",
};

export const PostListPageCategories: React.VFC = () => {
  const params = useParams<PostListPageParams>();
  const location = useLocation();

  return (
    <StyledContainer>
      <StyledCategoryContainer>
        <PostListPageCategoryItem
          type="all"
          selected={location.pathname === "/"}
        />
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
      <StyledAboutLink href="https://asukachikaru.com" target="_blank">
        ABOUT
      </StyledAboutLink>
      <PostListPageTagItem tag={params.tag} />
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
interface TagItem {
  tag?: string;
}

const PostListPageTagItem: React.VFC<TagItem> = ({ tag }) => {
  if (!tag) {
    return null;
  }

  return <StyledSelectedTag>#{tag}</StyledSelectedTag>;
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

const StyledAboutLink = styled.a`
  padding: 0 10px;
  font-family: "Courier New", Courier, "Noto Sans JP", monospace;
  font-size: 20px;
  line-height: 1;
  font-weight: 100;
  color: ${(props) => props.theme.color.text.category};
  border-left: solid 1px #131313;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 15px;
  }
`;

const StyledSelectedTag = styled.span`
  padding: 0 10px;
  font-family: "Courier New", Courier, "Noto Sans JP", monospace;
  font-size: 20px;
  line-height: 1;
  font-weight: 100;
  color: #131313;
  text-decoration: underline;
  border-left: solid 1px #131313;

  @media (max-width: 400px) {
    font-size: 15px;
    border: none;
    padding: 0;
  }
`;
