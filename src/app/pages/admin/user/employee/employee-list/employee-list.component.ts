import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {ActivatedRoute, Router} from "@angular/router";
import {FileService} from "@shared/services/file.service";
import {TranslateService} from "@ngx-translate/core";
import {LENGTH_VALIDATOR} from "@shared/constants/validators.constant";
import { STATUS_ACTIVE } from '@shared/constants/common.constant';
import {Employee, IEmployee} from "@shared/models/employee.model";
import {EmployeeService} from "@shared/services/employee.service";
import {CustomerRequest} from "@shared/models/request/customer-request.model";
import {PAGINATION} from "@shared/constants/pagination.constants";
import {ICustomer} from "@shared/models/customer.model";
import {CustomerService} from "@shared/services/customer.service";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ToastService} from "@shared/services/helpers/toast.service";
import {ResizedEvent} from "angular-resize-event";
import CommonUtil from "@shared/utils/common-utils";
import {ROUTER_ACTIONS, ROUTER_UTILS} from "@shared/utils/router.utils";
import {CustomerUpdateComponent} from "@pages/admin/user/customer/customer-update/customer-update.component";
import {EmployeeRequest, Role} from "@shared/models/request/employee-request.model";
import {EmployeeUpdateComponent} from "@pages/admin/user/employee/employee-update/employee-update.component";
import { EmployeeUpdateComponent1 } from '../employee-update1/employee-update1.component';
import { UserService } from '../../../../../shared/services/user.service';
import { IUser } from '../../../../../shared/models/user.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('body')
  body!: ElementRef;
  columns: number = 4;
  keyword = '';
  employeeRequest: EmployeeRequest = {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = 12;
  pageSizeOptions = [12, 24, 48];
  total = 0;
  loading = true;
  isVisible = false;
  employees: IEmployee[] = [];
  width = 0;
  height = 0;
  change = false;
  absolute = false;
  isFullHD = false;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(
    private fileService: FileService,
    private employeeService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private toast: ToastService
  ) {
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

    search(event: any): void {
      this.employeeRequest.keyword = event?.target?.value.trim();
      this.pageIndex = PAGINATION.PAGE_DEFAULT;
      this.loadData(this.pageIndex, this.pageSize);
    }
    loadData(
      pageNumber: number,
      size: number,
      sortBy?: string,
      isLoading = true
    ): void {
      this.employeeRequest.pageIndex = pageNumber;
      this.employeeRequest.pageSize = size;
      this.employeeRequest.sortBy = sortBy;
      this.employeeRequest.role = Role.EMPLOYEE;
      this.loading = isLoading;
      this.employeeService.search(this.employeeRequest, (isLoading = true)).subscribe(
        (respone: any) => {
          const data = respone?.body?.data;
          const page = respone?.body?.page;
          console.log(data);
          this.employees = data;
          this.total = page.total || 0;
          this.loading = false;
        },
        (error: any) => {
          this.employees = [];
          this.total = 0;
          this.loading = false;
        }
      );
    }

    onResized(event: ResizedEvent) {
      this.width = event.newRect.width;
      this.height = event.newRect.height;
      if (this.width <= 940) {
        this.change = true;
      } else {
        this.change = false;
      }

      if (this.width <= 804) {
        this.absolute = true;
      } else {
        this.absolute = false;
      }

      if (this.width >= 1494) {
        this.isFullHD = true;
      } else {
        this.isFullHD = false;
      }
    }
    getResource(avatarFileUrl: string): string {
      return this.fileService.getFileResource(avatarFileUrl);
    }

    getLimitLength(text: string, num?: number): string {
      return CommonUtil.getLimitLength(text, num ? num : 25);
    }

    onQuerySearch(params: any): void {
      const { pageIndex, pageSize } = params;
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.loadData(this.pageIndex, this.pageSize);
    }
    getFirstLetter(name: string): string {
      return name.charAt(0).toLocaleUpperCase().toString();
    }
    detail(employee: IEmployee): void {
      this.router.navigate([ROUTER_UTILS.employee.root, employee.id, 'detail']);
    }
    delete(employee: IEmployee): void {
      const deleteForm = CommonUtil.modalConfirm(
        this.translateService,
        // fix later i18 ...
        'model.employee.deleteEmployeeTitle',
        'model.employee.deleteEmployeeContent',
        { name: employee?.fullName }
      );
      const modal: NzModalRef = this.modalService.create(deleteForm);
      modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
        if (result?.success) {
          this.employeeService.delete(employee?.id || '').subscribe((response: any) => {
            this.toast.success('model.register.success.delete');
            this.loadData(this.pageIndex, this.pageSize);
          });
        }
      });
    }

    update(employee: IEmployee): void {
      console.log(this.employees);
      const base = CommonUtil.modalBase(
        EmployeeUpdateComponent1,
        {
          action: ROUTER_ACTIONS.update,
          employee,
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

    create(): void {
      const base = CommonUtil.modalBase(
        EmployeeUpdateComponent1,
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
    lock(user: IUser): void {
      this.isVisible = true;
    if (!user.status) {
      this.lockPopup = {
        title: 'model.employee.lockTitle',
        content: 'model.employee.lockContent',
        interpolateParams: { name: user.fullName },
        okText: 'action.lock',
        callBack: () => {
          if (user.userId) {
            this.employeeService
              .inactive(user.userId)
              .subscribe((next) => {
                this.toast.success('model.employee.lockSuccess');
                user.status = true
                
              });
          }
        },
      };
    } else {
      this.lockPopup = {
        title: 'model.employee.unlockTitle',
        content: 'model.employee.unlockContent',
        interpolateParams: { name:user.fullName  },
        okText: 'action.unlock',
        callBack: () => {
          if (user.userId) 
          console.log(user.userId);
          {
            this.employeeService
              .active(user.userId)
              .subscribe((next) => {
                this.toast.success('model.employee.unlockSuccess');
                user.status = false
              });
          }
        },
      };
    }
  }
    onLockAndUnlock(result: { success: boolean }): void {
      this.lockPopup.callBack = () => {};
      this.isVisible = false;
    }

}
