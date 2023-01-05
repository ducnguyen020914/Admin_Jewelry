import { CalendarStatus } from '../apoiment.model';

export interface ICalendarSearchRequest {
    pageIndex?: number;
    pageSize?: number;
    sortBy?: string;
    keyword?: string;
    productId?:string;
    startDate?:Date|string;
    endDate?:Date | string;
    status?:CalendarStatus;
  }
  
  export class CalendarSearchRequest implements ICalendarSearchRequest {
    constructor(
      public pageIndex?: number,
      public pageSize?: number,
      public sortBy?: string,
      public keyword?: string,
      public status?:CalendarStatus,
      public productId?:string,
      public startDate?:Date|string,
      public endDate?:Date | string,
    ) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.sortBy = sortBy;
      this.keyword = keyword;
      this.productId = productId;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
    }
  }