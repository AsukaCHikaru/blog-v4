import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { PostListPage } from "client/pages/PostListPage";

export const App: React.VFC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
    </Routes>
  );
};
