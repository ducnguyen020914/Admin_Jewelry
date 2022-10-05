
export interface ICategorySearchRequest {
  name?: string;
  subTypeId?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
}

export class CategorySearchRequest implements ICategorySearchRequest {
  constructor(
    public name?: string,
    public subTypeId?: string,
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
   
  ) {
    this.name = name;
    this.subTypeId = subTypeId;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    
  }
}
