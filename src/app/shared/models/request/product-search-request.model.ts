import { ProductStatus, ProductGender } from '../productReal.model';


export interface IProductSearchRequest {
  vendorId?: string;
  startPrice?: number;
  endPrice?: number;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  keyword?: string;
  categoryId?: string;
  accessoryId?: string;
  materialId?: string;
  status?: ProductStatus;
  gender?: ProductGender;
}
export interface IWaitingProductSearch {
  productId?:string;

  sizeId?:string;

  startDate?: Date | string;

  endDate?: Date | string;

  keyword?:string;

  pageSize?:number;

  pageIndex?:number;

  sortBy?:string;
}

export class ProductSearchRequest implements IProductSearchRequest {
  constructor(
    public  vendorId?: string,
    public startPrice?: number,
    public  endPrice?: number,
    public pageIndex?: number,
    public  pageSize?: number,
    public sortBy?: string,
    public  keyword?: string,
    public  categoryId?: string,
    public accessoryId?: string,
    public  materialId?: string,
    public status?: ProductStatus,
    public gender?: ProductGender,
  ) {
    this.startPrice = startPrice;
    this.endPrice = endPrice;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.keyword = keyword;
    this.categoryId = categoryId;
    this.materialId = materialId;
    this.status = status;
    this.accessoryId = accessoryId;
    this.vendorId = vendorId;
    this.gender = gender; 
  }
}
