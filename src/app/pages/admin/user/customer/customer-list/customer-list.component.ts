import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UploadComponent } from '@shared/components/upload/upload.component';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { STATUS_ACTIVE } from '@shared/constants/status.constants';
import {
  USER_ACTIVE,
  USER_EMPLOYEE,
  USER_INACTIVE,
  USER_PROFILE_INTERNAL,
  USER_PROFILE_LDAP,
  USER_STATUS
} from '@shared/constants/user.constant';
import { IUserRequest } from '@shared/models/request/user-request.model';
import { IRole, Role } from '@shared/models/role.model';
import { IUser, User } from '@shared/models/user.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { UserService } from '@shared/services/user.service';
import CommonUtil from '@shared/utils/common-utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {ROLES} from "@shared/constants/role.constant";
import { EmployeeUpdateComponent } from '../../employee/employee-update/employee-update.component';
import { ROUTER_ACTIONS } from '../../../../../shared/utils/router.utils';
import { ICustomer } from '../../../../../shared/models/customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({});
  users: IUser[] = [];
  user: IUser = {};
  keyword = '';
  isCallFirstRequest = true;
  // allChecked = false;
  // indeterminate = false;
  total = 0;
  loading = true;
  isVisible = false;
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  pageSizeOptions = PAGINATION.OPTIONS;
  userRequest: IUserRequest = {};
  userProfileInternal = USER_PROFILE_INTERNAL;
  userProfileLdap = USER_PROFILE_LDAP;
  userActive = USER_ACTIVE;
  userInactive = USER_INACTIVE;
  userEmployee = USER_EMPLOYEE;
  active = false;
  USER_INTERNAL = USER_PROFILE_INTERNAL;
  ACTIVE = STATUS_ACTIVE;
  advanceSearch: IUserRequest = {};
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  pathTranslateAccountType = 'model.user.service.accountType.';
  roles: IRole[] = [];
  userStatus = USER_STATUS;
  rolesSelect = ROLES;
  constructor(
    private fb: UntypedFormBuilder,
    private userService: UserService,
    private translateService: TranslateService,
    private toast: ToastService,
    private modalService: NzModalService,
    private router: Router,
  ) {
    this.onSearchRoles('');
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(index, this.pageIndex, this.pageSize);
  }

  initForm(): void {
    this.form = this.fb.group({
      keyword: null,
      roleIds: null,
      status: null,
    });
  }

  // search(event: any): void {
  //   this.userRequest.keyword = event?.target?.value.trim();
  //   this.pageIndex = PAGINATION.PAGE_DEFAULT;
  //   this.loadData(this.pageIndex, this.pageSize);
  // }

  search(): void {
    this.userRequest.keyword = this.form.get('keyword')?.value;
    this.userRequest.role = this.form.get('role')?.value;
    this.userRequest.status = this.form.get('status')?.value;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(
    pageNumber: number,
    size: number,
    sortBy?: string,
    isLoading = true
  ): void {
    this.userRequest.pageIndex = pageNumber;
    this.userRequest.pageSize = size;
    this.userRequest.hasPageable = true;
    this.userRequest.sortBy = sortBy;
    this.loading = isLoading;
    this.userRequest.role = 'CUSTOMER'
    this.userService.search(this.userRequest, (isLoading = true)).subscribe(
      (response: any) => {
        const data = response?.body?.data;
        const page = response?.body?.page;
        console.log(data)
        if (data.length > 0) {
          data.map((user: User): any => (user.checked = false));
        }
        this.users = data;
        this.total = page.total || 0;
        this.loading = false;
      },
      (error: any) => {
        this.users = [];
        this.total = 0;
        this.loading = false;
      }
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.isCallFirstRequest) {
      this.isCallFirstRequest = false;
      return;
    }
    const { sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    let sortBy = '';
    if (sortField && sortOrder) {
      sortBy = `${sortField}.${sortOrder === 'ascend' ? 'asc' : 'desc'}`;
    }
    this.loadData(this.pageIndex, this.pageSize, sortBy);
  }

  import(): void {
    const base = CommonUtil.modalBase(UploadComponent, {
      multiple: false,
      acceptTypeFiles: ['excel'],
      isImport: true,
      typeDownload: 'user',
    });
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.pageIndex = PAGINATION.PAGE_DEFAULT;
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  create(value: string): void {
    const base = CommonUtil.modalBase(
      EmployeeUpdateComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }

  update(employee: ICustomer): void {
    const base = CommonUtil.modalBase(
      EmployeeUpdateComponent,
      {
        action: ROUTER_ACTIONS.update,
        employee
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }
  onLockAndUnLock(result: { success: boolean }): void {
    this.lockPopup.callBack = () => {};
    this.isVisible = false;
  }
  lock(user: IUser): void {
    this.isVisible = true;
  if (!user.status) {
    this.lockPopup = {
      title: 'model..lockTitle',
      content: 'model.user.inActiveUserContent',
      interpolateParams: { name: user.fullName },
      okText: 'action.lock',
      callBack: () => {
        if (user.userId) {
          this.userService
            .inactive(user.userId)
            .subscribe((next) => {
              this.toast.success('model.category.lockSuccess');
              user.status = true
              
            });
        }
      },
    };
  } else {
    this.lockPopup = {
      title: 'model.user.lockTitle',
      content: 'model.user.activeUserContent',
      interpolateParams: { name:user.fullName  },
      okText: 'action.unlock',
      callBack: () => {
        if (user.userId) 
        console.log(user.userId);
        {
          this.userService
            .active(user.userId)
            .subscribe((next) => {
              this.toast.success('model.material.unlockSuccess');
              user.status = false
            });
        }
      },
    };
  }
}

  format(value: any, type: string): any {
    if (value && type === 'status') {
      return this.translateService.instant(
        ['common', value.toLowerCase()].join('.')
      );
    }
  }


  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  getLimitLength(text: string): string {
    return CommonUtil.getLimitLength(text, 25);
  }

  getTranslate(s: string): string {
    return this.translateService.instant(
      this.pathTranslateAccountType + '' + s
    );
  }


  onSearchRoles(keyword: any): void {
    // this.roleService
    //   .searchAutoComplete({ keyword: keyword.trim() })
    //   .subscribe((res) => {
    //     const data = res?.body?.data as Array<Role>;
    //     this.roles = data || [];
    //   });
  }

  resetSearch(): void {
    this.form.reset();
    this.userRequest = {};
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.onSearchRoles('');
    this.loadData(this.pageIndex, this.pageSize);
  }

  onChangeSelectRoles(event: any): void {
    const value: Array<string> = event;
    if (value?.length < 1) {
      this.onSearchRoles('');
    }
  }

}
