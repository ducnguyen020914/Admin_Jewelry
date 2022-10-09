
export interface IMaterial {
  id?: string;
  materialName?:string;
  purchasePrice?:number;
  salePrice?:number;
  materialTypeName?:string;
  color?:string;
  type?:string;
  age?:number;
  createdAt?: number;
  createdBy?: string;
  lastModifiedAt?: number;
  lastModifiedBy?: string;
}
export class Material implements IMaterial {
  constructor(
    public id?: string,
    public materialName?:string,
    public purchasePrice?:number,
    public salePrice?:number,
    public  materialTypeName?:string,
    public color?:string,
    public type?:string,
    public age?:number,
    public createdAt?: number,
    public createdBy?: string,
    public lastModifiedAt?: number,
    public lastModifiedBy?: string,
  ) {
    this.id = id;
    this.materialName = materialName;
    this.purchasePrice = purchasePrice;
    this.salePrice = salePrice;
    this.materialTypeName = materialName;
    this.color = color;
    this.type = type;
    this.age = age;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
