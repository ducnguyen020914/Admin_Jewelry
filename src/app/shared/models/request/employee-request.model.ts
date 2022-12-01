export enum Role{
CUSTOMER='CUSTOMER',EMPLOYEE='EMPLOYEE',MANAGER='MANAGER'
}
export interface IEmployeeRequest {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  status?: string;
  role?:Role;
}

export class EmployeeRequest implements IEmployeeRequest {
  constructor(
    public keyword?: string,
    public pageIndex?: number,
    public pageSize?: number,
    public sortBy?: string,
    public status?: string,
    public role?:Role
  ) {
    this.keyword = keyword;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortBy = sortBy;
    this.status = status;
    this.role = role;
  }
}
