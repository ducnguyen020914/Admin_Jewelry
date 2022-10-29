import { Component, Input, OnInit } from '@angular/core';
import { ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from '../../../../shared/models/user.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { ProductService } from '../../../../shared/services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../shared/services/user.service';
import { EventService } from '../../../../shared/services/product/event.service';
import { OrderService } from '../../../../shared/services/order/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { LocalStorageService } from 'ngx-webstorage';
import { paymentMethod } from '../../../../shared/constants/order.constant';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { Order } from '../../../../shared/models/order.model';

@Component({
  selector: 'app-detail-update-order',
  templateUrl: './detail-update-order.component.html',
  styleUrls: ['./detail-update-order.component.css']
})
export class DetailUpdateOrderComponent implements OnInit {
  @Input() action = '';
  id = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  PAYMENT_METHOD = paymentMethod;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  form: FormGroup = new FormGroup({});
  order: Order = {};
  users: IUser[] = [];
  currentUser: IUser = {};
  events:Event[] = [];
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
  }

  ngOnInit() {
    this.loadOrder();
  }
  loadOrder(){
     this.orderService.findOne(this.id).subscribe((res:any) => {
       this.order = res.body?.data 
       console.log(this.order);
       
     })
  }
  showCustomer() {
    this.users
      .filter((data: IUser) => data.userId === this.form.get('userId')?.value)
      .forEach((data) => {
        this.currentUser = data;
      });
  }
  getTotal(event:any){

  }
}
