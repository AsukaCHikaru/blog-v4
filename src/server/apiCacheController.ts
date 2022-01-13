import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";
import { getSecondsDiff, getTimeNow } from "server/dateTimeUtils";

type CacheControllerItem<T> = {
  data?: T;
  lastUpdated: string;
};

const CACHE_EXPIRE_SECOND = Number(process.env.CACHE_EXPIRE_SECOND) || 5 * 60;

export class CacheController {
  constructor() {}

  // todo: fix this type shit
  get(key: "postList" | "postDetail") {
    return this[key];
  }

  set(key: "postList" | "postDetail", data: any) {
    this[key].data = data;
    this[key].lastUpdated = getTimeNow();
  }

  hasFreshData(key: "postList" | "postDetail") {
    return (
      this[key].data &&
      getSecondsDiff(getTimeNow(), this[key].lastUpdated) <
        CACHE_EXPIRE_SECOND * 1000
    );
  }

  private postList: CacheControllerItem<NotionPageListResponse> = {
    data: undefined,
    lastUpdated: "",
  };

  private postDetail: CacheControllerItem<NotionPageChildrenResponse> = {
    data: undefined,
    lastUpdated: "",
  };
}
