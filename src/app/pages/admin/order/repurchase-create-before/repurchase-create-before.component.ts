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
import { ExchangeProduct, ExchangeDetail, PaymentMethod } from '../../../../shared/models/order.model';
import { ExchangeEnum } from '../../../../shared/models/exchange.model';
import { ExchangeService } from '../../../../shared/services/order/exchange.service';
import { saveAs } from 'file-saver';
import { RepurchaseService } from '../../../../shared/services/order/repurchase.service';
import {
  Order,
  OrderType,
  StatusEnum,
  IProductOrder,
} from '../../../../shared/models/order.model';
@Component({
  selector: 'app-repurchase-create-before',
  templateUrl: './repurchase-create-before.component.html',
  styleUrls: ['./repurchase-create-before.component.css']
})
export class RepurchaseCreateBeforeComponent implements OnInit {


  @Input() action = '';
  id = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  PAYMENT_METHOD = paymentMethod;
  PAYMENT_METHOD2  = [
    {value: 'MONEY', label: 'model.order.paymentMethod.money'},
    {value: 'CARD', label: 'model.order.paymentMethod.card'},
    {value: 'CARD_MONEY', label: 'model.order.paymentMethod.cardmoney'},
    ];
  ORDER_STATUS = ORDER_STATUS
  status = StatusEnum;
  payment!:PaymentMethod;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  form: FormGroup = new FormGroup({});
  order: Order = {};
  users: IUser[] = [];
  currentUser: IUser = {};
  events: IEvent[] = [];
  total = 0;
  discount = 0;
  cost=0;
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
    private repurchaseService:RepurchaseService
  ) {
    this.route.paramMap.subscribe((res) => {
      this.id = res.get('id') || '';
    });

    this.route.data.subscribe((res) => {
      this.action = res.action;
      this.loadCustomer();
    });
    this.loadCustomer();
    this.loadevent();
   
  }

  ngOnInit() {
    this.loadOrder();
    this.loadCustomer();
    this.initForm();
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
      this.loadInfor()
      this.selectedProducts = this.order.orderDetailDTOList as IProductOrder[];
      this.productExchange = this.selectedProducts.map((product) => new ExchangeProduct(product,1,false));
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
    this.loadCustomer();
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
  formatterPrice = (value: number): string =>
  CommonUtil.moneyFormat(value + '') + ' đ';
parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
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
  private loadInfor(){
    this.userService.find(this.order.userId+'').subscribe(((res:any) => {
      this.currentUser = res.body.data
    }))
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
      'repurchase'
    ])
  }
  getCountProduct(){
    const productSelected = this.productExchange.filter((product) => product.selected === true);
   return productSelected.length;
  }
  tongTien(){
    const productSelected = this.productExchange.filter((product) => product.selected === true);
    let total = 0;
    productSelected.forEach((product) => 
    {
      const price = product.productOrder?.priceProduct as number;
      const quantity = product.quantityExchange as number;
      const salary = product.productOrder?.salary as number;
     total = total + (price * quantity  +  salary* quantity) ;
  })
    return total;
  }
  get30persent(){
    const productSelected = this.productExchange.filter((product) => product.selected === true);
    let total = 0;
    productSelected.forEach((product) => 
    {
      const quantity = product.quantityExchange as number;
      const salary = product.productOrder?.salary as number;
    total =total + (salary * 0.3  * quantity  );
  })
    return Math.round(total);
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
  if(!this.payment){
    this.toast.error("Hãy chọn hình thức thanh toán");
    return;
  }

      const createForm = CommonUtil.modalConfirm(
        this.translateService,
        'model.repurchase.createRepurchaseTitle',
        'model.repurchase.createRepurchaseContent'
      );
      const modal: NzModalRef = this.modalService.create(createForm);
      modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
        if (result?.success) {
          const order = {
             userId:this.order.userId,
             cost:this.cost,
             paymentMethod:this.payment,
             total: this.tongTien() - this.get30persent() - this.cost,
             purchaseType:OrderType.DIRECT_TYPE,
             transportFee: 0,
             status:StatusEnum.DA_GIAO,
             address:"Tại cửa hàng",
             customerMoney:0,
             orderDetailList: this.productExchange.filter((product) => product.selected ).map((product) => {
              const price = product.productOrder?.price as number;
              const productDetail: IProductOrder = {
                productId: product.productOrder?.productId,
                quantity: product.quantityExchange,
                price: price,
                sizeId: product.productOrder?.sizeId,
                total: ((product.quantityExchange as number) * price) as number,
              };
              return productDetail;
            }),
          }   
          console.log(order);
          
            this.repurchaseService.createOrder(order).subscribe((item) => {
              this.toast.success("Tạo hóa đơn mua lại thành công");
              this.onCancel();
           })
         }});    
  
        
  }

}
