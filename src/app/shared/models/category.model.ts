
export interface ICategory {
  categoryId?: string;
  deleted?: boolean;
  name?: string;
  properties?:string[];
  description?:string;
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Category implements ICategory {
  constructor(
    public categoryId?: string,
    public name?: string,
    public properties?:string[],
    public description?:string,
    public deleted?: boolean,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.categoryId = categoryId;
    this.name = name;
    this.properties = properties;
    this.description = description;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
