import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { PostListPage } from "client/pages/PostListPage";
import { PostDetailPage } from "client/pages/PostDetailPage";
import { GlobalStyle } from "client/components/GlobalStyle";
import { Layout } from "client/components/Layout";

export const App: React.VFC = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<PostListPage />} />
          <Route path="/post/:pathname" element={<PostDetailPage />} />
        </Routes>
      </Layout>
    </>
  );
};
