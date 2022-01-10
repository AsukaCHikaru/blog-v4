import * as React from "react";

import { PostSummary } from "client/types";

interface OwnProps {
  postSummary: PostSummary;
}

export const PostDetailPageHeader: React.VFC<OwnProps> = ({ postSummary }) => {
  return (
    <div>
      <h1>{postSummary.title}</h1>
      <h4>{postSummary.publishedDate}</h4>
      <div style={{ display: "flex" }}>
        {postSummary.tags.map((tag) => (
          <span>{tag}</span>
        ))}
      </div>
    </div>
  );
};
