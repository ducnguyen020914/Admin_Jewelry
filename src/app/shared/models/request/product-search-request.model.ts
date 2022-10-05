import { ProductStatus } from '../enums/productStatus.enum';


export interface IProductSearchRequest {
  name?: string;
  type?: string;
  startPrice?: number;
  endPrice?: number;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  manufactureId?: string;
  categoryId?: string;
  color?: string;
  material?: string;
  dimensions?: string;
  status?: ProductStatus;
}

export class ProductSearchRequest implements IProductSearchRequest {
  constructor(
    public name?: string,
    public type?: string,
    public startPrice?: number,
    public endPrice?: number,
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public keyword?: string,
    public manufactureId?: string,
    public categoryId?: string,
    public color?: string,
    public material?: string,
    public dimensions?: string,
    public status?: ProductStatus
  ) {
    this.name = name;
    this.type = type;
    this.startPrice = startPrice;
    this.endPrice = endPrice;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.categoryId = categoryId;
    this.manufactureId = manufactureId;
    this.color = color;
    this.material = material;
    this.dimensions = dimensions;
    this.status = status;
  }
}
