export type PostCategory = "gaming" | "programming" | "others";

export type PostSummary = {
  title: string;
  tags: string[];
  publishedDate: string;
  pathname: string;
  category: PostCategory;
  language: string[];
  id_zhTW?: string;
};
