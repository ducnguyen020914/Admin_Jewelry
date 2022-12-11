import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ROUTER_ACTIONS, ROUTER_UTILS} from '../../../shared/utils/router.utils';
import { OrderComponent } from './order.component';
import {OrderListComponent} from "@pages/admin/order/order-list/order-list.component";
import {UpdateOrderComponent} from "@pages/admin/order/update-order/update-order.component";
import { DetailUpdateOrderComponent } from './detail-update-order/detail-update-order.component';
import {ExchangeListComponent} from "@pages/admin/order/exchange-list/exchange-list.component";
import { OrderListExchangeComponent } from './order-list-exchange/order-list-exchange.component';
import { ExchangeOrderComponent } from './exchange-order/exchange-order.component';
import { RepurchaseListComponent } from './repurchase-list/repurchase-list.component';
import { ExchangeOrderDetailComponent } from './exchange-order-detail/exchange-order-detail.component';
import { RepurchaseCreateComponent } from './repurchase-create/repurchase-create.component';
import { RepurchaseOrderComponent } from './repurchase-order/repurchase-order.component';
import { RepurchaseCreateBeforeComponent } from './repurchase-create-before/repurchase-create-before.component';
import { UpdateHoaDonChoComponent } from './update-hoa-don-cho/update-hoa-don-cho.component';
import { RepurchaseDetailComponent } from './repurchase-detail/repurchase-detail.component';

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
    component: DetailUpdateOrderComponent,
    data: {
      title: 'model.order.update',
      action: ROUTER_ACTIONS.update,
    }
  },
  {
    path: ROUTER_UTILS.order.orderDetail,
    component: DetailUpdateOrderComponent,
    data: {
      title: 'model.order.detail',
      action: ROUTER_ACTIONS.detail,
    }
  },
  {
    path: ROUTER_UTILS.order.orderListExchange,
    component: OrderListExchangeComponent,
    data: {
      title: 'model.order.orderListExchange',
      action: ROUTER_ACTIONS.view,
    }
  },
  {
    path: ROUTER_UTILS.order.orderExchange,
    component: ExchangeOrderComponent,
    data: {
      title: 'model.order.orderListExchange',
      action: ROUTER_ACTIONS.create,
    }
  },
  {
    path: ROUTER_UTILS.order.orderExchangeDetail,
    component: ExchangeOrderDetailComponent,
    data: {
      title: 'model.order.orderExchangeDetail',
      action: ROUTER_ACTIONS.update,
    }
  },
  {
    path: ROUTER_UTILS.order.repurchase,
    component: RepurchaseListComponent,
    data: {
      title: 'model.order.repurchase',
      action: ROUTER_ACTIONS.view,
    }
  },
  {
    path: ROUTER_UTILS.order.repurchaseCreate,
    component: RepurchaseCreateComponent,
    data: {
      title: 'model.order.repurchase',
      action: ROUTER_ACTIONS.create,
    }
  },
  {
    path: ROUTER_UTILS.order.repurchaseOrder,
    component: RepurchaseOrderComponent,
    data: {
      title: 'model.order.repurchase',
      action: ROUTER_ACTIONS.view,
    }
  },
  {
    path: ROUTER_UTILS.order.repurchaseExchange,
    component: RepurchaseCreateBeforeComponent,
    data: {
      title: 'model.order.repurchase',
      action: ROUTER_ACTIONS.view,
    }
  },
  {
    path: ROUTER_UTILS.order.updateWaitOrder,
    component: UpdateHoaDonChoComponent,
    data: {
      title: 'model.order.update',
      action: ROUTER_ACTIONS.update,
    }
  },
  {
    path: ROUTER_UTILS.order.detailrepurchase,
    component: RepurchaseDetailComponent,
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
