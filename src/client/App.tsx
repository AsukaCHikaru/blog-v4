import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { PostListPage } from "client/pages/PostListPage";
import { PostDetailPage } from "client/pages/PostDetailPage";

export const App: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/post/:pathname" element={<PostDetailPage />} />
    </Routes>
  );
};
