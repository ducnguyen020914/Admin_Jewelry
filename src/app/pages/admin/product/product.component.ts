import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { NzMarks } from 'ng-zorro-antd/slider';
import { Category } from '../../../shared/models/category.model';
import { ProductSearchRequest } from '../../../shared/models/request/product-search-request.model';
import CommonUtil from '../../../shared/utils/common-utils';
import { PRODUCT_STATUS } from '../../../shared/constants/product.constant copy';
import { Product, IProduct, ProductStatus, ProductGender } from '../../../shared/models/productReal.model';
import { ROUTER_ACTIONS, ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ProductService } from '@shared/services/product/product.service';
import { PAGINATION } from '../../../shared/constants/pagination.constants';
import { AccessoryService } from '../../../shared/services/product/accessory.service';
import { Accessory } from '../../../shared/models/accesory.model';
import { AccessorySearchRequest } from '../../../shared/models/request/accessory-search-request.model';
import { Material } from '../../../shared/models/material.model';
import { MaterialService } from '../../../shared/services/product/material.service';
import { CategoryService } from '../../../shared/services/product/category.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { GENDER, SORT } from '@shared/constants/common.constant';
import { Router } from '@angular/router';
import { Size } from '../../../shared/models/size.model';
import { SizeService } from '../../../shared/services/product/size.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../shared/services/helpers/toast.service';
import { DetailProductComponent } from './detail-product/detail-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productStatus = PRODUCT_STATUS;
  form: FormGroup = new FormGroup({});
  productSearchRequest: ProductSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  formSearchProduct: FormGroup = new FormGroup([]);
  pageNumber = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  isVisible = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  categories: Category[] = [];
  products: Product[] = [];
  accessories: Accessory[] = [];
  materials: Material[] = [];
  sizes: Size[] = [];
  isFirstFetch = false;
  total = 0;
  minPrice = 0;
  maxPrice = 100000000;
  loading = true;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  marks: NzMarks = {
    0: '0đ',
    20000000: '20.000.000đ',
    40000000: '40.000.000đ',
    60000000: '60.000.000đ',
    80000000: '80.000.000đ',
    100000000: '100.000.000đ',
  };
  constructor(
    private modalService: NzModalService,
    private productService: ProductService,
    private fb: FormBuilder,
    private accessoryService: AccessoryService,
    private materialService: MaterialService,
    private categoryService: CategoryService,
    private router:Router,
    private sizeService:SizeService,
    private translateService:TranslateService,
    private toast:ToastService
  ) {}

  ngOnInit() {
    this.loadData(this.pageNumber, this.pageSize);
    this.initForm();
  
  }
  initForm() {
    this.form = this.fb.group({
      keyword: [this.productSearchRequest.keyword || ''],
      categoryId: [this.productSearchRequest.categoryId || null],
      rangePrice: [[this.minPrice, this.maxPrice]],
      startPrice: [this.productSearchRequest.startPrice || this.minPrice],
      endPrice: [this.productSearchRequest.endPrice || this.maxPrice],
      gender: [this.productSearchRequest.gender || null],
      materialId: [this.productSearchRequest.materialId || null],
      vendorId: [this.productSearchRequest.vendorId || null],
      accessoryId: [this.productSearchRequest.accessoryId || null],
      status: [this.productSearchRequest.status || null],
    });
  }
  loadData(pageIndex: number, pageSize: number, sortBy?: string) {
    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;
    this.productSearchRequest.sortBy = sortBy;
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        this.products = response.body?.data;
        this.total = response.body.page.total;
        console.log(response);
      });
  }
  search() {
    this.productSearchRequest.accessoryId = this.form.get('accessoryId')?.value;
    this.productSearchRequest.categoryId = this.form.get('categoryId')?.value;
    this.productSearchRequest.endPrice = this.form.get('endPrice')?.value;
    this.productSearchRequest.gender = this.form.get('gender')?.value;
    this.productSearchRequest.keyword = this.form.get('keyword')?.value;
    this.productSearchRequest.materialId = this.form.get('materialId')?.value;
    this.productSearchRequest.startPrice = this.form.get('startPrice')?.value;
    this.productSearchRequest.status = this.form.get('status')?.value;
    this.productSearchRequest.vendorId = this.form.get('vendorId')?.value;
    this.loadData(this.pageNumber, this.pageSize);
  }
  loadMaterial() {
    this.materialService.autoComplete().subscribe((res:any) =>{
      this.materials = res.body?.data
    })
  }
  loadCategory() {
    this.categoryService.searchCategoriesAutoComplete().subscribe((res:any) =>{
      this.categories = res.body?.data
    })
  }
  loadSize() {
    this.sizeService.autoComplete().subscribe((res:any) =>{
      this.sizes = res.body?.data
    })
  }
  loadAccessory(event: any) {
    const accessorySearch:AccessorySearchRequest =  {
      keyword: event,
    };
    this.accessoryService.autoComplete(accessorySearch).subscribe((res:any) => {
      this.accessories = res.body?.data?.data;
    })
  }
  formatterPrice = (value: number): string =>
    CommonUtil.moneyFormat(value + '') + ' đ';
  parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
  onChangeRangePrice(): void {
    console.log(this.form.get('rangePrice')?.value);
    
    this.form
      .get('startPrice')
      ?.setValue(this.form.get('rangePrice')?.value[0]);
    this.form
      .get('endPrice')
      ?.setValue(this.form.get('rangePrice')?.value[1]);
  }
  resetSearch() {
    this.form.get('keyword')?.setValue(null);
     this.form.get('categoryId')?.setValue(null)
     this.form.get('rangePrice')?.setValue([this.minPrice, this.maxPrice])
     this.form.get('startPrice')?.setValue(this.minPrice)
     this.form.get('endPrice')?.setValue(this.maxPrice)
     this.form.get('gender')?.setValue(null)
     this.form.get('materialId')?.setValue(null)
     this.form.get('vendorId')?.setValue(null)
     this.form.get('accessoryId')?.setValue(null)
     this.form.get('status')?.setValue(null)
    this.search();
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
    this.loadData(pageIndex,pageSize,sortBy);
  }
  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;

    this.loadData(pageIndex,pageSize);
  }
  onLockAndUnlock(result: { success: boolean }): void {
    this.lockPopup.callBack = () => {};
    this.isVisible = false;
  }
  create(): void {
    this.router.navigate([
      ROUTER_UTILS.product.root,
      ROUTER_UTILS.product.productCreate,
    ]);
  }
  
  update(item:IProduct): void {
    this.router.navigate([
      ROUTER_UTILS.product.root,
      item.productId,'update'
    ]);
  }
  delete(item: IProduct): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.product.deleteProductTitle',
      'model.product.deleteProductContent',
      { name: item?.nameProduct }
    );

    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.productService
          .delete(item?.productId || '')
          .subscribe((response: any) => {
            this.toast.success('model.product.success.delete');
            this.loadData(this.pageNumber, this.pageSize);
          });
      }
    });
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.productSearchRequest.pageIndex,
      this.productSearchRequest.pageSize
    );
  }
  detail(product: IProduct): void {
    const base = CommonUtil.modalBase(
      DetailProductComponent,
      {
        action: ROUTER_ACTIONS.detail,
        product,
      },
      '50%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {});
  }
  lock(item: IProduct) {
    this.isVisible = true;
    if (item.status === ProductStatus.ACTIVE) {
      this.lockPopup = {
        title: 'model.product.lockProductTitle',
        content: 'model.product.lockProductContent',
        interpolateParams: { name: item.nameProduct },
        okText: 'action.lock',
        callBack: () => {
          if (item.productId) {
            this.productService.activeProduct(item.productId).subscribe((next) => {
              this.toast.success('model.product.lockSuccess');
              this.loadData(this.pageNumber,this.pageSize);
            });
          }
        },
      };
    } else {
      this.lockPopup = {
        title: 'model.product.unlockProductTitle',
        content: 'model.product.unlockProductContent',
        interpolateParams: { name: item.nameProduct },
        okText: 'action.unlock',
        callBack: () => {
          if (item.productId) {
            this.productService.inactiveProduct(item.productId).subscribe((next) => {
              this.toast.success('model.guest.unlockSuccess');
              this.loadData(this.pageNumber,this.pageSize);
            });
          }
        },
      };
    }
  }
  getGender(item:string):string{
    if(item === ProductGender.FEMALE){
      return 'Nữ'
    }else if(item === ProductGender.MALE){
      return "Nam"
    }
    return 'Nam và Nữ';
  }
}
