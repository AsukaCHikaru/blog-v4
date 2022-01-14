import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { PostSummary } from "client/types";
import { dateParser } from "client/utils/parsers";

interface OwnProps {
  postSummary: PostSummary;
}

export const PostLink: React.VFC<OwnProps> = ({ postSummary }) => {
  return (
    <StyledContainer>
      <StyledPostTitle to={`/post/${postSummary.pathname}`}>
        {postSummary.title}
      </StyledPostTitle>
      {/** todo: lan */}
      <StyledPostPublishDate>
        {dateParser(postSummary.publishedDate)}
      </StyledPostPublishDate>
      <StyledPostTagContainer>
        {postSummary.tags.map((tag) => (
          <StyledPostTag to={`/tag/${tag}`} key={tag}>
            #{tag}
          </StyledPostTag>
        ))}
      </StyledPostTagContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const StyledPostTitle = styled(Link)`
  font-size: 35px;
  line-height: 50px;

  @media (max-width: 400px) {
    font-size: 25px;
    line-height: 35px;
  }
`;

const StyledPostPublishDate = styled.div`
  margin-top: 15px;
  line-height: 1;
  font-family: "Noto Serif JP", serif;
  font-size: 20px;
  color: #7a7a7a;

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    margin-right: 10px;
    font-size: 15px;
  }
`;

const StyledPostTagContainer = styled.div`
  margin-top: 15px;
  line-height: 1;

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    margin-top: 10px;
  }
`;

const StyledPostTag = styled(Link)`
  margin-right: 15px;
  font-weight: 100;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 20px;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    margin-right: 10px;
    font-size: 15px;
  }
`;
