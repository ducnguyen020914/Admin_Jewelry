export interface ICustomerRequest {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  status?: string;
}

export class CustomerRequest implements ICustomerRequest {
  constructor(
    public keyword?: string,
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public status?: string
  ) {
    this.keyword = keyword;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.status = status;
  }
}
