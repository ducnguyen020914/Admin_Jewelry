import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import {TranslateModule} from "@ngx-translate/core";
import {OrderListComponent} from "@pages/admin/order/order-list/order-list.component";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {ToastService} from "@shared/services/helpers/toast.service";
import {SharedModule} from "@shared/shared.module";
import { UpdateOrderComponent } from './update-order/update-order.component';
import {NzTransferModule} from "ng-zorro-antd/transfer";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { DetailUpdateOrderComponent } from './detail-update-order/detail-update-order.component';
import { ExchangeListComponent } from './exchange-list/exchange-list.component';
import { OrderListExchangeComponent } from './order-list-exchange/order-list-exchange.component';
import { ExchangeOrderComponent } from './exchange-order/exchange-order.component';
import { RepurchaseListComponent } from './repurchase-list/repurchase-list.component';
import { ExchangeOrderDetailComponent } from './exchange-order-detail/exchange-order-detail.component';
import { RepurchaseCreateComponent } from './repurchase-create/repurchase-create.component';
import { RepurchaseOrderComponent } from './repurchase-order/repurchase-order.component';
import { RepurchaseCreateBeforeComponent } from './repurchase-create-before/repurchase-create-before.component';
import { AddOrderComponent } from './add-order/add-order.component';
import { UpdateHoaDonChoComponent } from './update-hoa-don-cho/update-hoa-don-cho.component';
import { RepurchaseDetailComponent } from './repurchase-detail/repurchase-detail.component';


@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    TranslateModule,
    SharedModule,
    NzTransferModule,
    NzDatePickerModule,
    NzSliderModule,
    NzTagModule,
    NzAutocompleteModule,
  ],
  declarations: [
    OrderComponent,
    OrderListComponent,
    UpdateOrderComponent,
    DetailUpdateOrderComponent,
    ExchangeListComponent,
    OrderListExchangeComponent,
    ExchangeOrderComponent,
    RepurchaseListComponent,
    ExchangeOrderDetailComponent,
    RepurchaseCreateComponent,
    RepurchaseOrderComponent,
    RepurchaseCreateBeforeComponent,
    AddOrderComponent,
    UpdateHoaDonChoComponent,
    RepurchaseDetailComponent
  ],
  providers: [
    ToastService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrderModule { }
