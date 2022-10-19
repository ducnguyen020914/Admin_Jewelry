export interface IProductCategoryProperty {
  id?: string;
  propertyName?: string;
  propertyCode?: string;
  categoryId?: string;
  deleted?: boolean;
  code?: string;
}

export class ProductCategoryProperty implements IProductCategoryProperty {
  constructor(
    public id?: string,
    public name?: string,
    public value?: string,
    public categoryId?: string,
    public deleted?: false,
    public code?: string
  ) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.categoryId = categoryId;
    this.deleted = deleted;
    this.code = code;
  }
}
