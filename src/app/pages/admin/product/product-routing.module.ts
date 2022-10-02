import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category/category.component';
import { MaterialComponent } from './material/material.component';
import { AccessoryComponent } from './accessory/accessory.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.product.productList,
    component: ProductComponent,
    data: {
      title: 'model.product.list',
    },
  },
  {
    path: ROUTER_UTILS.product.category,
    component: CategoryComponent,
    data: {
      title: 'model.product.list',
    },
  },
  {
    path: ROUTER_UTILS.product.material,
    component: MaterialComponent,
    data: {
      title: 'model.product.material',
    },
  },
  {
    path: ROUTER_UTILS.product.accessory,
    component: AccessoryComponent,
    data: {
      title: 'model.product.accessory',
    },
  },
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
export class ProductRoutingModule {}
