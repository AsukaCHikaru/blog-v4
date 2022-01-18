import * as React from "react";
import styled from "styled-components";
import { LoadingAnimation } from "./LoadingAnimation";

export const PostDetailPageLoadingBody: React.VFC = () => {
  return (
    <StyledContainer>
      <StyledParagraph height={100} />
      <StyledParagraph height={100} />
      <StyledParagraph height={33} />
      <StyledParagraph height={67} />
      <StyledParagraph height={67} />
      <StyledParagraph height={100} />
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledParagraph = styled(LoadingAnimation)<{ height: number }>`
  width: 100%;
  height: ${(props) => props.height}px;
  margin: 7px 0 32px;
`;
