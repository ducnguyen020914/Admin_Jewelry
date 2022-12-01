
export interface IEmployee {
  id?: string;
  username?: string;
  fullName?: string;
  password?: string;
  email?: string;
  phoneNumber?: string;
  roles?: string;
  accountType?: string;
  contactId?: string;
  dayOfBirth?: string;
  gender?: string;
  repeatPassword?: string;
  roleIds?: Array<string>;
  employeeCode?: string;
  description?: string;
  status?: boolean;
  departmentName?: string;
  avatarFileId?: string;
  file?: any;
  avatarFileUrl?: string;
  deleted?: boolean;
  address?: string;
}

export class Employee implements IEmployee {
  constructor(
    public id?: string,
    public username?: string,
    public fullName?: string,
    public password?: string,
    public email?: string,
    public phoneNumber?: string,
    public role?: string,
    public accountType?: string,
    public contactId?: string,
    public dayOfBirth?: string,
    public gender?: string,
    public repeatPassword?: string,
    public organizationId?: string,
    public employeeCode?: string,
    public title?: string,
    public description?: string,
    public status?: boolean,
    public avatarFileId?: string,
    public file?: any,
    public avatarFileUrl?: string,
    public deleted?: boolean,
    public address?: string
  ) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
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
    this.address =address;
  }
}
