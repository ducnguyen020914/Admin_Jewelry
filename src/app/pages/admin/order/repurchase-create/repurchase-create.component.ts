import { Component, Input, OnInit } from '@angular/core';
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
import { RepurchaseService } from '../../../../shared/services/order/repurchase.service';

@Component({
  selector: 'app-repurchase-create',
  templateUrl: './repurchase-create.component.html',
  styleUrls: ['./repurchase-create.component.css']
})
export class RepurchaseCreateComponent implements OnInit {

  @Input() action = '';
  tabs = ['Hoá đơn 1', 'Hoá đơn 2'];
  selectedIndex = 0;
  list: IProductOrder[] = [];
  disabled = false;
  menuId = '';

  ROUTER_ACTIONS = ROUTER_ACTIONS;
  ROUTER_UTILS = ROUTER_UTILS;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  PAYMENT_METHOD = paymentMethod;
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
    private repurchaseService:RepurchaseService ,
    private modalService: NzModalService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomer();
    this.loadProductOrder();
    this.loadevent();
   
  }
  loadProductOrder() {
    this.productService.productOrders().subscribe((res: any) => {
      this.productOrders = res.body?.data;
     
      
      this.productOrders = this.productOrders.filter((res) => res.quantity as number > 0)
      this.selectedProducts = JSON.parse(this.localStorage.retrieve('selectedRepurchaseProducts'));
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
      status: [StatusEnum.DA_GIAO],
      eventId: [null],
      address: ['Tại cửa hàng'],
      date: [{ value: new Date(), disabled: true }],
      paymentMethod: [null, [Validators.required]],
      orderDetailList: this.fb.array([]),
      total: [{ value: '', disabled: true }, Validators.required],
      staff: [{ value: '', disabled: true }, Validators.required],
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
  }
  onCancel(): void {
    this.router.navigate([
      this.ROUTER_UTILS.order.root,
      this.ROUTER_UTILS.order.repurchase
    ])
  }

  onSubmit(): void {
    if (this.selectedProducts.length === 0) {
      this.toast.error('Hóa đơn hiện chưa có sản phẩm nào');
      return;
    }
    this.create();
  }

  onUpdateSubmit(): void {}

  navigateToUpdatePage() {}

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
    const order: Order = {
      ...this.form.value,
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
      'model.repurchase.createRepurchaseTitle',
      'model.repurchase.createRepurchaseContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.repurchaseService.createOrder(order).subscribe((res) => {
          this.toast.success('Thêm hóa đơn mua lại thành công');
          this.localStorage.clear("selectedRepurchaseProducts");
          this.onCancel();
        });
      }
    });
  }

  getTotal(eventId: any) {
    const selectEvent = this.events.filter(
      (evn: IEvent) => evn.eventId === eventId
    );
    this.discount = selectEvent.length > 0 ? selectEvent[0].discount : 0;
    this.thanhtien = this.total - (this.total * this.discount) / 100;
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
        item.quantityBy = 1;
        this.selectedProducts.push(item);
        this.localStorage.store("selectedRepurchaseProducts",JSON.stringify(this.selectedProducts));
        this.productOrders = this.productOrders.filter(
          (item) => item.id !== id
        );
        this.productOrderFilter = this.productOrders;
       this.changePrice();
      });
  }
  fiter(event: any) {
    const value = event.target.value + '';
    this.productOrderFilter = this.productOrders.filter((item) =>
      item.nameProduct?.includes(value.trim())
    );
  }
  changQuantity(event: any, quantity: number, i: number) {
    console.log(event);
    
    const quantityBy = event.target.value;
    if(!quantityBy){
      return;
    }
    if (quantityBy <= 0) {
      this.selectedProducts[i].quantityBy = 1;
      this.toast.error('Sản phẩm mua lại phải có số lượng lớn hơn 0');
    } else {
      this.selectedProducts[i].quantityBy = quantityBy;
    }
    this.localStorage.store("selectedRepurchaseProducts",JSON.stringify(this.selectedProducts));
  }
  changePrice(){
    this.total = 0;
    this.selectedProducts.forEach(item => {
      const q =  item.quantityBy as number;
       this.total = this.total + (item.pricePurchase as number * q) 
     })
     this.thanhtien = this.total - (this.total * this.discount/100);
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
        this.localStorage.store("selectedRepurchaseProducts",JSON.stringify(this.selectedProducts));
        this.productOrderFilter.push(item);
        this.changePrice();
        this.value = '     ';
      }
    });
  }

}
