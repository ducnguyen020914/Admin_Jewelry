
export interface IEventSearchRequest {
  pageIndex?: number;
  pageSize?: number;
  startDate?: Date | string;
  endDate?:Date | string;
  sortBy?: string;
  keyword?: string;
}
export interface ISizeSearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
}

