import * as React from "react";
import styled, { keyframes } from "styled-components";

interface OwnProps {
  className?: string;
}

export const LoadingAnimation: React.VFC<OwnProps> = ({ className }) => {
  return <StyledLoadingBase className={className} />;
};

const loading = keyframes`
  0% {
    background: #bbb;
  }

  50% {
    background: #ccc;
  }

  100% {
    background: #bbb;
  }
`;

const StyledLoadingBase = styled.div`
  animation: ${loading} 1.5s ease-in-out infinite;
`;
