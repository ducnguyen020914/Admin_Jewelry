
export interface IAccessory {
  id?: string;
  deleted?: boolean;
  name?: string;
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Accessory implements IAccessory {
  constructor(
    public id?: string,
    public name?: string,
    public deleted?: boolean,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.id = id;
    this.name = name;
    this.deleted = deleted;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
