export interface IProductPropertyValue {
  id?: string;
  name?: string;
  value?: string;
  productId?: string;
  deleted?: boolean;
}

export class ProductPropertyValue implements IProductPropertyValue {
  constructor(
    public id?: string,
    public name?: string,
    public value?: string,
    public productId?: string,
    public deleted?: false
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.productId = productId;
    this.deleted = deleted;
  }
}
