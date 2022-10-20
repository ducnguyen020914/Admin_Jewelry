import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS, ROUTER_ACTIONS } from '../../../shared/utils/router.utils';
import { ProductComponent } from './product.component';
import { CategoryComponent } from './category/category.component';
import { MaterialComponent } from './material/material.component';
import { AccessoryComponent } from './accessory/accessory.component';
import { VendorComponent } from './vendor/vendor.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { DetailMaterialComponent } from './detail-material/detail-material.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

const routes: Routes = [
  {
    path: ROUTER_UTILS.product.productList,
    component: ProductComponent,
    data: {
      title: 'sidebar.product',
    },
  },
  {
    path: ROUTER_UTILS.product.category,
    component: CategoryComponent,
    data: {
      title: 'sidebar.category',
    },
  },
  {
    path: ROUTER_UTILS.product.material,
    component: MaterialComponent,
    data: {
      title: 'sidebar.material',
    },
  },
  {
    path: ROUTER_UTILS.product.accessory,
    component: AccessoryComponent,
    data: {
      title: 'sidebar.accessory',
    },
    
  },

  {
    path: ROUTER_UTILS.product.vendor,
    component: VendorComponent,
    data: {
      title: 'sidebar.vendor',
    },
    
  },
  {
    path: ROUTER_UTILS.product.categoryDetail,
    component: DetailCategoryComponent,
    data: {
      title: 'model.category.details',
      action: ROUTER_ACTIONS.detail,
    },
  },
  {
    path: ROUTER_UTILS.product.materialDetail,
    component: DetailMaterialComponent,
    data: {
      title: 'model.material.details',
      action: ROUTER_ACTIONS.detail,
    },
  },
  {
    path: ROUTER_UTILS.product.productCreate,
    component: ProductUpdateComponent,
    data: {
      title: 'model.product.list',
      action: ROUTER_ACTIONS.create,
    },
   
  },{
    
      path: ROUTER_UTILS.product.productUdate,
      component: ProductUpdateComponent,
      data: {
        title: 'model.product.list',
        action: ROUTER_ACTIONS.update,
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
export class ProductRoutingModule {}
