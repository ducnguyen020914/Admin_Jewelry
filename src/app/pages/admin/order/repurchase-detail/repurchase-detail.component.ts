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
  selector: 'app-repurchase-detail',
  templateUrl: './repurchase-detail.component.html',
  styleUrls: ['./repurchase-detail.component.css']
})
export class RepurchaseDetailComponent implements OnInit {
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
  isCreateBefore = true;
  totalCreateBrefore = 0;
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
      this.selectedProducts.forEach((data) => {
        this.totalCreateBrefore+=((data.pricePurchase ? data.pricePurchase : 0) * (data.quantity ? data.quantity  : 0))
      })
      const selectEvent = this.events.filter(
        (evn: IEvent) => evn.eventId === this.order.eventId
      );
      this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
      if((this.totalCreateBrefore - (this.order.cost ? this.order.cost : 0)) === this.order.total ){
        this.total = this.totalCreateBrefore
        this.isCreateBefore = false;
      }else{
        this.selectedProducts.forEach((data) => {
          this.total+=((data.priceSale ? data.priceSale : 0)* (data.quantity ? data.quantity  : 0))
        })
      }
      console.log(this.isCreateBefore);
      
      
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
      
    });
  }

  get30persent(){
    let total = 0;
    this.selectedProducts.forEach((product) => 
    {
      const quantity = product.quantity as number;
      const salary = product.salary as number;
    total =total + (salary * 0.3  * quantity  );
  })
    return Math.round(total);
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
  if(status === StatusEnum.DANG_GIAO){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.CHO_XAC_NHAN && item.value !== StatusEnum.XAC_NHAN);
  }else if(status  === StatusEnum.XAC_NHAN){
    this.ORDER_STATUS = this.ORDER_STATUS.filter((item,index) => item.value !== StatusEnum.CHO_XAC_NHAN);
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
