import * as React from "react";
import styled from "styled-components";

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

const StyledTitle = styled.div`
  background-color: #bbb;
  height: 50px;
  width: 400px;
  margin: 10px 0;
`;

const StyledPublishedDate = styled.div`
  margin-top: 10px;
  height: 20px;
  width: 120px;
  background-color: #bbb;
`;

const StyledTagContainer = styled.div`
  margin-top: 20px;
  display: flex;
`;

const StyledTag = styled.div`
  margin: 0 15px;
  height: 20px;
  width: 80px;
  background-color: #bbb;

  &:first-of-type {
    margin-left: 0;
  }
`;
