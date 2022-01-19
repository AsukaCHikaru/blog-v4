import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Layout } from "client/components/Layout";
import { PostListPageCategories } from "client/components/PostListPageCategories";
import { Footer } from "client/components/Footer";

export const ErrorPage: React.VFC = () => {
  return (
    <Layout>
      <ErrorPageHeader />
      <StyledErrorPageBody>
        Sorry, it seems like the page you are looking for is not found.
        <br />
        <br />
        <StyledErrorPageHomeLink to="/">Home</StyledErrorPageHomeLink>
      </StyledErrorPageBody>
      <Footer />
    </Layout>
  );
};

const ErrorPageHeader: React.VFC = () => {
  return (
    <StyledErrorPageHeaderContainer>
      <StyledErrorPageHeader to="/">
        The page is nonexist.
      </StyledErrorPageHeader>
      <PostListPageCategories />
    </StyledErrorPageHeaderContainer>
  );
};

const StyledErrorPageHeaderContainer = styled.div`
  margin-bottom: 40px;
`;

const StyledErrorPageHeader = styled(Link)`
  font-size: 50px;
  line-height: 1;
  font-weight: 900;

  @media (max-width: ${(props) => props.theme.breakpoint.mobile}) {
    font-size: 30px;
  }
`;

const StyledErrorPageBody = styled.div`
  height: 100%;
  font-size: 18px;
  line-height: 32px;
  font-family: "Noto Serif JP", serif;
`;

const StyledErrorPageHomeLink = styled(Link)`
  font-size: 18px;
  line-height: 32px;
  font-family: "Noto Serif JP", serif;
  text-decoration: underline;
`;
