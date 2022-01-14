import { getSecondsDiff, getTimeNow } from "server/dateTimeUtils";

type CacheControllerItem = {
  key: string;
  data: any;
  expireSecond: number;
};

export class CacheController {
  constructor(initialData: CacheControllerItem[]) {
    initialData.forEach((item) => {
      this.items[item.key] = {
        data: item.data,
        expire: item.expireSecond,
        lastUpdated: "",
      };
    });
  }

  get(key: string) {
    console.log(`get cache from: ${key}`);
    return this.items[key].data;
  }

  update(key: string, data: any) {
    console.log(`update cache for: ${key}`);
    this.items[key] = {
      ...this.items[key],
      data,
      lastUpdated: getTimeNow(),
      expire: 5,
    };
  }

  hasFreshData(key: string) {
    if (!this.items[key] || !this.items[key].lastUpdated) {
      return false;
    }
    console.log(`lastUpdated for ${key}: ${this.items[key].lastUpdated}`);

    return (
      this.items[key].data &&
      getSecondsDiff(getTimeNow(), this.items[key].lastUpdated) <
        this.items[key].expire * 1000
    );
  }

  private items: Record<
    string,
    { data: any; lastUpdated: string; expire: number }
  > = {};
}
