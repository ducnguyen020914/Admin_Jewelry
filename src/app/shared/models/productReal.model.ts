

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface IProduct {
  id?: string;
  name?: string;
  code?: string;
  nameProduct?:string;
  weight?: number;
  purchase_price?:number;
  salePrice?:number;
  status?:string;
  amount?:number;
  note?:string;
  gender?:string;
  createdBy?: string,
  createdAt?: number,
  lastModifiedBy?: string,
  lastModifiedAt?: number,
}

export class Product implements IProduct {
  constructor(
  public id?: string,
  public code?: string,
  public nameProduct?:string,
  public weight?: number,
  public purchase_price?:number,
  public salePrice?:number,
  public status?:string,
  public amount?:number,
  public note?:string,
  public gender?:string,
  public  createdBy?: string,
  public createdAt?: number,
  public lastModifiedBy?: string,
  public lastModifiedAt?: number,
  ) {
    this.id = id;
    this.nameProduct = nameProduct;
    this.code = code;
    this.purchase_price = purchase_price;
    this.weight = weight;
    this.salePrice = salePrice;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
    this.note = note;
    this.gender = gender;
    this.amount = amount;
    this.status =status;
    

  }
}
