import {AccessoryStatus} from "@shared/models/request/accessory-search-request.model";

export interface IAccessory {
  accessoryId?: string;
  deleted?: boolean;
  name?: string;
  createAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
  description?:string;
  color?:string;
  price?:number;
  status?:AccessoryStatus;
}
export class Accessory implements IAccessory {
  constructor(
    public accessoryId?: string,
    public name?: string,
    public deleted?: boolean,
    public createAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
    public description?:string,
    public color?:string,
    public price?:number,
    public status?:AccessoryStatus,
  ) {
    this.accessoryId = accessoryId;
    this.name = name;
    this.deleted = deleted;
    this.description= description;
    this.status = status;
    this.color = color;
    this.createAt = createAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
    this.price = price;
  }
}
