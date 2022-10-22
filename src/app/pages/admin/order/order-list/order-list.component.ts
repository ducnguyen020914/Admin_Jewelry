import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ORDER_TYPE } from '@shared/constants/common.constant';
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
import {ORDER_STATUS} from "@shared/constants/order.constant";
import { OrderService } from '../../../../shared/services/order/order.service';
import { OrderSearchRequest } from '../../../../shared/models/request/order-search-request.model';
import { OrderType } from '../../../../shared/models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  formSearchOrder:FormGroup = new FormGroup({});
  orderSearchRequest: OrderSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  types = ORDER_TYPE;
  orderStatus = ORDER_STATUS;
  selectedOrderId = '';
  total = 0;
  minPrice = 0;
  maxPrice = 100000000;
  groupPopup = {
    title: '',
    content: '',
    okText: '',
  };
  orders: IOrder[] = [];
  users: IUser[] = [];

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
    this.loadData();
  }

  initForm(): void {
    this.formSearchOrder = this.fb.group({
      purchaseType : [this.orderSearchRequest.purchaseType || null],
      status: [this.orderSearchRequest.status || null],
      payMethod: [this.orderSearchRequest.payMethod || null],
      startDate: [this.orderSearchRequest.startDate || null],
      endDate: [this.orderSearchRequest.endDate || null],
      startPrice: [this.orderSearchRequest.startPrice || this.maxPrice],
      endPrice: [this.orderSearchRequest.startPrice || this.minPrice],
      keyword: [this.orderSearchRequest.keyword || null],
      userId: [this.orderSearchRequest.userId || null],
    });
  }

  private loadData() {
    this.orderService
      .search(this.orderSearchRequest)
      .subscribe((response: any) => {
        this.orders = response?.body?.data;
        this.total = response.body.page.total;
        console.log(this.orders);
        console.log(response);
        
      });
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

  update(id: string): void {
    // this.router.navigate([
    //   ROUTER_UTILS.booking.root,
    //   ROUTER_UTILS.booking.order,
    //   id,
    //   ROUTER_ACTIONS.update,
    // ]);
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
    // this.router.navigate([
    //   ROUTER_UTILS.booking.root,
    //   ROUTER_UTILS.booking.order,
    //   id,
    //   ROUTER_ACTIONS.detail,
    // ]);
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
    // this.formSearchOrder.reset();
    //
    // this.orderSearchRequest = {
    //   pageIndex: PAGINATION.PAGE_DEFAULT,
    //   pageSize: PAGINATION.SIZE_DEFAULT,
    // };
    // this.search();
  }

  search(): void {
    // this.orderSearchRequest.type = this.formSearchOrder.get('type')?.value;
    // this.orderSearchRequest.status = this.formSearchOrder.get('status')?.value;
    // this.orderSearchRequest.menuId = this.formSearchOrder.get('menuId')?.value;
    // this.orderSearchRequest.startCreatedAt =
    //   this.formSearchOrder.get('startCreatedAt')?.value;
    // this.orderSearchRequest.endCreatedAt =
    //   this.formSearchOrder.get('enCreatedAt')?.value;
    // this.orderSearchRequest.userId = this.formSearchOrder.get('userId')?.value;
    // this.loadData();
  }

  onQuerySearch(params: NzTableQueryParams): void {
    // const { pageIndex, pageSize } = params;
    // const sortBy = CommonUtil.getSortStringFromParamObject(params);
    //
    // this.orderSearchRequest = {
    //   ...this.orderSearchRequest,
    //   pageIndex,
    //   pageSize,
    //   sortBy,
    // };
    //
    // this.loadData();
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
      return 'badge-infor'
    }else if(status === StatusEnum.DA_GIAO){
      return 'badge-success'
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
    // this.orderSearchRequest.startCreatedAt = rangeDate.fromDate?.valueOf();
    // this.orderSearchRequest.endCreatedAt = rangeDate.toDate?.valueOf();
    // this.formSearchOrder.get('startCreatedAt')?.setValue(rangeDate.fromDate);
    // this.formSearchOrder.get('endCreatedAt')?.setValue(rangeDate.toDate);
  }
}
