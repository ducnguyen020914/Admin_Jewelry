import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { NzMarks } from 'ng-zorro-antd/slider';
import { Category } from '../../../shared/models/category.model';
import { ProductSearchRequest } from '../../../shared/models/request/product-search-request.model';
import CommonUtil from '../../../shared/utils/common-utils';
import { PRODUCT_STATUS } from '../../../shared/constants/product.constant copy';
import { Product } from '../../../shared/models/productReal.model';
import { ROUTER_ACTIONS } from '../../../shared/utils/router.utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductService } from '@shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productStatus = PRODUCT_STATUS;
  productSearchRequest: ProductSearchRequest = {};
  formSearchProduct: FormGroup = new FormGroup([]);
  isVisible = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  categories: Category[] = [];
  products: Product[] = [];
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
  constructor(private modalService:NzModalService,
    private productService:ProductService
             ) {}

  ngOnInit() {
    this.loadData();

  }
  loadData(){
    this.productService.search().subscribe((response :any) => {
      
      this.products = response;
      console.log(this.products);
    })
  };
  search() {}
  loadCategory() {}
  formatterPrice = (value: number): string =>
    CommonUtil.moneyFormat(value + '') + ' đ';
  parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
  onChangeRangePrice() {}
  resetSearch() {}
  onChangeQueryParam(event:any){};
  onQuerySearch(event:any){};
  onLockAndUnlock(event:any){};
  create(){
    const base = CommonUtil.modalBase(
      UpdateProductComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '50%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result?.success) {
        this.loadData();
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
}
