import * as React from "react";
import styled from "styled-components";

import { getYearNow } from "client/utils/dateTimeUtils";

type OwnProps = {};

export const Footer: React.VFC<OwnProps> = ({}) => {
  return (
    <StyledFooter>
      <StyledFooterContent>{`© ${getYearNow()} `}</StyledFooterContent>
      <StyledFooterLink
        target="_blank"
        rel="noopener noreferrer"
        href="https://asukachikaru.com"
      >
        asukachikaru.com
      </StyledFooterLink>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  margin-top: 40px;
  & span,
  a {
    font-family: "Courier New", Courier, "Noto Sans JP", monospace;
  }
`;

const StyledFooterContent = styled.span``;

const StyledFooterLink = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;
