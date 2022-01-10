import * as React from "react";

import { NotionPageChildrenResponse } from "client/types/notion";
import { PostBodyBlock } from "./PostBodyBlock";

interface OwnProps {
  postDetail: NotionPageChildrenResponse;
}

export const PostDetailBody: React.VFC<OwnProps> = ({ postDetail }) => {
  return (
    <div>
      {postDetail.results.map((block) => (
        <PostBodyBlock block={block} />
      ))}
    </div>
  );
};
