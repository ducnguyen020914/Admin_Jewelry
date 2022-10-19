
export interface IAccessory {
  accessoryId?: string;
  color?: string;
  name?: string;
  price?:number;
  createdAt?: number;
  createdBy?: string;
  status?:string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Accessory implements IAccessory {
  constructor(
    public accessoryId?: string,
    public name?: string,
    public color?: string,
    public status?:string,
    public price?:number,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.accessoryId = accessoryId;
    this.name = name;
    this.color = color;
    this.status = status;
    this.price = price;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
