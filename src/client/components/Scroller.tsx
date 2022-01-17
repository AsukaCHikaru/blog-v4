import * as React from "react";
import styled from "styled-components";

interface OwnProps {
  children: React.ReactNode;
}

export const Scroller: React.VFC<OwnProps> = ({ children }) => {
  return <StyledScroller>{children}</StyledScroller>;
};

const StyledScroller = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
