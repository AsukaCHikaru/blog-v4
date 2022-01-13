import {
  NotionPageChildrenResponse,
  NotionPageListResponse,
} from "client/types/notion";

type CacheControllerItem<T> = {
  data?: T;
  lastUpdated: string;
};

export class CacheController {
  constructor() {}

  // todo: fix this type shit
  get(key: "postList" | "postDetail") {
    return this[key].data;
  }

  set(key: "postList" | "postDetail", data: any) {
    this[key].data = data;
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
