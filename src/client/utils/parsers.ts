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

const months = (month: string) => {
  switch (month) {
    case "01":
      return "Jan.";
    case "02":
      return "Feb.";
    case "03":
      return "Mar.";
    case "04":
      return "Apr.";
    case "05":
      return "May";
    case "06":
      return "Jun.";
    case "07":
      return "Jul.";
    case "08":
      return "Aug.";
    case "09":
      return "Sep.";
    case "10":
      return "Oct.";
    case "11":
      return "Nov.";
    case "12":
      return "Dec.";
    default:
      return "";
  }
};

export const dateParser = (date: string) => {
  const year = date.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
  const month = date.replace(/\d{4}-(\d{2})-\d{2}/, "$1");
  const day = date.replace(/\d{4}-\d{2}-(\d{2})/, "$1");
  return `${months(month)} ${day}, ${year}`;
};
