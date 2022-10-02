import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { OrderComponent } from './order.component';
import { RefunComponent } from './refun/refun.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.order.orderList,
    component: OrderComponent,
    data: {
      title: 'model.order.list',
    },
  },
  {
    path: ROUTER_UTILS.order.refun,
    component: RefunComponent,
    data: {
      title: 'model.order.refun',
    },
  }
  // {
  //   path: ROUTER_UTILS.product.category,
  //   component: CategoryComponent,
  //   data: {
  //     title: 'model.category.list',
  //   },
  // }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
