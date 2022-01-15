import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { PostSummary } from "client/types";
import { parseDateToEn } from "client/utils/dateTimeUtils";

interface OwnProps {
  postSummary: PostSummary;
}

export const PostDetailPageHeader: React.VFC<OwnProps> = ({ postSummary }) => {
  return (
    <StyledContainer>
      <StyledTitle>{postSummary.title}</StyledTitle>
      {/** todo: lan */}
      <StyledPublishDate>
        {parseDateToEn(postSummary.publishedDate)}
      </StyledPublishDate>
      <StyledTagContainer>
        {postSummary.tags.map((tag) => (
          <StyledTag to={`/tag/${tag}`} key={tag}>
            #{tag}
          </StyledTag>
        ))}
      </StyledTagContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-bottom: 40px;
`;

const StyledTitle = styled.h1`
  font-size: 50px;
  line-height: 70px;
  font-weight: 700;

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 30px;
    line-height: 40px;
  }
`;

const StyledPublishDate = styled.div`
  margin-top: 5px;
  font-size: 20px;
  color: #7a7a7a;
  font-family: "Noto Serif JP", sans-serif;
`;

const StyledTagContainer = styled.div`
  margin-top: 15px;
  line-height: 1;
`;

const StyledTag = styled(Link)`
  padding: 0 10px;
  font-weight: 100;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;

  &:first-of-type {
    padding-left: 0;
  }

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 15px;
  }
`;
