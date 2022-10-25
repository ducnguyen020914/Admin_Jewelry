import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ROUTER_ACTIONS, ROUTER_UTILS} from '../../../shared/utils/router.utils';
import { OrderComponent } from './order.component';
import {OrderListComponent} from "@pages/admin/order/order-list/order-list.component";
import {UpdateOrderComponent} from "@pages/admin/order/update-order/update-order.component";
import {ExchangeListComponent} from "@pages/admin/order/exchange-list/exchange-list.component";

const routes: Routes = [
  {
    path: ROUTER_UTILS.order.orderList,
    component: OrderListComponent,
    data: {
      title: 'model.order.list',
    }
  },
  {
    path: ROUTER_UTILS.order.exchange,
    component: ExchangeListComponent,
    data: {
      title: 'model.order.exchange',
    }
  },
  {
    path: ROUTER_UTILS.order.orderList,
    component: OrderComponent,
    data: {
      title: 'model.order.list',
    }
  },
  {
    path: ROUTER_UTILS.order.orderCreate,
    component: UpdateOrderComponent,
    data: {
      title: 'model.order.create',
      action: ROUTER_ACTIONS.create,
    }
  },
  {
    path: ROUTER_UTILS.order.orderUpdate,
    component: UpdateOrderComponent,
    data: {
      title: 'model.order.update',
      action: ROUTER_ACTIONS.update,
    }
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
