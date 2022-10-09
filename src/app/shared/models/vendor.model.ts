import { Customer } from './customer.model';
import { Role } from './role.model';
import { UserPrimary } from './user-primary.model';

export interface IVendor {
  vendorId?: string;
  name?: string;
  email?: string;
  address?:string;
  phone?: string;
  bankName?:string;
  bankNumber?:string
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
}

export class Vendor implements IVendor {
  constructor(
    public vendorId?: string,
    public name?: string,
    public email?: string,
    public address?:string,
    public phone?: string,
    public bankName?:string,
    public bankNumber?:string,
    public createdBy?: string,
    public createdAt?: number,
    public lastModifiedBy?: string,
    public lastModifiedAt?: number
  ) {
    this.vendorId = vendorId;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.bankName = bankName;
    this.bankNumber = bankNumber;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
