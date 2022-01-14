import * as React from "react";
import styled from "styled-components";

interface OwnProps {
  children: React.ReactNode;
}

export const Layout: React.VFC<OwnProps> = ({ children }) => {
  return (
    <StyledScroller>
      <StyledContainer>{children}</StyledContainer>
    </StyledScroller>
  );
};

const StyledScroller = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 0 auto;
  padding: 43px 0;

  @media (max-width: 400px) {
    max-width: 330px;
    margin: 49px 22px;
  }
`;
