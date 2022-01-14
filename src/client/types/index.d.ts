export type PostCategory = "gaming" | "programming" | "others";

export type PostSummary = {
  id: string;
  title: string;
  pathname: string;
  category: PostCategory;
  tags: string[];
  publishedDate: string;
  language: string[];
  id_zhTW?: string;
};

export type CategoryParams = {
  category: PostCategory;
};
