import * as React from "react";
import styled from "styled-components";

import { NotionBlock, NotionRichTextObject } from "client/types/notion";

interface OwnProps {
  block: NotionBlock;
}

export const PostBodyBlock: React.VFC<OwnProps> = ({ block }) => {
  if (block.type === "paragraph") {
    return (
      <StyledP>
        {block.paragraph.text?.map((item, i) => (
          <RichTextItem item={item} key={item.plain_text + i} />
        ))}
      </StyledP>
    );
  }
  if (block.type === "heading_1") {
    return <StyledH2>{block.heading_1.text[0].text.content}</StyledH2>;
  }
  if (block.type === "heading_2") {
    return <StyledH3>{block.heading_2.text[0].text.content}</StyledH3>;
  }
  if (block.type === "heading_3") {
    return <StyledH4>{block.heading_3.text[0].text.content}</StyledH4>;
  }
  if (block.type === "numbered_list_item") {
    return (
      <ol>
        {block.numbered_list_item.text.map((t) => (
          <StyledLi key={t.plain_text}>{t.text.content}</StyledLi>
        ))}
      </ol>
    );
  }
  if (block.type === "bulleted_list_item") {
    return (
      <ul>
        <StyledLi key={block.id}>
          {block.bulleted_list_item.text.map((item, i) => (
            <RichTextItem item={item} key={item.plain_text + i} />
          ))}
        </StyledLi>
      </ul>
    );
  }
  if (block.type === "code") {
    return (
      <pre>
        <StyledCode>{block.code?.text.map((t) => t.text.content)}</StyledCode>
      </pre>
    );
  }
  if (block.type === "image") {
    if (block.image.type === "file") {
      return <img src={block.image.file.url} alt="" loading="lazy" />;
    }
    if (block.image.type === "external") {
      return <img src={block.image.external.url} alt="" loading="lazy" />;
    }
  }
  // todo: video
  // todo: bookmark
  return null;
};

interface RichTextItemProps {
  item: NotionRichTextObject;
}

const RichTextItem: React.VFC<RichTextItemProps> = ({ item }) => {
  if (item.href) {
    return (
      <StyledA href={item.href} rel="noreferrer noopener" target="_blank">
        {item.plain_text}
      </StyledA>
    );
  }

  if (item.annotations.code) {
    return <StyledCode>{item.plain_text}</StyledCode>;
  }
  return <span>{item.text.content}</span>;
};

const StyledP = styled.p`
  font-size: 18px;
  line-height: 32px;
  margin-bottom: 32px;
  white-space: pre-wrap;
`;

const StyledH2 = styled.h2`
  font-size: 30px;
  line-height: 2;
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 25px;
  }
`;

const StyledH3 = styled.h3`
  font-size: 24px;
  line-height: 40px;
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 21px;
    line-height: 30px;
  }
`;

const StyledH4 = styled.h4`
  font-size: 20px;
  line-height: 1.8;
  font-weight: 700;

  @media (max-width: 400px) {
    font-size: 19px;
    line-height: 28px;
  }
`;

const StyledLi = styled.li`
  font-size: 18px;
`;

const StyledA = styled.a`
  color: #0d69da;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledCode = styled.code`
  padding: 0 5px;
  display: inline-block;
  font-size: 15px;
  color: #131313;
  border-radius: 5px;
`;

const StyledIFrameWrapper = styled.span``;

const StyledIFrame = styled.iframe`
  width: 656px;
  height: 369px;
  margin: 0 auto;

  @media (max-width: 400px) {
    width: 320px;
    height: 180px;
  }
`;
