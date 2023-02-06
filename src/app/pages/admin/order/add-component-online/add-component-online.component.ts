import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '@shared/services/helpers/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { IOrderSearchRequest } from '@shared/models/request/order-search-request.model';
import { PAGINATION } from '@shared/constants/pagination.constants';
import {
  TransferChange,
  TransferItem,
  TransferSelectChange,
} from 'ng-zorro-antd/transfer';
import { IProduct } from '@shared/models/productReal.model';
import { NZ_TRANSFER_CONST } from '@shared/constants/common.constant';
import {
  IOrder,
  Order,
  DEFAULT_QUANTITY,
  OrderType,
  StatusEnum,
  IProductOrder,
  OrderItem,
} from '../../../../shared/models/order.model';
import { ProductItem, PurchaseForm } from '@shared/models/order.model';
import { UserService } from '../../../../shared/services/user.service';
import { IUser } from '../../../../shared/models/user.model';
import { paymentMethod } from '@shared/constants/order.constant';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ProductSearchRequest } from '../../../../shared/models/request/product-search-request.model';
import { Product } from '../../../../shared/models/productReal.model';
import { EventService } from '@shared/services/product/event.service';
import { IEvent } from '@shared/models/event.model';
import { OrderService } from '../../../../shared/services/order/order.service';
import CommonUtil from '../../../../shared/utils/common-utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LocalStorageService } from 'ngx-webstorage';
import { ROUTER_UTILS } from '../../../../shared/utils/router.utils';
import { EmployeeUpdateComponent } from '@pages/admin/user/employee/employee-update/employee-update.component';
import { AddCustomerComponent } from '../../user/employee/AddCustomer/AddCustomer.component';
import { CountryService } from '../../../../shared/services/country.service';
import { CartService } from '@shared/services/cart.service';
import { Ship } from '../../../../shared/models/ship.model';

@Component({
  selector: 'app-add-component-online',
  templateUrl: './add-component-online.component.html',
  styleUrls: ['./add-component-online.component.css']
})
export class AddComponentOnlineComponent implements OnInit {

  @Input() action = '';
  tabs = ['Hoá đơn 1', 'Hoá đơn 2'];
  selectedIndex = 0;
  list: IProductOrder[] = [];
  disabled = false;
  menuId = '';
  staff = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  ROUTER_UTILS = ROUTER_UTILS;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  PAYMENT_METHOD = [
    {value: 'MONEY', label: 'model.order.paymentMethod.money'},
    {value: 'CARD', label: 'model.order.paymentMethod.card'},
    {value: 'CARD_MONEY', label: 'model.order.paymentMethod.cardmoney'},
    ];
  startValue: Date | null = null;
  orderId = '';
  order: IOrder = new Order();
  productSearch: ProductSearchRequest = {};
  productsFilteredByMenu: IProduct[] = [];
  selectedProducts: IProductOrder[] = [];
  currentDate = new Date();
  users: IUser[] = [];
  currentUser: IUser = {};
  userSearchRequest: {} = {};
  productOrders: IProductOrder[] = [];
  productOrderFilter: IProductOrder[] = [];
  productOrder: IProductOrder = {};
  events: IEvent[] = [];
  province:any[] = [];
  distrist:any[] = [];
  ward:any[] = [];
  addresses:string[] = [];
  shipMoney = 0;
  address1:{province?:number,distrist?:number,ward?:string} = {
  };
  total = 0;
  thanhtien = 0;
  discount = 0;
  isVisible = false;
  value: string = '';
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  ship: Ship ={};
  NZ_TRANSFER_CONST = NZ_TRANSFER_CONST;

  DEFAULT_QUANTITY = DEFAULT_QUANTITY;
  maxOrder = 5;

