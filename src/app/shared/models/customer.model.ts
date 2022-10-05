import {Role} from "@shared/models/role.model";
import {UserPrimary} from "@shared/models/user-primary.model";

export interface ICustomer {
  id?: string;
  username?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  roles?: string;
  authorities?: any;
  authenticationType?: string;
  accountType?: string;
  contactId?: string;
  dayOfBirth?: string;
  gender?: string;
  repeatPassword?: string;
  roleIds?: Array<string>;
  employeeCode?: string;
  title?: string;
  description?: string;
  status?: string;
  departmentName?: string;
  avatarFileId?: string;
  file?: any;
  avatarFileUrl?: string;
  deleted?: boolean;
  checked?: boolean;
  disabled?: boolean;
  departmentId?: string;
  paper?: string;
  address?: string;
}

export class Customer implements ICustomer {
  constructor(
    public id?: string,
    public username?: string,
    public fullName?: string,
    public password?: string,
    public email?: string,
    public phoneNumber?: string,
    public role?: string,
    public authorities?: any,
    public authenticationType?: string,
    public accountType?: string,
    public contactId?: string,
    public dayOfBirth?: string,
    public gender?: string,
    public repeatPassword?: string,
    public organizationId?: string,
    public employeeCode?: string,
    public title?: string,
    public description?: string,
    public status?: string,
    public avatarFileId?: string,
    public file?: any,
    public avatarFileUrl?: string,
    public deleted?: boolean,
    public checked?: boolean,
    public disabled?: boolean,
    public paper?: string,
    public address?: string
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.authorities = authorities;
    this.authenticationType = authenticationType;
    this.accountType = accountType;
    this.contactId = contactId;
    this.dayOfBirth = dayOfBirth;
    this.gender = gender;
    this.repeatPassword = repeatPassword;
    this.role =role;
    this.organizationId = organizationId;
    this.employeeCode = employeeCode;
    this.title = title;
    this.description = description;
    this.status = status;
    this.avatarFileId = avatarFileId;
    // Thong tin anh trong tai khoan
    this.file = file;
    this.avatarFileUrl = avatarFileUrl;
    this.deleted = deleted;
    this.checked = checked;
    this.disabled = disabled;
    this.paper =paper;
    this.address =address;
  }
}
