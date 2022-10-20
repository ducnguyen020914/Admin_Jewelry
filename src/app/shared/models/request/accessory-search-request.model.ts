export enum AccessoryStatus{
  INACTIVE='INACTIVE',
  ACTIVE='ACTIVE',
  DRAFTS='DRAFTS'
}
export interface IAccessorySearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  status?:AccessoryStatus;
  startPrice?:number;
  endPrice?:number;
}

export class AccessorySearchRequest implements IAccessorySearchRequest {
  constructor(
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
    public status?:AccessoryStatus,
    public startPrice?:number,
    public endPrice?:number

  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.status =status;
    this.startPrice =startPrice;
    this.endPrice =endPrice;
  }
}
