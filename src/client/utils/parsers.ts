import { PostCategory, PostSummary } from "client/types";
import { NotionPage, NotionPageListResponse } from "client/types/notion";

export const parseNotionPageListResponse = (
  data: NotionPageListResponse
): PostSummary[] => {
  const postList = data.results.map(parseNotionPageObjectToPostSummary);
  return postList;
};

const parseNotionPageObjectToPostSummary = (
  pageObject: NotionPage
): PostSummary => {
  return {
    id: pageObject.id,
    title: pageObject.properties?.Name.title[0].plain_text || "",
    category: pageObject.properties?.category.select.name as PostCategory,
    publishedDate: pageObject.properties?.published.date.start || "",
    pathname: pageObject.properties?.pathname.rich_text[0].plain_text || "",
    tags:
      pageObject.properties?.tags.multi_select.map((select) => select.name) ||
      [],
    language:
      pageObject.properties?.language.multi_select.map(
        (select) => select.name
      ) || [],
    id_zhTW: pageObject.properties?.link_zhTW?.url || undefined,
  };
};
