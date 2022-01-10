import * as React from "react";

import { NotionPageChildrenResponse } from "client/types/notion";

interface OwnProps {
  postDetail: NotionPageChildrenResponse;
}

export const PostDetailBody: React.VFC<OwnProps> = ({ postDetail }) => {
  return (
    <div>
      {postDetail.results.map((block) => {
        if (block.paragraph) {
          return (
            <p>
              {block.paragraph.text?.map((t) => (
                <span>{t.plain_text}</span>
              ))}
            </p>
          );
        }
      })}
    </div>
  );
};
