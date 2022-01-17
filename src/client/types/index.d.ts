export type PostCategory = "gaming" | "programming" | "others";

export type PostLanguage = "enUS" | "zhTW";

export type PostSummary = {
  id: string;
  title: string;
  pathname: string;
  category: PostCategory;
  tags: string[];
  publishedDate: string;
  language: PostLanguage[];
  id_zhTW?: string;
};

export type PostListPageParams = {
  category?: PostCategory;
  tag?: string;
};

export type PostDetailPageParams = {
  pathname: string;
};
