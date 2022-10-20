export interface ISize {
  sizeId?: string;
  size?: string;
  description?: string;
  deleted?: boolean;
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export interface ISizeProduct {
  sizeId?: string;
  size?: string;
  weight?: number;
  purchasePrice?: number;
  salePrice?: number;
  quantity?: number;
}
export class SizeProduct implements ISizeProduct {
  constructor(
    public sizeId?: string,
    public size?: string,
    public weight?: number,
    public purchasePrice?: number,
    public salePrice?: number,
    public quantity?: number
  ) {
    this.sizeId = sizeId;
    this.quantity = quantity;
    this.size = size;
    this.weight = weight;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
  }
}
export class Size implements ISize {
  constructor(
    public sizeId?: string,
    public size?: string,
    public description?: string,
    public deleted?: boolean,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string
  ) {
    this.size = size;
    this.sizeId = sizeId;
    this.description = description;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
