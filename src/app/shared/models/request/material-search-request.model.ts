
export enum MaterialStatus{
  INACTIVE='INACTIVE',ACTIVE='ACTIVE'
}
export interface IMaterialSearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  status?:MaterialStatus;
  type?:string;
  startPrice?:number;
  endPrice?:number;
}

export class MaterialSearchRequest implements IMaterialSearchRequest {
  constructor(
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
    public status?:MaterialStatus,
    public type?:string,
    public startPrice?:number,
    public endPrice?:number
   
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.type = type;
    this.status = status;
    this.startPrice = startPrice;
    this.endPrice = endPrice;
  }
}
