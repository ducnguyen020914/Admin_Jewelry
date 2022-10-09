
export interface IMaterialSearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  color?:string;
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
    public color?:string,
    public type?:string,
    public startPrice?:number,
    public endPrice?:number
   
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.color = color;
    this.type = type;
    this.startPrice = startPrice;
    this.endPrice = endPrice;
  }
}
