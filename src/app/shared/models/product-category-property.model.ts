export interface ICategoryProperty {
  id?: string;
  propertyName?: string;
  propertyCode?: string;
  categoryId?: string;
  deleted?: boolean;
  code?: string;
}

export class CategoryProperty implements ICategoryProperty {
  constructor(
    public id?: string,
    public propertyName?: string,
    public propertyCode?: string,
    public categoryId?: string,
    public deleted?: false,
    public code?: string
  ) {
    this.id = id;
    this.propertyName = propertyName;
    this.propertyCode = propertyCode;
    this.categoryId = categoryId;
    this.deleted = deleted;
    this.code = code;
  }
}
