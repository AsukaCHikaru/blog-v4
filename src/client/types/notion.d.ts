export type NotionPageListResponse = {
  object: "list";
  results: NotionPage[];
  next_cursor: null;
  has_more: boolean;
};

export type NotionPageChildrenResponse = {
  object: "list";
  results: NotionBlock[];
  next_cursor: null;
  has_more: boolean;
};

export type NotionPage = {
  object: "page";
  id: string;
  created_time?: string;
  last_edited_time?: string;
  cover?: null;
  icon?: null;
  parent?: {
    type: "database_id";
    database_id: string;
  };
  archived?: boolean;
  properties?: PostProperty;
  url?: string;
};

type NotionBlockBase = {
  object: "block";
  id: string;
  created_time?: string;
  last_edited_time?: string;
  has_children?: boolean;
  archived?: boolean;
};

type NotionParagraphBlock = NotionBlockBase & {
  type: "paragraph";
  paragraph: {
    text?: NotionRichTextObject[];
    children?: NotionBlock[];
  };
};

type NotionHeading1Block = NotionBlockBase & {
  type: "heading_1";
  heading_1: {
    text: NotionRichTextObject[];
  };
};

type NotionHeading2Block = NotionBlockBase & {
  type: "heading_2";
  heading_2: {
    text: NotionRichTextObject[];
  };
};

type NotionHeading3Block = NotionBlockBase & {
  type: "heading_3";
  heading_3: {
    text: NotionRichTextObject[];
  };
};

type NotionBulletedListBlock = NotionBlockBase & {
  type: "bulleted_list_item";
  bulleted_list_item: {
    text: NotionRichTextObject[];
  };
};

type NotionNumberedListBlock = NotionBlockBase & {
  type: "numbered_list_item";
  numbered_list_item: {
    text: NotionRichTextObject[];
  };
};

type NotionCodeBlock = NotionBlockBase & {
  type: "code";
  code?: {
    text: NotionRichTextObject[];
    language: NotionCodeLanguageTypes;
  };
};

type NotionImageBlock = NotionBlockBase & {
  type: "image";
  image: NotionImageObject;
};

type NotionVideoBlock = NotionBlockBase & {
  type: "video";
  video: NotionVideoObject;
};

type NotionBookmarkBlock = NotionBlockBase & {
  type: "bookmark";
  bookmark: NotionBookmarkBlock;
};

type NotionDividerBlock = NotionBlockBase & {
  type: "divider";
  devider: {};
};

export type NotionBlock =
  | NotionParagraphBlock
  | NotionHeading1Block
  | NotionHeading2Block
  | NotionHeading3Block
  | NotionBulletedListBlock
  | NotionNumberedListBlock
  | NotionCodeBlock
  | NotionImageBlock
  | NotionVideoBlock
  | NotionBookmarkBlock
  | NotionDividerBlock;

type NotionRichTextObject = {
  type: "text";
  text: {
    content: string;
    link: null;
  };
  annotations: NotionRichTextAnnotations;
  plain_text: string;
  href: null;
};

export type NotionRichTextAnnotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
};

export type NotionImageObject = NotionFileObject & {
  caption: NotionRichTextObject[];
};

export type NotionVideoObject = NotionFileObject & {
  caption: NotionRichTextObject[];
};

export type NotionBookmarkObject = {
  caption: NotionRichTextObject[];
  url: string;
};

export type NotionFileObject =
  | NotionUploadedFileObject
  | NotionExternalFileObject;

export type NotionUploadedFileObject = {
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
};

export type NotionExternalFileObject = {
  type: "external";
  external: {
    url: string;
  };
};

export type PostProperty = {
  category: {
    id: string;
    type: "select";
    select: NotionSelectOptionObject;
  };
  state: {
    id: string;
    type: "select";
    select: NotionSelectOptionObject;
  };
  Updated: {
    id: string;
    type: "last_edited_time";
    last_edited_time: string;
  };
  pathname: {
    id: string;
    type: "rich_text";
    rich_text: NotionRichTextObject[];
  };
  link_zhTW: {
    id: string;
    type: "url";
    url: string | null;
  };
  tags: {
    id: string;
    type: "multi_select";
    multi_select: NotionSelectOptionObject[];
  };
  published: {
    id: string;
    type: "date";
    date: {
      start: string;
      end: null;
      time_zone: null;
    };
  };
  language: {
    id: string;
    type: "multi_select";
    multi_select: NotionSelectOptionObject[];
  };
  Created: {
    id: string;
    type: string;
    created_time: string;
  };
  Name: {
    id: "title";
    type: "title";
    title: NotionRichTextObject[];
  };
};

type NotionSelectOptionObject = {
  id: string;
  name: string;
  color: string;
};

type NotionBlockTypes =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "child_page"
  | "child_database"
  | "embed"
  | "image"
  | "video"
  | "file"
  | "pdf"
  | "bookmark"
  | "callout"
  | "quote"
  | "equation"
  | "divider"
  | "table_of_contents"
  | "column"
  | "column_list"
  | "link_preview"
  | "synced_block"
  | "template"
  | "link_to_page"
  | "table"
  | "table_row"
  | "unsupported";

type NotionCodeLanguageTypes =
  | "abap"
  | "arduino"
  | "bash"
  | "basic"
  | "c"
  | "clojure"
  | "coffeescript"
  | "c++"
  | "c#"
  | "css"
  | "dart"
  | "diff"
  | "docker"
  | "elixir"
  | "elm"
  | "erlang"
  | "flow"
  | "fortran"
  | "f#"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "html"
  | "java"
  | "javascript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mermaid"
  | "nix"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "python"
  | "r"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "sql"
  | "swift"
  | "typescript"
  | "vb|net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#";
