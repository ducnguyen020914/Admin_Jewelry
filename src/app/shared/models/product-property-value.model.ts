export interface IProductPropertyValue {
  id?: string;
  propertyName?: string;
  productValue?: string;
  productId?: string;
  deleted?: boolean;
}

export class ProductPropertyValue implements IProductPropertyValue {
  constructor(
    public id?: string,
    public propertyName?: string,
    public propertyValue?: string,
    public productId?: string,
    public deleted?: false
  ) {
    this.id = id;
    this.propertyName = propertyName;
    this.propertyValue = propertyValue;
    this.productId = productId;
    this.deleted = deleted;
  }
}
