import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { PostListPage } from "client/pages/PostListPage";
import { PostDetailPage } from "client/pages/PostDetailPage";
import { GlobalStyle } from "client/components/GlobalStyle";
import { ErrorPage } from "client/pages/ErrorPage";

export const App: React.VFC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<PostListPage />} />
        <Route path="/category/:category" element={<PostListPage />} />
        <Route path="/tag/:tag" element={<PostListPage />} />
        <Route path="/post/:pathname" element={<PostDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
