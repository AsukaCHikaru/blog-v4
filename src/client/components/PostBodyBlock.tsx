import * as React from "react";

import { NotionBlock } from "client/types/notion";

interface OwnProps {
  block: NotionBlock;
}

export const PostBodyBlock: React.VFC<OwnProps> = ({ block }) => {
  if (block.type === "paragraph") {
    return (
      <p>
        {block.paragraph.text?.map((t) => (
          <span key={t.plain_text}>{t.text.content}</span>
        ))}
      </p>
    );
  }
  if (block.type === "heading_1") {
    return <h2>{block.heading_1.text[0].text.content}</h2>;
  }
  if (block.type === "heading_2") {
    return <h3>{block.heading_2.text[0].text.content}</h3>;
  }
  if (block.type === "heading_3") {
    return <h4>{block.heading_3.text[0].text.content}</h4>;
  }
  if (block.type === "numbered_list_item") {
    return (
      <ol>
        {block.numbered_list_item.text.map((t) => (
          <li key={t.plain_text}>{t.text.content}</li>
        ))}
      </ol>
    );
  }
  if (block.type === "bulleted_list_item") {
    return (
      <ul>
        {block.bulleted_list_item.text.map((t) => (
          <li key={t.plain_text}>{t.text.content}</li>
        ))}
      </ul>
    );
  }
  if (block.type === "code") {
    return <code>{block.code?.text.map((t) => t.text.content)}</code>;
  }
  if (block.type === "image") {
    if (block.image.type === "file") {
      return <img src={block.image.file.url} loading="lazy" />;
    }
    if (block.image.type === "external") {
      return <img src={block.image.external.url} loading="lazy" />;
    }
  }
  // todo: video
  // todo: bookmark
  return null;
};