  //menu: IMenuResponse = new MenuResponse();
  orders: IOrder[] = [];
  orderSearchRequest: IOrderSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  purchaseForm = PurchaseForm;
extraTemplate: any;
  //ERROR_CODE_I18N_MAP = ERROR_CODE_I18N_MAP;
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
    private countryService:CountryService,
    private cartService :CartService,
  ) {}

  ngOnInit(): void {
    this.countryService.province().subscribe((res:any)=>{
      this.province = res.data;
    })
    this.initForm();
    this.loadCustomer();
    this.loadProductOrder();
    this.loadevent();
   
  }
  loadProductOrder() {
    this.productService.productOrders().subscribe((res: any) => {
      this.productOrders = res.body?.data;
      this.productOrders = this.productOrders.filter((res) => res.quantity as number > 0)
      console.log(this.productOrders);
      
      // this.selectedProducts = JSON.parse(this.localStorage.retrieve('selectedProducts'));
      if(this.selectedProducts=== null){
        this.selectedProducts = [];
      }
      this.changePrice();
      this.selectedProducts.map((item) => item.id).forEach(item => {
        this.productOrders =   this.productOrders.filter((item1) => item1.id !== item)
      })
      this.productOrderFilter = this.productOrders;
    });
  }

  private initForm() {
    this.form = this.fb.group({
      userId: [null, [Validators.required]],
      customerMoney: [0, [Validators.required]],
      transportFee: [0],
      purchaseType: [OrderType.DIRECT_TYPE],
      status: [StatusEnum.CHO_XAC_NHAN],
      eventId: [null],
      province: [
        null,
        [
          Validators.required,
        ],
      ],
      district: [
        null,
        [
          Validators.required,
        ],
      ],
      ward: [
        null,
        [
          Validators.required,
        ],
      ],
      addressDetail: [
        '',
        [
          Validators.required,
        ],
      ],
      date: [{ value: new Date(), disabled: true }],
      paymentMethod: [null, [Validators.required]],
      note:[null],
      phoneNumber:[null],
      orderDetailList: this.fb.array([]),
      total: [{ value: '', disabled: true }, Validators.required],
      staff: [{ value: this.localStorage.retrieve('username'), disabled: true }, Validators.required],
    });
    // this.form.get('date')?.setValue(new Date());
    this.form.get('total')?.setValue(0);
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
      if(this.currentUser){
       
        this.addresses = this.currentUser.address?.split(", ") as string[]; 
        let addressDetail = '';
       if( this.addresses ){
        this.addresses .forEach((data,index) =>{
          if(index <  this.addresses .length-3 ) {
             addressDetail = addressDetail + data;
          }
        })
       }
       this.form.get('province')?.setValue(this.getCodeProvince(this.addresses  ?   this.addresses [ this.addresses .length - 1] : ''))
       this.form.get('addressDetail')?.setValue(this.addresses[0]);
       if(this.selectedProducts.length > 0){
        this.chargeShipping(this.total)
       }
      }
  }
  onCancel(): void {
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.order.cancelOrderTitle',
      'model.order.cancelOrderContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.router.navigate([
          this.ROUTER_UTILS.order.root,
          this.ROUTER_UTILS.order.orderList
        ])
      }
    });
   
  }
  getDistrist(provinceID:number){
    const params = {
      province_id:provinceID
    }
    this.countryService.distrist(params).subscribe((res:any) =>{
      this.distrist = res.data;
      this.form.get('district')?.setValue(this.getCodeDistrcit(this.addresses  ?   this.addresses [ this.addresses .length - 2] : '' ))
    })
  }
  getWard(districtId:number){
    this.countryService.ward(districtId).subscribe((res:any) =>{
      this.ward = res.data;
      this.form.get('ward')?.setValue(this.getCodeWard(this.addresses  ?   this.addresses [ this.addresses .length - 3] : '' ))
      
    })
  }
  getStringWard(){
    const ward = this.form.get('ward')?.value;
    let data2 = '';
    this.ward.forEach((data) => {
      const w= data.WardCode as string;
      if(w === ward){
        data2 =  data.WardName;
      }
    });
    return data2;
  }
  getCodeWard(param:string):string{
    let data2 = '';
    this.ward.forEach((data) => {
      
      if(data.WardName === param){
        data2 =  data.WardCode;
      }
    });
    return data2;
  }
  getStringDistrcit():string{
    const district = this.form.get('district')?.value;
    let data2 = '';
    this.distrist.forEach((data) => {
      if(data.DistrictID === district){
        data2 =  data.DistrictName;
      }
    });
    return data2;
  }
  getCodeDistrcit(param:string):number{
    let data2 = -1;
    this.distrist.forEach((data) => {
      if(data.DistrictName === param){
        data2 =  data.DistrictID;
      }
    });
    return data2;
  }
  getStringpProvince():string{
    const province = this.form.get('province')?.value;
    let data2 = '';
    this.province.forEach((data) => {
      if(data.ProvinceID === province){
        data2 =  data.ProvinceName;
      }
    });
    return data2;
  }
  getCodeProvince(param:string):number{
    console.log(param);
    let data2 = -1;
    this.province.forEach((data) => {
      if(data.ProvinceName === param){
        data2 =  data.ProvinceID;
        this.getDistrist(data2);  
      }
    });
    return data2;
  }
  onSubmit(): void {
    if (this.selectedProducts.length === 0) {
      this.toast.error('Hóa đơn hiện chưa có sản phẩm nào');
      return;
    }
    this.create();
  }

  chargeShipping(total: number) {
    if(this.selectedProducts.length > 0 ){
    const district = this.form.get('district')?.value as number;
    const ward = this.form.get('ward')?.value;
    if(!ward){
      this.changePrice();
      return;
    }
    const param = {
      shop_id:3445621,
      from_district:2268,
      to_district:district
  }
  this.cartService.getServiceShipping(param).subscribe((res:any)=>{
    const data = res.data;
    console.log(data);
    
    this.ship.service_id = data ? data[0].service_id : 53322;
    this.ship.insurance_value=total;
    this.ship.from_district_id =2268;
    this.ship.to_district_id =district as number ;
    this.ship.to_ward_code= ward +'' ;
    this.ship.height=10;
    this.ship.length=10;
    this.ship.weight = 1000;
    this.ship.width =10;
    this.cartService.chargeShipping(this.ship).subscribe((respone) =>{
     this.shipMoney = respone.data.total;
     this.changePrice();
   })
})
    }

}


  onUpdateSubmit(): void {}

  navigateToUpdatePage() {
  }

  //tab
  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    if (this.tabs.length < 5) {
      this.selectedIndex = this.tabs.length + 1;
      this.tabs.push('Hoá đơn ' + this.selectedIndex);
    }
    else {
      this.toast.warning('common.maxOrder', {
        count: this.maxOrder,
      });
    }
    //gọi lại hàm load product
    // for (let i = 0; i < 20; i++) {
    //   this.list.push({
    //     key: i.toString(),
    //     title: `content${i + 1}`,
    //     description: `description of content${i + 1}`,
    //     direction: Math.random() * 2 > 1 ? 'right' : undefined
    //   });
    // }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  getImage(imageUrl: string): string {
    if (imageUrl) {
      return imageUrl;
    }
    return 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png';
  }
  create(): void {
    if (this.selectedProducts.length === 0) {
      this.toast.error('Hóa đơn hiện chưa có sản phẩm nào');
      return;
    }
    const order: Order = {
      ...this.form.value,
      phoneNumber:this.currentUser.phoneNumber,
      transportFee:this.shipMoney,
      address:this.form.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince(),
      total: this.thanhtien,
      createBy: this.localStorage.retrieve("username"),
      orderDetailList: this.selectedProducts.map((res: any) => {
        const price = res.price as number;
        const productDetail: IProductOrder = {
          productId: res.productId,
          quantity: res.quantityBy,
          price: res.price,
          sizeId: res.sizeId,
          total: ((res.quantityBy as number) * price) as number,
        };
        return productDetail;
      }),
    };
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.order.createOrderTitle',
      'model.order.createOrderContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.orderService.createOrder(order).subscribe((res) => {
       //   this.router.navigate([ROUTER_UTILS.order.root,ROUTER_UTILS.order.orderList])
          this.toast.success('Thêm hóa đơn thành công');
          this.localStorage.clear("selectedProducts");
        });
      }
    });
  }
  onSubmitOrderWait(): void {
    const order: Order = {
      ...this.form.value,
      phoneNumber:this.currentUser.phoneNumber,
      status:StatusEnum.HOA_DON_CHO,
      total: this.thanhtien,
      orderDetailList: this.selectedProducts.map((res: any) => {
        const price = res.price as number;
        const productDetail: IProductOrder = {
          productId: res.productId,
          quantity: res.quantityBy,
          price: res.price,
          sizeId: res.sizeId,
          total: ((res.quantityBy as number) * price) as number,
        };
        return productDetail;
      }),
    };
    const createForm = CommonUtil.modalConfirm(
      this.translateService,
      'model.order.createOrderWaitTitle',
      'model.order.createOrderWaitContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.orderService.createOrder(order).subscribe((res) => {
          this.toast.success('Thêm hóa đơn thành công');
          this.localStorage.clear("selectedProducts");
        });
      }
    });
  }
  createCustomer(): void {
    const base = CommonUtil.modalBase(
      AddCustomerComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '50%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadCustomer();
        this.form.get('userId')?.setValue(result.value.userId);
        this.currentUser = result.value
      }
    });
  }

  getTotal(eventId: any) {
    const selectEvent = this.events.filter(
      (evn: IEvent) => evn.eventId === eventId
    );
    this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
    this.thanhtien = this.total + this.shipMoney - (this.total * this.discount) / 100;
  }
  onLockAndUnLock(result: { success: boolean }): void {
    this.lockPopup.callBack = () => {};
    this.isVisible = false;
  }

  getChange(event: any) {
    console.log(event);
    const id = event.nzValue + '';
    event.nzValue = '';
    this.productOrders
      .filter((item) => item.id === id)
      .forEach((item) => {
        if (item.quantity === 0) {
          this.toast.error(
            `Sản phẩm ${item.nameProduct} kích thước ${item.size}   đã hết hàng`
          );
          this.value = '';
          this.productOrders = this.productOrders.filter(
            (item) => item.id !== id
          );
          this.productOrderFilter = this.productOrders;
          return;
        }
        item.quantityBy = 1;
        this.selectedProducts.push(item);
        // this.localStorage.store("selectedProducts",JSON.stringify(this.selectedProducts));
        this.productOrders = this.productOrders.filter(
          (item) => item.id !== id
        );
        this.productOrderFilter = this.productOrders;
      
       this.chargeShipping(this.total);
      });
  }
  fiter(event: any) {
    const value = event.target.value + '';
    this.productOrderFilter = this.productOrders.filter((item) =>
      item.nameProduct?.includes(value.trim()) || item.productCode?.includes(value.trim())
    );
  }
  changQuantity(event: any, quantity: number, i: number) {
    console.log(event);
    
    const quantityBy = event.target.value;
    if(!quantityBy){
      return;
    }
    if (quantity < quantityBy) {
      this.toast.error('Sản phẩm mua vượt quá số lượng của cửa hàng');
      this.selectedProducts[i].quantityBy = quantity;
    } else if (quantityBy <= 0) {
      this.selectedProducts[i].quantityBy = 1;
      this.toast.error('Sản phẩm mua phải có số lượng lớn hơn 0');
    } else {
      this.selectedProducts[i].quantityBy = quantityBy;
    }
    // this.localStorage.store("selectedProducts",JSON.stringify(this.selectedProducts));
  }
  changePrice(){
    this.total = 0;
    this.selectedProducts.forEach(item => {
      const q =  item.quantityBy as number;
       this.total = this.total + (item.price as number * q) 
     })
     this.thanhtien = this.total + this.shipMoney - (this.total * this.discount/100);
     if(this.total === 0 || !this.form.get('ward')?.value){
      this.shipMoney = 0;
     }
  }
  delete(item:IProductOrder,i:number){
        const form = CommonUtil.modalConfirm(
      this.translateService,
      'model.order.deleteProductOrderTitle',
      'model.order.deleteProductOrderContent'
    );
    const modal = this.modalService.create(form);
    
    modal.afterClose.subscribe((result: { success: boolean }) => {
      if (result.success) {
        this.selectedProducts = this.selectedProducts.filter((item,index) => index !== i );
        // this.localStorage.store("selectedProducts",JSON.stringify(this.selectedProducts));
        this.productOrderFilter.push(item);
        this.changePrice();
        this.value = '     ';
      }
    });
  }

}
