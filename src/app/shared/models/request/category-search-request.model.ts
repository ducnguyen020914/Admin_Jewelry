
export interface ICategorySearchRequest {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
}

export class CategorySearchRequest implements ICategorySearchRequest {
  constructor(
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
   
  ) {
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    
  }
}
