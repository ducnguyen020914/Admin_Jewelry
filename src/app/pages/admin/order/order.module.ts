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
import { ExchangeListComponent } from './exchange-list/exchange-list.component';


@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    TranslateModule,
    SharedModule,
    NzTransferModule,
  ],
  declarations: [
    OrderComponent,
    OrderListComponent,
    UpdateOrderComponent,
    ExchangeListComponent,
  ],
  providers: [
    ToastService,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class OrderModule { }
