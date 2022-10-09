import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ToastService} from "@shared/services/helpers/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ROUTER_ACTIONS} from "@shared/utils/router.utils";
import {LENGTH_VALIDATOR} from "@shared/constants/validators.constant";
import {IOrderSearchRequest} from "@shared/models/request/order-search-request.model";
import {PAGINATION} from "@shared/constants/pagination.constants";
import {IOrder} from "@shared/models/order.model";
import {TransferItem} from "ng-zorro-antd/transfer";

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss']
})
export class UpdateOrderComponent implements OnInit {
  //tabs
  tabs = ['Hoá đơn 1', 'Hoá đơn 2'];
  customers = ['KH 1', 'KH 2'];
  selectedIndex = 0;
  list: TransferItem[] = [];
  disabled = false;
  menuId = '';
  action = '';
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  status = false;
  statusIsLoading = false;
  startValue: Date | null = null;

  //menu: IMenuResponse = new MenuResponse();
  orders: IOrder[] = [];
  orderSearchRequest: IOrderSearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  }

  //ERROR_CODE_I18N_MAP = ERROR_CODE_I18N_MAP;
  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private toast: ToastService,
    //private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
  }

  onCancel(): void {
  }

  onSubmit(): void {

  }

  onUpdateSubmit(): void {
  }


  navigateToUpdatePage() {

  }

  //tab
  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    if(this.tabs.length < 5){
      this.selectedIndex = this.tabs.length+1;
      this.tabs.push('Hoá đơn '+this.selectedIndex);
    }
    //gọi lại hàm load product
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: Math.random() * 2 > 1 ? 'right' : undefined
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filterOption(inputValue: string, item: any): boolean {
    return item.description.indexOf(inputValue) > -1;
  }

  search(ret: {}): void {
    console.log('nzSearchChange', ret);
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: {}): void {
    console.log('nzChange', ret);
  }

  create(): void{

  }

}
