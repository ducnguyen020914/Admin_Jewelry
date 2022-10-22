import {TransferItem} from "ng-zorro-antd/transfer";
import {IProduct} from "@shared/models/productReal.model";
import { User } from "./user.model";
export enum PaymentMethod {
  MONEY="MONEY",
  CARD = "CARD",
}
export enum StatusEnum {
  CHO_XAC_NHAN = "CHO_XAC_NHAN",
  XAC_NHAN = "XAC_NHAN",
  DANG_GIAO = "DANG_GIAO",
  DA_GIAO = "DA_GIAO",
  HUY = "HUY"
}
export enum OrderType {
  DIRECT_TYPE = "DIRECT_TYPE",
   ONLINE = "ONLINE"
}
export interface IOrder {
  createBy?: string;
  createAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  id?: string;
  orderCode?: number;
  customerMoney?: number;
  paymentMethod?: PaymentMethod;
  transportFee?:number;
  total?: number;
  purchaseType?:OrderType;
  status?: StatusEnum;
  eventId?:string;
  address?:string;
  user?:User;
  event?:Event;
}

export class Order implements IOrder {
  constructor( 
   public createdBy?: string,
   public createdAt?: number,
   public lastModifiedBy?: string,
   public lastModifiedAt?: number,
   public id?: string,
   public orderCode?: number,
   public customerMoney?: number,
   public paymentMethod?: PaymentMethod,
   public transportFee?:number,
   public total?: number,
   public purchaseType?:OrderType,
   public status?: StatusEnum,
   public eventId?:string,
   public address?:string,
   public user?:User,
   public event?:Event
    ){
      this.createdAt = createdAt;
      this.createdBy = createdBy;
      this.customerMoney = customerMoney;
      this.eventId = eventId;
      this.lastModifiedAt = lastModifiedAt;
      this.lastModifiedBy = lastModifiedBy;
      this.orderCode = orderCode;
      this.id = id;
      this.paymentMethod  = paymentMethod;
      this.purchaseType = purchaseType;
      this.status = status;
      this.total =total;
      this.transportFee = transportFee;
      this.address  = address;
      this.user = user;
      this.event = event;
    }
}

export interface IOrderRequest {
  createdUserId?: string;
  menuId?: string;
  type?: string;
  purchaseOrderItems?: [
    {
      productId?: string;
      quantity?: number;
    }
  ]
}

export interface IOrderItem {
  id?: string;
  orderId?: string;
  productId?: string;
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: number;
  lastModifiedAt?: number;
  purchaseOrderId?: string;
  productName?: string;
  productPrice?: number;
  quantity?: number;
  deleted?: boolean;
}

export class OrderItem implements IOrderItem {
  constructor(
    public id?: string,
    public orderId?: string,
    public productId?: string,
    public quantity?: number,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }
}

export interface IPurchaseOrderHistory {
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
  id?: string;
  createdUserId?: string;
  createdUserFullName?: string;
  purchaseOrderId?: string;
  status?: string;
  deleted?: boolean;
}

export interface ChangeOrderStatusRequest {
  purchaseOrderIds?: string[];
}

export interface ProductItem extends TransferItem {
  data: IProduct & { quantity?: number},
}

export const DEFAULT_QUANTITY = 1;

export const PurchaseForm = [
  { key: 'SOLD_OUT', value: 'Bán ra' },
  { key: 'BUY_INTO', value: 'mua vào' },
]

