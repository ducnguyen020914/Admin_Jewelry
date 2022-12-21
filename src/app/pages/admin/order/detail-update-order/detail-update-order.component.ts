import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_ACTIONS, ROUTER_UTILS } from '../../../../shared/utils/router.utils';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../../../../shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { EventService } from '../../../../shared/services/product/event.service';
import { OrderService } from '../../../../shared/services/order/order.service';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { LocalStorageService } from 'ngx-webstorage';
import { paymentMethod, ORDER_STATUS } from '../../../../shared/constants/order.constant';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { IEvent } from '../../../../shared/models/event.model';
import CommonUtil from '../../../../shared/utils/common-utils';
import {
  Order,
  OrderType,
  StatusEnum,
  IProductOrder,
} from '../../../../shared/models/order.model';

@Component({
  selector: 'app-detail-update-order',
  templateUrl: './detail-update-order.component.html',
  styleUrls: ['./detail-update-order.component.css'],
})
export class DetailUpdateOrderComponent implements OnInit {
  @Input() action = '';
  id = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  PAYMENT_METHOD = paymentMethod;
  ORDER_STATUS = ORDER_STATUS
  status = StatusEnum;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  form: FormGroup = new FormGroup({});
  order: Order = {};
  users: IUser[] = [];
  currentUser: IUser = {};
  events: IEvent[] = [];
  total = 0;
  discount = 0;
  selectedProducts: IProductOrder[] = [];
  extraTemplate: any;
  thanhtien = 0;
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toast: ToastService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private eventService: EventService,
    private orderService: OrderService,
    private modalService: NzModalService,
    private localStorage: LocalStorageService
  ) {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('id') || '';
    });

    this.route.data.subscribe((res) => {
      this.action = res.action;
    });
    this.loadCustomer();
    this.loadevent();
    this.initForm();
  }

  ngOnInit() {
    console.log(this.action);
    
    this.loadOrder();
  }
  loadOrder() {
    this.orderService.findOne(this.id).subscribe((res: any) => {
      this.order = res.body?.data;
      this.selectedProducts = this.order.orderDetailDTOList as IProductOrder[];
      console.log('Order', this.order);
      console.log('Selected', this.selectedProducts);
      this.selectedProducts.forEach((data) =>{
        this.total= this.total + (data.priceSale as number * (data.quantity ? data.quantity : 0))
      })
      this.form.get('userId')?.setValue(this.order.userId);
      this.form.get('paymentMethod')?.setValue(this.order.paymentMethod);
      this.form.get('eventId')?.setValue(this.order.eventId);
      this.form.get('address')?.setValue(this.order.address);
      this.form.get('status')?.setValue(this.order.status);
      this.form.get('staff')?.setValue(this.order.createBy);
      this.form.get('purchaseType')?.setValue(this.order.purchaseType);
      this.form.get('transportFee')?.setValue(this.order.transportFee);
      this.thanhtien = this.order.total ? this.order.total : 0;
      this.getStatus(this.form.get('status')?.value);
      this.getTotal(this.form.get('eventId')?.value);
      
    });
  }
  private initForm() {
    this.form = this.fb.group({
      userId: [null, [Validators.required]],
      customerMoney: [0, [Validators.required]],
      transportFee: [0],
      purchaseType: [OrderType.DIRECT_TYPE],
      status: [StatusEnum.DA_GIAO],
      eventId: [null],
      address: [{value:'Tại cửa hàng',disable:true}],
      date: [{ value: new Date(), disabled: true }],
      paymentMethod: [null, [Validators.required]],
      orderDetailList: this.fb.array([]),
      total: [{ value: '', disabled: true }, Validators.required],
      staff: [{ value: '', disabled: true }, Validators.required],
    });
    // this.form.get('date')?.setValue(new Date());
    this.form.get('total')?.setValue(0);
  }
  getStatus(status:StatusEnum){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.HOA_DON_CHO)
  if(status === StatusEnum.CHO_XAC_NHAN){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.DANG_GIAO && item.value !== StatusEnum.DA_GIAO);
  }else if(status === StatusEnum.DANG_GIAO){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.CHO_XAC_NHAN && item.value !== StatusEnum.XAC_NHAN);
  }else if(status  === StatusEnum.XAC_NHAN){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.CHO_XAC_NHAN && item.value !== StatusEnum.DA_GIAO);
  }
  }
  private loadCustomer() {
    this.userService.findCustomer().subscribe((res: any) => {
      this.users = res.body?.data;
    });
  }
  loadevent() {
    this.eventService.getAll().subscribe((res: any) => {
      this.events = res.body?.data;
      console.log(this.events);
      
    });
  }
  showCustomer() {
    this.users
      .filter((data: IUser) => data.userId === this.form.get('userId')?.value)
      .forEach((data) => {
        this.currentUser = data;
      });
  }
  getTotal(eventId: any) {
    const selectEvent = this.events.filter(
      (evn: IEvent) => evn.eventId === eventId
    );
    this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
  }
  getImage(imageUrl: string): string {
    if (imageUrl) {
      return imageUrl;
    }
    return 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png';
  }
  onCancel(){
    this.router.navigate([
      ROUTER_UTILS.order.root,
      ROUTER_UTILS.order.orderList
    ])
  }
  onSubmit(){
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.order.updateOrderTitle',
      'model.order.updateOrderContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        const order = {
          status:this.form.value.status
        }   
        console.log(this.id);
        
        this.orderService.updateOrder(this.id+'',order).subscribe((res) => {
          this.toast.success(`Cập nhật hóa đơn mã  thành công`);
           this.onCancel()
        });
      }
    });
  };
}
