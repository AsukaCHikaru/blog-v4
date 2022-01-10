import * as React from "react";
import { Link } from "react-router-dom";

import { PostSummary } from "client/types";

interface OwnProps {
  postSummary: PostSummary;
}

export const PostLink: React.VFC<OwnProps> = ({ postSummary }) => {
  return (
    <div>
      <Link to={`/post/${postSummary.pathname}`}>{postSummary.title}</Link>
      <div style={{ display: "flex" }}>
        {postSummary.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  );
};
