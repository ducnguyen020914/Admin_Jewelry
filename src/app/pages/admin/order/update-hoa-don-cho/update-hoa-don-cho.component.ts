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
import { EmployeeUpdateComponent } from '@pages/admin/user/employee/employee-update/employee-update.component';
import { ORDER_STATUS } from '../../../../shared/constants/order.constant';


@Component({
  selector: 'app-update-hoa-don-cho',
  templateUrl: './update-hoa-don-cho.component.html',
  styleUrls: ['./update-hoa-don-cho.component.css']
})
export class UpdateHoaDonChoComponent implements OnInit {
  @Input() action = '';
  id = '';
  tabs = ['Hoá đơn 1', 'Hoá đơn 2'];
  selectedIndex = 0;
  list: IProductOrder[] = [];
  disabled = false;
  menuId = '';
  staff = '';
  ORDER_STATUS = [
    {value: 'HOA_DON_CHO', label: 'Hóa đơn chờ'},
    {value: 'DA_GIAO', label: 'model.order.status.completed'},
    {value: 'HUY', label: 'model.order.status.cancelled'},
    ];
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

  ngOnInit(): void {
    // this.initForm();
    // this.loadCustomer();
    this.loadProductOrder();
   
  }
  loadOrder() {
    this.orderService.findOne(this.id).subscribe((res: any) => {
      this.order = res.body?.data;
      this.selectedProducts = this.order.orderDetailDTOList as IProductOrder[];
      console.log(this.selectedProducts);      
      console.log('Order', this.order);
      console.log('Selected', this.selectedProducts);
      this.selectedProducts.forEach((p)=>{
        p.quantityBy = p.quantity
        this.productOrders.forEach((p2,index)=>{
          if(p.productId === p2.productId && p.sizeId === p2.sizeId){
            p.quantity = p2.quantity;
            console.log('index',index);
            this.productOrders.splice(index,1);
          }
        })
      });
      this.changePrice();
      this.form.get('userId')?.setValue(this.order.userId);
      this.form.get('paymentMethod')?.setValue(this.order.paymentMethod);
      this.form.get('eventId')?.setValue(this.order.eventId);
      this.form.get('address')?.setValue(this.order.address);
      this.form.get('date')?.setValue(this.order.createAt);
      this.form.get('status')?.setValue(this.order.status);
      this.form.get('staff')?.setValue(this.localStorage.retrieve('username'));
      this.form.get('purchaseType')?.setValue(this.order.purchaseType);
      this.form.get('transportFee')?.setValue(this.order.transportFee);
      this.form.get('status')?.setValue(this.order.status);
      this.thanhtien = this.order.total ? this.order.total : 0;
      // this.getStatus(this.form.get('status')?.value);
      this.getTotal(this.form.get('eventId')?.value);
      
    });
  }
  loadProductOrder() {
    this.productService.productOrders().subscribe((res: any) => {
      this.productOrders = res.body?.data;
      // this.selectedProducts = JSON.parse(this.localStorage.retrieve('selectedProducts'));
      if(this.selectedProducts=== null){
        this.selectedProducts = [];
      }
      this.changePrice();
      this.selectedProducts.map((item) => item.id).forEach(item => {
        this.productOrders =   this.productOrders.filter((item1) => item1.id !== item)
      })
      this.productOrderFilter = this.productOrders;
      this.loadOrder();
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
  }
  onCancel(): void {
    this.router.navigate([
      this.ROUTER_UTILS.order.root,
      this.ROUTER_UTILS.order.orderList
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
    if (this.selectedProducts.length === 0) {
      this.toast.error('Hóa đơn hiện chưa có sản phẩm nào');
      return;
    }
    const order: Order = {
      ...this.form.value,
      total: this.thanhtien,
      phoneNumber:this.currentUser.phoneNumber,
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
      'model.order.updateOrderWaitTitle',
      'model.order.updateOrderWaitContent'
    );

    const modal: NzModalRef = this.modalService.create(createForm);
    modal.afterClose.subscribe((result: { success: boolean; data: any }) => {
      if (result?.success) {
        this.orderService.updateOrderWait(this.id,order).subscribe((res) => {
          this.toast.success('Cập nhật hóa đơn chờ thành công');
          this.router.navigate(['order','list']);
        });
      }
    });
  }
  onSubmitOrderWait(): void {
    const order: Order = {
      ...this.form.value,
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
      'model.order.createOrderTitle',
      'model.order.createOrderContent'
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
      EmployeeUpdateComponent,
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
        // this.localStorage.store("selectedProducts",JSON.stringify(this.selectedProducts));
        this.productOrderFilter.push(item);
        this.changePrice();
        this.value = '     ';
      }
    });
  }
}
