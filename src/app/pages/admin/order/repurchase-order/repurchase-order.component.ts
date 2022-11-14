import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ORDER_TYPE, SORT } from '@shared/constants/common.constant';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { IUser } from '@shared/models/user.model';
import { ToastService } from '@shared/services/helpers/toast.service';
import { UserService } from '@shared/services/user.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_ACTIONS, ROUTER_UTILS } from '@shared/utils/router.utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import {IOrder, PaymentMethod, StatusEnum} from "@shared/models/order.model";
import {IOrderSearchRequest} from "@shared/models/request/order-search-request.model";
import {ORDER_STATUS, paymentMethod} from "@shared/constants/order.constant";
import { OrderService } from '../../../../shared/services/order/order.service';
import { OrderSearchRequest } from '../../../../shared/models/request/order-search-request.model';
import { OrderType } from '../../../../shared/models/order.model';
import { NzMarks } from 'ng-zorro-antd/slider';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-repurchase-order',
  templateUrl: './repurchase-order.component.html',
  styleUrls: ['./repurchase-order.component.css']
})
export class RepurchaseOrderComponent implements OnInit {


  formSearchOrder:FormGroup = new FormGroup({});
  orderSearchRequest: OrderSearchRequest = {
  
  };
  pageIndex =  PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  types = ORDER_TYPE;
  orderStatus = ORDER_STATUS;
  payMethods = paymentMethod;
  status = StatusEnum;
  selectedOrderId = '';
  total = 0;
  minPrice = 0;
  maxPrice = 100000000;
  isFirstFetch = false;
  groupPopup = {
    title: '',
    content: '',
    okText: '',
  };
  orders: IOrder[] = [];
  users: IUser[] = [];
  marks: NzMarks = {
    0: '0đ',
    20000000: '20.000.000đ',
    40000000: '40.000.000đ',
    60000000: '60.000.000đ',
    80000000: '80.000.000đ',
    100000000: '100.000.000đ',
  };
  constructor(
    private translateService: TranslateService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService:OrderService
  ) {
    this.initForm();
    // this.menuService.searchAutoComplete({}).subscribe((menusResponse: any) => {
    //   this.menus = menusResponse.body?.data;
    // });
  }

  ngOnInit(): void {
    this.loadData(this.pageIndex,this.pageSize);
    this.loadCustomer();
  }

  initForm(): void {
    this.formSearchOrder = this.fb.group({
      purchaseType : [this.orderSearchRequest.purchaseType || null],
      payMethod: [this.orderSearchRequest.payMethod || null],
      rangePrice: [[this.minPrice,this.maxPrice]],
      startPrice: [this.orderSearchRequest.startPrice || this.minPrice],
      endPrice: [this.orderSearchRequest.endPrice || this.maxPrice],
      keyword: [this.orderSearchRequest.keyword || null],
      userId: [this.orderSearchRequest.userId || null],
    });
  }

  private loadData(pageIndex:number,pageSize:number,sortBy?:string) {   
      this.orderSearchRequest.startDate = moment(new Date().setDate(new Date().getDate() - 2)).format('yyyy/MM/DD');
    this.orderSearchRequest.pageIndex  =pageIndex;
    this.orderSearchRequest.status = StatusEnum.DA_GIAO;
    this.orderSearchRequest.pageSize  =pageSize;
    this.orderSearchRequest.sortBy  =sortBy;
    
    this.orderService
      .search(this.orderSearchRequest)
      .subscribe((response: any) => {
        this.orders = response?.body?.data;
        this.total = response.body.page.total;
      });
  }
  private loadCustomer(){
    this.userService.findCustomer().subscribe((res :any) => {
      this.users = res.body?.data;
    })
  }

  formatterPrice = (value: number): string =>
  CommonUtil.moneyFormat(value + '') + ' đ';
parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
onChangeRangePrice(): void {
  console.log(this.formSearchOrder.get('rangePrice')?.value);
  
  this.formSearchOrder
    .get('startPrice')
    ?.setValue(this.formSearchOrder.get('rangePrice')?.value[0]);
  this.formSearchOrder
    .get('endPrice')
    ?.setValue(this.formSearchOrder.get('rangePrice')?.value[1]);
}
  create(): void {
    this.router.navigate([ROUTER_UTILS.order.root, ROUTER_ACTIONS.create]);
  }

  openPurchasePopup(): void {
    // const form = CommonUtil.modalConfirm(
    //   this.translateService,
    //   'model.order.changeToPaid',
    //   'model.order.changeToPaidConfirm'
    // );
    //
    // const modal: NzModalRef = this.modalService.create(form);
    //
    // modal.afterClose.subscribe((response: { success: boolean }) => {
    //   if (response.success) {
    //     const orderIds: string[] = [];
    //     this.orders.forEach((order) => {
    //       if (order.id) {
    //         orderIds.push(order.id);
    //       }
    //     });
    //
    //     const changeStatusToPaidRequest: ChangeOrderStatusRequest = {
    //       purchaseOrderIds: orderIds,
    //     };
    //     this.orderService
    //       .changeStatusToPaid(changeStatusToPaidRequest)
    //       .subscribe((changeStatusResponse) => {
    //         this.toast.success('model.order.success.changeToPaid');
    //         this.loadData();
    //       });
    //   }
    // });
  }

