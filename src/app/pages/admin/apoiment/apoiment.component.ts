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
import { OrderSearchRequest } from '../../../shared/models/request/order-search-request.model';
import { OrderService } from '../../../shared/services/order/order.service';
import { OrderType } from '../../../shared/models/order.model';
import { CreateUpdateApoimentComponent } from './create-update-apoiment/create-update-apoiment.component';
import { Apoiment, IApoiment, CalendarStatus } from '../../../shared/models/apoiment.model';
import { CalendarService } from '../../../shared/services/calendar.service';
import { CalendarSearchRequest } from '../../../shared/models/request/calendar-search-request.model';
import { CLOSED } from '../../../shared/constants/system-report.constant';
import { Product } from '../../../shared/models/productReal.model';
import { ProductService } from '../../../shared/services/product/product.service';

@Component({
  selector: 'app-apoiment',
  templateUrl: './apoiment.component.html',
  styleUrls: ['./apoiment.component.css']
})
export class ApoimentComponent implements OnInit {

  form:FormGroup = new FormGroup({});
  calendarSearchRequest: CalendarSearchRequest = {
  
  };
  pageIndex =  PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  types = ORDER_TYPE;
  orderStatus = ORDER_STATUS;
  payMethods = paymentMethod;
  status = CalendarStatus;
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
  calendars: IApoiment[] = [];
  users: IUser[] = [];
  products:Product[] = [];
  marks: NzMarks = {
    0: '0đ',
    20000000: '20.000.000đ',
    40000000: '40.000.000đ',
    60000000: '60.000.000đ',
    80000000: '80.000.000đ',
    100000000: '100.000.000đ',
  };
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
    private calendarService:CalendarService,
    private productService:ProductService
  ) {
    this.initForm();
    // this.menuService.searchAutoComplete({}).subscribe((menusResponse: any) => {
    //   this.menus = menusResponse.body?.data;
    // });
  }
  changStatus(event:any){}
  active(apoiment: Apoiment): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.apoiment.active',
      'model.apoiment.activeContent'
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        const data:Apoiment = {
          status:CalendarStatus.ACTIVE
        }
        this.calendarService
          .changeStatus(data,apoiment?.id+'')
          .subscribe((response: any) => {
            this.toast.success('model.apoiment.success');
            this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
          });
      }
    });
  }
  success(apoiment: Apoiment): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.apoiment.success',
      'model.apoiment.successContent'
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        const data:Apoiment = {
          status:CalendarStatus.DONE
        }
        this.calendarService
          .changeStatus(data,apoiment?.id+'')
          .subscribe((response: any) => {
            this.toast.success('model.apoiment.success');
            this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
          });
      }
    });
  }
  cancel(apoiment: Apoiment): void {
    const deleteForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.apoiment.cancel',
      'model.apoiment.cancelContent'
    );
    const modal: NzModalRef = this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        const data:Apoiment = {
          status:CalendarStatus.CLOSE
        }
        this.calendarService
          .changeStatus(data,apoiment?.id+'')
          .subscribe((response: any) => {
            this.toast.success('model.apoiment.success');
            this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
          });
      }
    });
  }
  ngOnInit(): void {
    this.loadData(this.pageIndex,this.pageSize);
    this.loadProduct();
    this.loadCustomer();
  }

  initForm(): void {
    this.form = this.fb.group({
       startDate: [this.calendarSearchRequest.startDate || null],
       endDate: [this.calendarSearchRequest.endDate || null],
       keyword: [this.calendarSearchRequest.keyword || null],
       productId: [this.calendarSearchRequest.productId || null],
    });
  }

  private loadData(pageIndex:number,pageSize:number,sortBy?:string) {
    this.calendarSearchRequest.pageIndex  =pageIndex;
    this.calendarSearchRequest.pageSize  =pageSize;
    this.calendarSearchRequest.sortBy  =sortBy;
    
    this.calendarService
      .search(this.calendarSearchRequest)
      .subscribe((response: any) => {
        this.calendars = response?.body?.data;
        this.total = response.body.page.total;
        console.log(response);
      });
  }
  private loadCustomer(){
    this.userService.findCustomer().subscribe((res :any) => {
      this.users = res.body?.data;
    })
  }
  private loadProduct(){
    this.productService.autoComlete().subscribe((res:any)=>{
      console.log(res);
      this.products = res.body.data;
    })
  }

  formatterPrice = (value: number): string =>
  CommonUtil.moneyFormat(value + '') + ' đ';
parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
create(): void {
  const base = CommonUtil.modalBase(
    CreateUpdateApoimentComponent,
    {
      action: ROUTER_ACTIONS.create,
    },
    '50%'
  );
  const modal: NzModalRef = this.modalService.create(base);
  modal.afterClose.subscribe((result) => {
    if (result && result?.success) {
      this.loadData(this.pageIndex, this.pageSize);
    }
  });
}
update(calendar: Apoiment): void {
  const base = CommonUtil.modalBase(
    CreateUpdateApoimentComponent,
    {
      isUpdate: true,
      calendar,
    },
    '50%'
  );
  const modal: NzModalRef = this.modalService.create(base);
  modal.afterClose.subscribe((result) => {
    if (result && result?.success) {
      this.loadData(this.pageIndex, this.pageSize);
    }
  });
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
    
    this.calendarSearchRequest = {
      pageIndex: PAGINATION.PAGE_DEFAULT,
      pageSize: PAGINATION.SIZE_DEFAULT,
    };
    this.search();
  }

  search(): void {
    console.log(this.form.value);
    
    this.calendarSearchRequest.keyword = this.form.get('keyword')?.value;
    this.calendarSearchRequest.productId = this.form.get('productId')?.value;
    const endCreatedAt = this.form.get('endDate')?.value;
    const startCreatedAt = this.form.get('startDate')?.value;
    if (startCreatedAt) {
      this.calendarSearchRequest.startDate = moment(startCreatedAt).format('yyyy/MM/DD');
    } else {
      this.calendarSearchRequest.startDate = '';
    }
    if (endCreatedAt) {
      this.calendarSearchRequest.endDate = moment(endCreatedAt).format('yyyy/MM/DD');
    } else {
      this.calendarSearchRequest.endDate = '';
    }
    console.log(this.calendarSearchRequest);
    
    this.loadData(this.pageIndex,this.pageSize);
  }

  onQuerySearch(params: { pageIndex: number; pageSize: number }): void {
    const { pageIndex, pageSize } = params;
    this.calendarSearchRequest.pageIndex = pageIndex;
    this.calendarSearchRequest.pageSize = pageSize;

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
    this.calendarSearchRequest.sortBy = sortBy;
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
      this.calendarSearchRequest.pageIndex,
      this.calendarSearchRequest.pageSize
    );
  }
  getColor(status:CalendarStatus): string{
    if(status === CalendarStatus.WAIT_CONFIRM){
      return 'badge-warning'
    }else if(status === CalendarStatus.ACTIVE){
      return 'badge-success'
    }else if(status === CalendarStatus.DONE){
      return 'badge-info'
    }else if(status === CalendarStatus.CLOSE){
      return 'badge-danger';
    }else {
      return 'badge-danger';
    }
  }
  getStatus(status:CalendarStatus): string{
    if(status ===  CalendarStatus.WAIT_CONFIRM){
      return 'Chờ xác nhận';
    }else if(status === CalendarStatus.ACTIVE){
      return 'Xác nhận'
    }else if(status === CalendarStatus.DONE){
      return 'Đã mua sản phẩm'
    }else if(status === CalendarStatus.CLOSE){
      return "Đã hủy"
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
    this.form.get('startDate')?.setValue(rangeDate.fromDate);
    this.form.get('endDate')?.setValue(rangeDate.toDate);
  }

}
