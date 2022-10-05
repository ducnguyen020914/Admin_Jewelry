import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { FileService } from '@shared/services/file.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_ACTIONS, ROUTER_UTILS } from '@shared/utils/router.utils';
import { ResizedEvent } from 'angular-resize-event';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { STATUS_ACTIVE } from '@shared/constants/status.constants';
import {CustomerUpdateComponent} from "@pages/admin/user/customer/customer-update/customer-update.component";
import {CustomerRequest} from "@shared/models/request/customer-request.model";
import {ICustomer} from "@shared/models/customer.model";
import {CustomerService} from "@shared/services/customer.service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild('body')
  body!: ElementRef;
  columns: number = 4;
  keyword = '';
  customerRequest: CustomerRequest = {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = 12;
  pageSizeOptions = [12, 24, 48];
  total = 0;
  loading = true;
  isVisible = false;
  customers: ICustomer[] = [];
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
    private customerService: CustomerService,
    private router: Router,
    private translateService: TranslateService,
    private modalService: NzModalService,
    private toast: ToastService
  ) {}

  ngOnInit() {
    this.loadData(this.pageIndex, this.pageSize);
  }

  search(event: any): void {
    this.customerRequest.keyword = event?.target?.value.trim();
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }
  loadData(
    pageNumber: number,
    size: number,
    sortBy?: string,
    isLoading = true
  ): void {
    this.customerRequest.pageIndex = pageNumber;
    this.customerRequest.pageSize = size;
    this.customerRequest.sortBy = sortBy;
    this.loading = isLoading;
    this.customerService.search(this.customerRequest, (isLoading = true)).subscribe(
      (respone: any) => {
        const data = respone?.body?.data;
        const page = respone?.body?.page;
        console.log(data);
        this.customers = data;
        this.total = page.total || 0;
        this.loading = false;
      },
      (error: any) => {
        this.customers = [];
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
  detail(customer: ICustomer): void {
    this.router.navigate([ROUTER_UTILS.customer.root, customer.id, 'detail']);
  }
  delete(customer: ICustomer): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      // fix later i18 ...
      'model.customer.deleteCustomerTitle',
      'model.customer.deleteCustomerContent',
      { name: customer?.fullName }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.customerService.delete(customer?.id || '').subscribe((response: any) => {
          this.toast.success('model.register.success.delete');
          this.loadData(this.pageIndex, this.pageSize);
        });
      }
    });
  }

  update(customer: ICustomer): void {
    console.log(this.customers);
    const base = CommonUtil.modalBase(
      CustomerUpdateComponent,
      {
        action: ROUTER_ACTIONS.update,
        customer,
      },
      '40%'
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
      CustomerUpdateComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex, this.pageSize);
      }
    });
  }
  lock(item: ICustomer) {
    this.isVisible = true;
    if (item.status === STATUS_ACTIVE) {
      console.log('hello');
      this.lockPopup = {
        title: 'model.customer.lockCustomerTitle',
        content: 'model.customer.lockCustomerContent',
        interpolateParams: { name: item.fullName },
        okText: 'action.lock',
        callBack: () => {
          if (item.id) {
            this.customerService.inactive(item.id).subscribe((next) => {
              this.toast.success('model.customer.lockSuccess');
              item.status = 'INACTIVE';
            });
          }
        },
      };
    } else {
      this.lockPopup = {
        title: 'model.customer.unlockCustomerTitle',
        content: 'model.customer.unlockCustomerTitle',
        interpolateParams: { name: item.fullName },
        okText: 'action.unlock',
        callBack: () => {
          if (item.id) {
            this.customerService.active(item.id).subscribe((next) => {
              this.toast.success('model.customer.unlockSuccess');
              item.status = 'ACTIVE';
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
