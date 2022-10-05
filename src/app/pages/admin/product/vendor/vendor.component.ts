import { Component, OnInit } from '@angular/core';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IVendor } from '../../../../shared/models/vendor.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { VendorSearchRequest } from '../../../../shared/models/request/vendor-search-request.model';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import CommonUtil from '../../../../shared/utils/common-utils';

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
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.onSearchRoles('');
    this.loadData(this.pageIndex, this.pageSize);
  }
}
