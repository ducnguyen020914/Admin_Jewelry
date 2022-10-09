import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '@shared/models/category.model';
import { CATEGORY_STATUS } from '../../../../shared/constants/product.constant copy';
import { CategorySearchRequest } from '../../../../shared/models/request/category-search-request.model';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import CommonUtil from '../../../../shared/utils/common-utils';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CategoryService } from '@shared/services/product/category.service';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { DetailCategoryComponent } from '../detail-category/detail-category.component';
import { ICategory } from '../../../../shared/models/category.model';
import { RouterModule, Router } from '@angular/router';
import { ROUTER_UTILS } from '../../../../shared/utils/router.utils';
import { ToastService } from '../../../../shared/services/helpers/toast.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  pathTranslate = 'model.category.';
  form: FormGroup = new FormGroup([]);
  categoryStatus = CATEGORY_STATUS;
  categorySearchRequest: CategorySearchRequest = {};
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  categories: Category[] = [];
  isVisible = false;
  loading = false;
  isCallFirstRequest = true;
  total = 0;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(
    private translateService: TranslateService,
    private modalService: NzModalService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private route:Router,
    private toast:ToastService
  ) {}

  ngOnInit() {
    this.loadDataCategory(this.pageIndex, this.pageSize);
    this.initForm();
  }
  initForm() {
    this.form = this.fb.group({
      keyword: [''],
    });
  }
  loadDataCategory(
    pageNumber: number,
    size: number,
    sortBy?: string,
    isLoading = true
  ) {
    this.categorySearchRequest.pageIndex = pageNumber;
    this.categorySearchRequest.pageSize = size;
    this.categorySearchRequest.sortBy = sortBy;
    this.loading = isLoading;
    this.categoryService
      .search(this.categorySearchRequest)
      .subscribe((response: any) => {
        this.categories = response.body?.data;
        this.total = response.body?.page.total;
        console.log(response);
      });
  }

  getTranslate(str: string): string {
    return this.translateService.instant(this.pathTranslate + '' + str);
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.categorySearchRequest.pageIndex,
      this.categorySearchRequest.pageSize
    );
  }
  onSearch() {
    this.categorySearchRequest.keyword = this.form.get('keyword')?.value;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.loadDataCategory(this.pageIndex, this.pageSize);
  }
  resetSearch(): void {
    this.form.reset();
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.categorySearchRequest.keyword = this.form.get('keyword')?.value;
    0;
    this.loadDataCategory(this.pageIndex, this.pageSize);
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
    this.loadDataCategory(this.pageIndex, this.pageSize, sortBy);
  }
  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadDataCategory(this.pageIndex, this.pageSize);
  }

  onLockAndUnLock(event: any) {}
  create(): void {
    const base = CommonUtil.modalBase(
      UpdateCategoryComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadDataCategory(this.pageIndex, this.pageSize);
      }
    });
  }
  update(category: Category): void {
    const base = CommonUtil.modalBase(
      UpdateCategoryComponent,
      {
        isUpdate: true,
        category,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadDataCategory(this.pageIndex, this.pageSize);
      }
    });
  }
  detail(category: ICategory): void {
    this.route.navigate([
      ROUTER_UTILS.product.root,
      ROUTER_UTILS.product.category,
      category.categoryId,
      ROUTER_ACTIONS.detail,
    ]);
  }
  delete(category: ICategory): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.category.deleteCategoryTitle',
      'model.category.deleteCategoryContent',
      { name: category?.name }
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.categoryService
          .delete(category?.categoryId || '')
          .subscribe((response: any) => {
            this.toast.success('model.product.success.delete');
            this.loadDataCategory(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
          });
      }
    });
  }
  
}
