export interface IOrderSearchRequest {
  status?: string;
  payMethod?: string;
  purchaseType?: boolean;
  startDate?: Date | string;
  endDate?: Date | string;
  startPrice?:number;
  endPrice?:number;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  userId?:String;
}


export class OrderSearchRequest implements IOrderSearchRequest {
  constructor(
  
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
    public status?: string,
    public payMethod?: string,
    public purchaseType?: boolean,
    public startDate?: Date | string,
    public endDate?: Date | string,
    public startPrice?:number,
    public endPrice?:number,
    public  userId?:String
  ) {
  this.status = status;
  this.payMethod = payMethod;
  this.purchaseType = purchaseType;
  this.startDate = startDate;
  this.endDate = endDate;
  this.startPrice = startPrice;
  this.endPrice = endPrice;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
  this.userId = userId;
  }
}
