import * as dayjs from "dayjs";

export const getTimeNow = () => dayjs().format("YYYY-MM-DDTHH:mm:ss");
export const getSecondsDiff = (time1: string, time2: string) => {
  return dayjs(time1).diff(dayjs(time2));
};
