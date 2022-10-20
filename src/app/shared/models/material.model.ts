import { MaterialStatus } from './request/material-search-request.model';

export interface IMaterial {
  materialId?: string;
  materialName?:string;
  purchasePrice?:number;
  salePrice?:number;
  color?:string;
  type?:string;
  status?:MaterialStatus;
  age?:number;
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Material implements IMaterial {
  constructor(
    public materialId?: string,
    public materialName?:string,
    public purchasePrice?:number,
    public salePrice?:number,
    public status?:MaterialStatus,
    public color?:string,
    public type?:string,
    public age?:number,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.materialId = materialId;
    this.materialName = materialName;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.color = color;
    this.status = status;
    this.type = type;
    this.age = age;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
