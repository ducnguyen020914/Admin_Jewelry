import { IOrder, IProductOrder } from './order.model';
 export enum ExchangeEnum {
  CHO_XAC_NHAN='CHO_XAC_NHAN',
  XAC_NHAN='XAC_NHAN',
  THANH_CONG='THANH_CONG',
  HUY='HUY'
}
export interface IExchange {
   id?:string;

   orderId?:string;

   orderDTO?:IOrder;

   productId?:string;


  status?:ExchangeEnum;

    reason?:string;

    note?:string;

    time?:number;

    createAt?:number;

    lastmodifiedAt?:number;

    createBy?:string;

    lastmodifiedBy?:string;

    productOrderDtoList?:IProductOrder[],
}
export class Exchange implements IExchange{
  constructor(public  id?:string,
    public orderId?:string,
    public orderDTO?:IOrder,
    public  productId?:string,
    public status?:ExchangeEnum,
    public  reason?:string,
    public note?:string,
    public time?:number,
    public createAt?:number,
    public lastmodifiedAt?:number,
    public createBy?:string,
    public lastmodifiedBy?:string,
    public productOrderDtoList?:IProductOrder[],) {
      this.id = id;
      this.orderId = orderId;
      this.orderDTO = orderDTO;
      this.productId = productId;
      this.status = status;
      this.reason = reason;
      this.note  = note;
      this.time = time;
      this.createAt = createAt;
      this.createBy = createBy;
      this.lastmodifiedAt = lastmodifiedAt;
      this.lastmodifiedBy = lastmodifiedBy,
      this.productOrderDtoList = productOrderDtoList;
  }
}
