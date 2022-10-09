import { Component, OnInit,Input } from '@angular/core';
import { Vendor, IVendor } from '../../../../shared/models/vendor.model';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Category, ICategory } from '../../../../shared/models/category.model';
import { Product } from '../../../../shared/models/productReal.model';
import { ProductSearchRequest } from '../../../../shared/models/request/product-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../shared/services/product/category.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SORT } from '@shared/constants/common.constant';
@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {

  id = '';
  category: ICategory = {};
  tabIndex = 0;
  vCardData = '';
  products: Product[] = [];
  productSearchRequest: ProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  formSearchProduct: FormGroup = new FormGroup({});
  isFirstFetch = true;
  total = 0;
  action = '';
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.activatedRoute.data.subscribe((res) => {
      this.action = res.action;
    });
    this.activatedRoute.paramMap.subscribe((res) => {
      this.id = res.get('id') || '';
    });
  }

  ngOnInit(): void {
    if (!!this.id) {
      this.initForm();
      this.initCategory(this.id);
     // this.loadDataProducts(this.id);
    }
  }

  initForm(): void {
    this.formSearchProduct = this.fb.group({
      keyword: [this.productSearchRequest.keyword || null],
    });
  }

  initCategory(id: string): void {
    this.categoryService
      .findByCategoryId(id, true)
      .subscribe((response: any) => {
        this.category = response.body?.data;
        this.getContactQRCode(this.category);
      });
  }

  loadProperties(): string[] {
    const properties: string[] = [];
    this.category.properties?.map((property: any) => {
      properties.push(property.name);
    });
    return properties;
  }

  onChangeTab(tabIndex: number): any {
    this.tabIndex = tabIndex;
  }

  loadDataProducts(id: string): void {
    this.productSearchRequest.categoryId = id;
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        const data = response?.body?.data;
        this.products = data;
        this.total = response.body.page.total;
      });
  }

  search(): void {
    this.productSearchRequest.keyword =
      this.formSearchProduct.get('keyword')?.value;
    this.loadDataProducts(this.id);
  }
  resetSearch(): void {
    this.formSearchProduct.get('keyword')?.setValue(null);
    this.search();
  }

  // Set infomation to vcard qrCode
  getContactQRCode(category: ICategory): void {
    const name = category.name ? category.name?.toUpperCase() : 'Category';
    this.vCardData =
      `BEGIN:VCARD` +
      `\nN:${name}` +
      `\nN:${category.categoryId}` +
      `\nN:${category.properties}` +
      `\nVERSION:3.0\nEND:VCARD`;
  }

  onChangeQueryParam(params: NzTableQueryParams): void {
    if (this.isFirstFetch) {
      this.isFirstFetch = false;
      return;
    }
    const { pageIndex, pageSize, sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    let sortBy = '';
    if (sortField && sortOrder) {
      sortBy = `${sortField}.${
        sortOrder === SORT.ASCEND ? SORT.ASC : SORT.DESC
      }`;
    } else {
      sortBy = '';
    }
    this.productSearchRequest.sortBy = sortBy;
    this.loadDataProducts(this.id);
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;
    this.loadDataProducts(this.id);
  }

}
