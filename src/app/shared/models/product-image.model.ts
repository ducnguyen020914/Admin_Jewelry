export interface IProductImage {
  productImageId?: string;
  imageUrl?: string;
  value?: string;
  productId?: string;
  deleted?: boolean;
}

export class ProductImage implements IProductImage {
  constructor(
    public productImageId?: string,
    public imageUrl?: string,
    public value?: string,
    public productId?: string,
    public deleted?: false
  ) {
    this.productImageId = productImageId;
    this.imageUrl = imageUrl;
    this.value = value;
    this.productId = productId;
    this.deleted = deleted;
  }
}
