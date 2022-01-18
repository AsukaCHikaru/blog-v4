import * as React from "react";
import styled from "styled-components";

import { LoadingAnimation } from "client/components/LoadingAnimation";

export const PostDetailPageLoadingHeader: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledTitle />
      <StyledPublishedDate />
      <StyledTagContainer>
        <StyledTag />
        <StyledTag />
        <StyledTag />
      </StyledTagContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled(LoadingAnimation)`
  height: 50px;
  width: 400px;
  margin: 10px 0;
`;

const StyledPublishedDate = styled(LoadingAnimation)`
  margin-top: 10px;
  height: 20px;
  width: 120px;
`;

const StyledTagContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const StyledTag = styled(LoadingAnimation)`
  margin: 0 15px;
  height: 20px;
  width: 80px;

  &:first-of-type {
    margin-left: 0;
  }
`;
