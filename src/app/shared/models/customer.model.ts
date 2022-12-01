import {Role} from "@shared/models/role.model";
import {UserPrimary} from "@shared/models/user-primary.model";

export interface ICustomer {
  userId?: string;
  userName?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
  birthday?: string;
  gender?: string;
  confirmPassword?: string;
  cccd?:string,
  imageUrl?:string,
  note?:string,
  maNV?:string,
  deleted?:boolean,
  createAt?:number,
  createBy?:string,
  lastModifiedAt?:number,
  lastModifiedBy?:string,
  address?: string;
}

export class Customer implements ICustomer {
  constructor(
    public userId?: string,
    public userName?: string,
    public  fullName?: string,
    public  password?: string,
    public  email?: string,
    public  phoneNumber?: string,
    public  role?: string,
    public birthday?: string,
    public  gender?: string,
    public confirmPassword?: string,
    public cccd?:string,
    public imageUrl?:string,
    public note?:string,
    public   maNV?:string,
    public deleted?:boolean,
    public createAt?:number,
    public createBy?:string,
    public lastModifiedAt?:number,
    public lastModifiedBy?:string,
    public address?: string
  
  ) {
   this.userId = userId;
   this.userName = userName
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.role =role;
    this.address = address;
    this.deleted = deleted;
    this.maNV = maNV;
    this.cccd = cccd;
    this.imageUrl = imageUrl;
    this.note = note;
    this.birthday= birthday;
    this.confirmPassword = confirmPassword;
    this.createBy = createBy;
    this.lastModifiedAt = lastModifiedAt;
    this.lastModifiedBy = lastModifiedBy;
    this.createAt = createAt;
   
  }
}
