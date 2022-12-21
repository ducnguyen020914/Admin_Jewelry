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
import { NzMarks } from 'ng-zorro-antd/slider';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
import { IEvent } from '@shared/models/event.model';
import { EventService } from '@shared/services/product/event.service';
import { ISizeSearchRequest } from '../../../../shared/models/request/event-search-request.model';
import { SizeService } from '../../../../shared/services/product/size.service';
import { ISize } from '../../../../shared/models/size.model';

@Component({
  selector: 'app-size-list',
  templateUrl: './size-list.component.html',
  styleUrls: ['./size-list.component.css']
})
export class SizeListComponent implements OnInit {
  form:FormGroup = new FormGroup({});
  sizeSearchRequest: ISizeSearchRequest = {
  
  };
  pageIndex =  PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  types = ORDER_TYPE;
  orderStatus = ORDER_STATUS;
  payMethods = paymentMethod;
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
  isVisible=false;
  sizes: ISize[] = [];
  users: IUser[] = [];
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(
    private translateService: TranslateService,
    private toast: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private userService: UserService,
    private fb: FormBuilder,
    private sizeService:SizeService
  ) {
    this.initForm();
    // this.menuService.searchAutoComplete({}).subscribe((menusResponse: any) => {
    //   this.menus = menusResponse.body?.data;
    // });
  }
  changStatus(event:any){}
  ngOnInit(): void {
    this.loadData(this.pageIndex,this.pageSize);
  }

  initForm(): void {
    this.form = this.fb.group({
       keyword: [this.sizeSearchRequest.keyword || null],
    });
  }

  private loadData(pageIndex:number,pageSize:number,sortBy?:string) {
    this.sizeSearchRequest.pageIndex = pageIndex;
    this.sizeSearchRequest.pageSize = pageSize;
    this.sizeSearchRequest.sortBy = sortBy;
    console.log(this.sizeSearchRequest);
    
    this.sizeService
      .search(this.sizeSearchRequest)
      .subscribe((response: any) => {
        this.sizes = response?.body?.data.data;
        this.total = response.body.data.page.total;
        console.log(response);
      });
  }
  formatterPrice = (value: number): string =>
  CommonUtil.moneyFormat(value + '') + ' đ';
parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
 create(): void {
//   const base = CommonUtil.modalBase(
//     CreateUpdateApoimentComponent,
//     {
//       action: ROUTER_ACTIONS.create,
//     },
//     '50%'
//   );
//   const modal: NzModalRef = this.modalService.create(base);
//   modal.afterClose.subscribe((result) => {
//     if (result && result?.success) {
//       this.loadData(this.pageIndex, this.pageSize);
//     }
//   });
 }
// update(calendar: Apoiment): void {
//   const base = CommonUtil.modalBase(
//     CreateUpdateApoimentComponent,
//     {
//       isUpdate: true,
//       calendar,
//     },
//     '50%'
//   );
//   const modal: NzModalRef = this.modalService.create(base);
//   modal.afterClose.subscribe((result) => {
//     if (result && result?.success) {
//       this.loadData(this.pageIndex, this.pageSize);
//     }
//   });
// }

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
    this.form.reset();
    
    this.sizeSearchRequest = {
      pageIndex: PAGINATION.PAGE_DEFAULT,
      pageSize: PAGINATION.SIZE_DEFAULT,
    };
    this.search();
  }

  search(): void {
    console.log(this.form.value);
    
    this.sizeSearchRequest.keyword = this.form.get('keyword')?.value;
    const endCreatedAt = this.form.get('endDate')?.value;
    const startCreatedAt = this.form.get('startDate')?.value;

    console.log(this.sizeSearchRequest);
    
    this.loadData(this.pageIndex,this.pageSize);
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.sizeSearchRequest.pageIndex = pageIndex;
    this.sizeSearchRequest.pageSize = pageSize;

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
    this.sizeSearchRequest.sortBy = sortBy;
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
      this.sizeSearchRequest.pageIndex,
      this.sizeSearchRequest.pageSize
    );
  }
  // getColor(status:CalendarStatus): string{
  //   if(status === CalendarStatus.WAIT_CONFIRM){
  //     return 'badge-warning'
  //   }else if(status === CalendarStatus.ACTIVE){
  //     return 'badge-success'
  //   }else if(status === CalendarStatus.DONE){
  //     return 'badge-info'
  //   }else if(status === CalendarStatus.CLOSE){
  //     return 'badge-danger';
  //   }else {
  //     return 'badge-danger';
  //   }
  // }
  // getStatus(status:CalendarStatus): string{
  //   if(status ===  CalendarStatus.WAIT_CONFIRM){
  //     return 'Chờ xác nhận';
  //   }else if(status === CalendarStatus.ACTIVE){
  //     return 'Xác nhận'
  //   }else if(status === CalendarStatus.DONE){
  //     return 'Đã mua sản phẩm'
  //   }else if(status === CalendarStatus.CLOSE){
  //     return "Đã hủy"
  //   }else {
  //     return 'Đã hủy';
  //   }
  // }
  // getPurchaseType(item:any):string{
  //   if(item === OrderType.DIRECT_TYPE){
  //     return "Mua trực tiếp";
  //   }else if(item === OrderType.ONLINE){
  //     return "Mua online"
  //   }
  //   return '';
  // }
  getpayment(item:any):string{
    if(item === PaymentMethod.CARD){
      return 'Thanh Toán ATM'
    }else if(item === PaymentMethod.MONEY){
      return 'Thanh toán tiền mặt'
    }
    return '';
  }

  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
    this.form.get('startDate')?.setValue(rangeDate.fromDate);
    this.form.get('endDate')?.setValue(rangeDate.toDate);
  }

}
