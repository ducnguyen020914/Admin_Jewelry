
export interface ICategory {
  id?: string;
  deleted?: boolean;
  name?: string;
  properties?:string[];
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Category implements ICategory {
  constructor(
    public id?: string,
    public name?: string,
    public properties?:string[],
    public deleted?: boolean,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.id = id;
    this.name = name;
    this.properties = properties;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
