import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';


   const routers:Routes= [
    {
      path: 'product-list',
      component:ProductComponent,
    },
    {
      path: 'category-list',
      component:CategoryComponent,

    }
   ]
@NgModule({
  imports: [
    RouterModule.forChild(routers)
  ],
  exports:[RouterModule]
})
export class ProductRoutingModule { }