  exchange(id: string): void {
    this.router.navigate([
      ROUTER_UTILS.order.root,
      id,
     'repurchaseCreate'
    ]);
  }

  delete(id: string): void {
    // const form = CommonUtil.modalConfirm(
    //   this.translateService,
    //   'model.order.deleteOrderTitle',
    //   'model.order.deleteOrderContent'
    // );
    //
    // const modal = this.modalService.create(form);
    //
    // modal.afterClose.subscribe((result: { success: boolean }) => {
    //   if (result.success) {
    //     this.orderService.delete(id).subscribe((response: any) => {
    //       this.toast.success('model.order.success.delete');
    //       this.loadData();
    //     });
    //   }
    // });
  }

  detail(id: string): void {
    this.router.navigate([
      ROUTER_UTILS.order.root,
      id,
      ROUTER_ACTIONS.detail,
    ]);
  }

  pipeType(orderTypeCode: string) {
    //return BookingCommonUtil.pipeOrderType(orderTypeCode);
  }

  pipeStatus(orderStatusCode: string) {
   // return BookingCommonUtil.pipeOrderStatus(orderStatusCode);
  }

  formatColor(status: string): any {
   // return BookingCommonUtil.formatStatusColor(status);
  }

  openAdvancedSearch(): void {
   // const base = CommonUtil.modalBase(SearchOrderComponent, {}, '40%');
  }

  resetSearch(): void {
    this.formSearchOrder.reset();
    
    this.orderSearchRequest = {
      pageIndex: PAGINATION.PAGE_DEFAULT,
      pageSize: PAGINATION.SIZE_DEFAULT,
    };
    this.search();
  }

  search(): void {
    console.log(this.formSearchOrder.value);
    
    this.orderSearchRequest.purchaseType = this.formSearchOrder.get('purchaseType')?.value;
    this.orderSearchRequest.status = this.formSearchOrder.get('status')?.value;
    this.orderSearchRequest.payMethod = this.formSearchOrder.get('payMethod')?.value;
    this.orderSearchRequest.userId = this.formSearchOrder.get('userId')?.value;
    this.orderSearchRequest.startPrice = this.formSearchOrder.get('startPrice')?.value;
    this.orderSearchRequest.endPrice = this.formSearchOrder.get('endPrice')?.value;
    const endCreatedAt = this.formSearchOrder.get('endDate')?.value;
    const startCreatedAt = this.formSearchOrder.get('startDate')?.value;
    if (startCreatedAt) {
      this.orderSearchRequest.startDate = moment(startCreatedAt).format('yyyy/MM/DD');
    } else {
      this.orderSearchRequest.startDate = '';
    }
    console.log(this.orderSearchRequest);
    
    this.loadData(this.pageIndex,this.pageSize);
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.orderSearchRequest.pageIndex = pageIndex;
    this.orderSearchRequest.pageSize = pageSize;

    this.loadData(pageIndex,pageSize);
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
    this.orderSearchRequest.sortBy = sortBy;
    this.loadData(pageIndex,pageSize,sortBy);
  }

  searchUsers(keyword: string): void {
    // const options = {
    //   keyword,
    // };
    // this.userService
    //   .searchUsersAutoComplete(options, false)
    //   .subscribe((res) => {
    //     this.users = res.body?.data as Array<IUser>;
    //   });
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.orderSearchRequest.pageIndex,
      this.orderSearchRequest.pageSize
    );
  }
  getColor(status:StatusEnum): string{
    if(status === StatusEnum.CHO_XAC_NHAN){
      return 'badge-warning'
    }else if(status === StatusEnum.DANG_GIAO){
      return 'badge-success'
    }else if(status === StatusEnum.DA_GIAO){
      return 'badge-info'
    }else if(status === StatusEnum.XAC_NHAN){
      return "badge-default"
    }else {
      return 'badge-danger';
    }
  }
  getStatus(status:StatusEnum): string{
    if(status === StatusEnum.CHO_XAC_NHAN){
      return 'Chờ xác nhận';
    }else if(status === StatusEnum.DANG_GIAO){
      return 'Đang giao'
    }else if(status === StatusEnum.DA_GIAO){
      return 'Đã giao'
    }else if(status === StatusEnum.XAC_NHAN){
      return "Đã xác nhận"
    }else {
      return 'Đã hủy';
    }
  }
  getPurchaseType(item:any):string{
    if(item === OrderType.DIRECT_TYPE){
      return "Mua trực tiếp";
    }else if(item === OrderType.ONLINE){
      return "Mua online"
    }
    return '';
  }
  getpayment(item:any):string{
    if(item === PaymentMethod.CARD){
      return 'Thanh Toán ATM'
    }else if(item === PaymentMethod.MONEY){
      return 'Thanh toán tiền mặt'
    }
    return '';
  }

  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
    this.formSearchOrder.get('startDate')?.setValue(rangeDate.fromDate);
    this.formSearchOrder.get('endDate')?.setValue(rangeDate.toDate);
  }
}
