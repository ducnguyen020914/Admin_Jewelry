import { Customer } from './customer.model';
import { Role } from './role.model';
import { UserPrimary } from './user-primary.model';

export interface IVendor {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  createdBy?: string;
  createdAt?: number;
  lastModifiedBy?: string;
  lastModifiedAt?: number;
}

export class Vendor implements IVendor {
  constructor(
    public id?: string,
    public username?: string,
    public fullName?: string,
    public password?: string,
    public email?: string,
    public phoneNumber?: string,
    public createdBy?: string,
    public createdAt?: number,
    public lastModifiedBy?: string,
    public lastModifiedAt?: number
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
  }
}
