import * as dayjs from "dayjs";

export const getYearNow = () => dayjs().format("YYYY");

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

export const parseDateToEn = (date: string) => {
  const year = date.replace(/(\d{4})-\d{2}-\d{2}/, "$1");
  const month = date.replace(/\d{4}-(\d{2})-\d{2}/, "$1");
  const day = date.replace(/\d{4}-\d{2}-(\d{2})/, "$1");
  return `${months(month)} ${day}, ${year}`;
};
