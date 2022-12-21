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
import { ExchangeProduct, ExchangeDetail } from '../../../../shared/models/order.model';
import { ExchangeEnum } from '../../../../shared/models/exchange.model';
import { ExchangeService } from '../../../../shared/services/order/exchange.service';
import {
  Order,
  OrderType,
  StatusEnum,
  IProductOrder,
} from '../../../../shared/models/order.model';
@Component({
  selector: 'app-exchange-order',
  templateUrl: './exchange-order.component.html',
  styleUrls: ['./exchange-order.component.css']
})
export class ExchangeOrderComponent implements OnInit {

  @Input() action = '';
  id = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  PAYMENT_METHOD = [
    {value: 'MONEY', label: 'model.order.paymentMethod.money'},
    {value: 'CARD', label: 'model.order.paymentMethod.card'},
    
    ];
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
  productExchange : ExchangeProduct[] = [];
  note = '';
  reason = '';
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
    private localStorage: LocalStorageService,
    private exchangeService:ExchangeService
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
    this.loadOrder();

  }
  getPayMethod(): string{
    let payment = '';
    this.PAYMENT_METHOD.filter((pay) => pay.value = this.order.paymentMethod +'').forEach((pay) => {
      payment = this.translateService.instant(pay.label);
    })
    return payment;
  }
  getEvent(): string{
    let event = '';
    this.events.filter((e) => e.eventId === this.order.eventId).forEach((e) => event = e.name + ' - Giảm ' + e.discount +'%' )
    return event;
  }
  loadOrder() {
    this.orderService.findOne(this.id).subscribe((res: any) => {
      this.order = res.body?.data;
      this.selectedProducts = this.order.orderDetailDTOList as IProductOrder[];
      this.productExchange = this.selectedProducts.map((product) => new ExchangeProduct(product,1,false));
     console.log(this.order);
     
      this.form.get('userId')?.setValue(this.order.userId);
      this.form.get('paymentMethod')?.setValue(this.order.paymentMethod);
      this.form.get('eventId')?.setValue(this.order.eventId);
      this.form.get('address')?.setValue(this.order.address);
      this.form.get('status')?.setValue(this.order.status);
      this.form.get('createdAt')?.setValue(this.order.createAt);
      this.form.get('purchaseType')?.setValue(this.order.purchaseType);
      this.form.get('transportFee')?.setValue(this.order.transportFee);
      this.thanhtien = this.order.total ? this.order.total : 0;
      this.getTotal(this.form.get('eventId')?.value);
      this.users.filter((u) => u.userId === this.order.userId).forEach((user) => this.currentUser = user)
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
  getStatus():string{
    let status = '';
    this.ORDER_STATUS.filter((stas) => stas.value === this.order.status).forEach((item) => {
      status = this.translateService.instant(item.label);
    })
    return status;
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
      ROUTER_UTILS.order.exchange
    ])
  }
  onSubmit(){
   const products =  this.productExchange.filter((item) => item.selected).map((item) => item.productOrder?.id);
   
  if(products.length === 0){
    this.toast.error("Không có sản phẩm nào được chọn");
    return;
  }
  let check = false;
  this.productExchange.filter((item) => item.selected).forEach((item) => {
    if(!item.quantityExchange){
      this.toast.error(`Sản phẩm ${item.productOrder?.nameProduct} chưa nhập số lượng đổi`);
      check = true;
      return;
    }
  })
  if(check){
    return;
  }
  if(this.reason === null || this.reason.trim() === ''){
    this.toast.error("Hãy nhập lý do đổi hàng");
    return;
  }
 
   const exchanges: {                                                                                        
      orderId?: string ;
      createBy?:string;
      products:ExchangeDetail[]; 
      status: ExchangeEnum; reason: string;
      note: string; } = {
      orderId: this.order.id,
      products:  this.productExchange.filter((item) => item.selected).map((item) => new ExchangeDetail(item.productOrder?.productId+'',item.productOrder?.sizeId,item.quantityExchange)),
      status: ExchangeEnum.THANH_CONG,
      reason: this.reason,
      note: this.note,
      createBy:this.localStorage.retrieve('username') as string
      };
      const createForm = CommonUtil.modalConfirm(
        this.translateService,
        'model.exchange.updateExchangeTitle',
        'model.exchange.updateExchangeContent'
      );
      const modal: NzModalRef = this.modalService.create(createForm);
      modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
        if (result?.success) {
          const order = {
            status:this.form.value.status
          }   
            this.exchangeService.createExchange(exchanges).subscribe((item) => {
              this.onCancel();
           })
         }});    
  
        
  }

}
