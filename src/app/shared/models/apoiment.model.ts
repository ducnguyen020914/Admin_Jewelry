import { Product } from './productReal.model';

export enum CalendarStatus{
    WAIT_CONFIRM="WAIT_CONFIRM",
    ACTIVE="ACTIVE",
    DONE="DONE",
    CLOSE="CLOSE"
}
export interface IApoiment{
    id?:string;
    userName?:string,

    phoneNumber?:string,

    email?:string,

    deposit?:number,

    product?:Product,

    note?:string,

    createAt?:number;

    lastmodifiedAt?:number;

    createBy?:string;

    lastmodifiedBy?:string;

    time?:number;

    status?:CalendarStatus,
}

export class Apoiment implements IApoiment{
    constructor(
        public id?:string,
   public userName?:string,

   public phoneNumber?:string,

   public email?:string,

   public deposit?:number,

   public product?:Product,

   public note?:string,

   public  createAt?:number,

   public  lastmodifiedAt?:number,

   public createBy?:string,
   
   public time?:number,
   
   public productId?:string,

   public status?:CalendarStatus,

   public sizeId?:string,

   public lastmodifiedBy?:string){
    this.userName = userName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.deposit = deposit;
    this.product = product;
    this.note = note;
    this.createAt = createAt;
    this.createBy = createBy;
    this.lastmodifiedAt = lastmodifiedAt;
    this.lastmodifiedBy = lastmodifiedBy;
    this.time = time;
    this.productId = productId;
    this.sizeId = sizeId;
    this.status = status
    }
}