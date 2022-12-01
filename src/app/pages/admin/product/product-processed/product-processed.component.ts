import { Component, OnInit } from '@angular/core';
import { PRODUCT_STATUS } from '../../../../shared/constants/product.constant copy';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductSearchRequest, IWaitingProductSearch } from '../../../../shared/models/request/product-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { Category } from '../../../../shared/models/category.model';
import { Product, IProduct, WaitingProduct } from '../../../../shared/models/productReal.model';
import { Material } from '../../../../shared/models/material.model';
import { Accessory } from '../../../../shared/models/accesory.model';
import { Size } from '../../../../shared/models/size.model';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ProductService } from '../../../../shared/services/product/product.service';
import { AccessoryService } from '../../../../shared/services/product/accessory.service';
import { MaterialService } from '../../../../shared/services/product/material.service';
import { CategoryService } from '../../../../shared/services/product/category.service';
import { Router } from '@angular/router';
import { SizeService } from '../../../../shared/services/product/size.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { AccessorySearchRequest } from '../../../../shared/models/request/accessory-search-request.model';
import CommonUtil from '@shared/utils/common-utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { SORT } from '@shared/constants/common.constant';
import { ROUTER_UTILS, ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import { DetailProductComponent } from '../detail-product/detail-product.component';
import { ProductStatus } from '../../../../shared/models/enums/productStatus.enum';
import { WaitingProductService } from '../../../../shared/services/product/waiting-product.service';
import * as moment from 'moment';
import { UpdateWaitingProductComponent } from '../update-waitingProduct/update-waitingProduct.component';
import { DetailWaitingProductComponent } from '../detail-waitingProduct/detail-waitingProduct.component';

@Component({
  selector: 'app-product-processed',
  templateUrl: './product-processed.component.html',
  styleUrls: ['./product-processed.component.css']
})
export class ProductProcessedComponent implements OnInit {

  productStatus = PRODUCT_STATUS;
  form: FormGroup = new FormGroup({});
  productSearchRequest: IWaitingProductSearch = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  formSearchProduct: FormGroup = new FormGroup([]);
  pageNumber = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  isVisible = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  categories: Category[] = [];
  products: WaitingProduct[] = [];
  accessories: Accessory[] = [];
  materials: Material[] = [];
  productAutos:Product[] = [];
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
    private productService: WaitingProductService,
    private productAutoService :ProductService,
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
    this.loadProduct();
    this.loadSize();
    this.initForm();
  
  }
  initForm() {
    this.form = this.fb.group({
      keyword: [this.productSearchRequest.keyword || ''],
      productId: [this.productSearchRequest.productId || null],
      startDate: [this.productSearchRequest.startDate || null],
      endDate: [this.productSearchRequest.endDate ||null],
      sizeId: [this.productSearchRequest.sizeId || null]
    });
  }
  loadData(pageIndex: number, pageSize: number, sortBy?: string) {
    this.productSearchRequest.pageIndex = pageIndex;
    this.productSearchRequest.pageSize = pageSize;
    this.productSearchRequest.sortBy = sortBy;
    this.productService
      .search(this.productSearchRequest)
      .subscribe((response: any) => {
        this.products = response.body?.data?.data;
        this.total = response.body?.data?.page.total
        console.log(response);
      });
  }

  search() {
    this.productSearchRequest.keyword = this.form.get('keyword')?.value;
    this.productSearchRequest.productId = this.form.get('productId')?.value;
    this.productSearchRequest.sizeId = this.form.get('sizeId')?.value;
    const endCreatedAt = this.form.get('endDate')?.value;
    const startCreatedAt = this.form.get('startDate')?.value;
    if (startCreatedAt) {
      this.productSearchRequest.startDate = moment(startCreatedAt).format('yyyy/MM/DD');
    } else {
      this.productSearchRequest.startDate = '';
    }
    if (endCreatedAt) {
      this.productSearchRequest.endDate = moment(endCreatedAt).format('yyyy/MM/DD');
     }
     else {
      this.productSearchRequest.endDate = '';
    }
  this.loadData(this.pageNumber, this.pageSize);
}
  loadMaterial() {
    this.materialService.autoComplete().subscribe((res:any) =>{
      this.materials = res.body?.data
    })
  }
  loadProduct() {
    this.productAutoService.autoComlete().subscribe((res:any) =>{
      console.log(res);
      
      this.productAutos = res.body?.data
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
  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
    this.form.get('startDate')?.setValue(rangeDate.fromDate);
    this.form.get('endDate')?.setValue(rangeDate.toDate);
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
    this.form.get('keyword')?.setValue('');
    this.form.get('productId')?.setValue(null);
    this.form.get('sizeId')?.setValue(null);
    this.form.get('endDate')?.setValue(null);
    this.form.get('startDate')?.setValue(null);
    this.form.get('')
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
  
  update(product:WaitingProduct): void {
    const base = CommonUtil.modalBase(
      UpdateWaitingProductComponent,
      {
        action: ROUTER_ACTIONS.update,
        product
      },
      '50%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result?.success) {
        this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
      }
    });
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
  send(item: WaitingProduct){
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.product.sendProductTitle',
      'model.product.sendProductContent',
      { name: item?.product?.nameProduct }
    );

    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.productService
          .delete(item?.id || '')
          .subscribe((response: any) => {
            this.toast.success('model.product.addProduct');
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
      DetailWaitingProductComponent,
      {
        action: ROUTER_ACTIONS.detail,
        product,
      },
      '50%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result?.success) {
        this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
      }
    });
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

}
