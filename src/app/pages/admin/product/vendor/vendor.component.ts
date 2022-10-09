import { Component, OnInit } from '@angular/core';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IVendor, Vendor } from '../../../../shared/models/vendor.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { VendorSearchRequest } from '../../../../shared/models/request/vendor-search-request.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import CommonUtil from '../../../../shared/utils/common-utils';
import { VendorService } from '../../../../shared/services/product/vendorservice';
import { ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import { UpdateVendorComponent } from '../update-vendor/update-vendor.component';
import { DetailVendorComponent } from '../detail-vendor/detail-vendor.component';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  vendors: IVendor[] = [];
  vendorSearchRequest:VendorSearchRequest = {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  pathTranslateAccountType = 'model.vendor.'
  keyword = '';
  isCallFirstRequest = true;
  total = 0;
  loading = true;
  isVisible = false;
  groupLockPopup = {
    title: '',
    content: '',
    okText: '',
  };
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toast: ToastService,
    private modalService: NzModalService,
    private router: Router,
    private vendorService:VendorService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex, this.pageSize);
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(index, this.pageIndex, this.pageSize);
  }
  create(): void {
    const base = CommonUtil.modalBase(
      UpdateVendorComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex,this.pageSize);
      }
    });
  }
  update(vendor:IVendor): void {
    const base = CommonUtil.modalBase(
      UpdateVendorComponent,
      {
        isUpdate: true,
        vendor,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex,this.pageSize);
      }
    });
  }
  detail(vendor: IVendor): void {
    console.log(vendor);
    
    const base = CommonUtil.modalBase(
      DetailVendorComponent,
      {
        action: ROUTER_ACTIONS.detail,
        vendor,
      },
      '40%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {});
  }
  delete(vendor: IVendor): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.manufacture.deleteManufactureTitel',
      'model.manufacture.deleteManufactureContent',
      { name: vendor?.name }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.vendorService
          .delete(vendor?.vendorId || '')
          .subscribe((response: any) => {
            this.toast.success('model.product.success.delete');
            this.loadData(this.pageIndex,this.pageSize);
          });
      }
    });
  }
  initForm(): void {
    this.form = this.fb.group({
      keyword: null,
      roleIds: null,
      status: null,
    });
  }
  search(): void {
    this.vendorSearchRequest.keyword = this.form.get('keyword')?.value;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(
    pageNumber: number,
    size: number,
    sortBy?: string,
    isLoading = true
  ): void {
    this.vendorSearchRequest.pageIndex = pageNumber;
    this.vendorSearchRequest.pageSize = size;
    this.vendorSearchRequest.sortBy = sortBy;
    this.loading = isLoading;
    this.vendorService.search(this.vendorSearchRequest).subscribe((res:any) => {
      this.vendors = res.body?.data.data;
      this.total  = res.body?.data?.page.total;
      console.log(res);
      
    })
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



  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    console.log(params);
    
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


  resetSearch(): void {
    this.form.reset();
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }
}
