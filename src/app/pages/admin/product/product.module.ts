import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { MaterialComponent } from './material/material.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [ProductComponent,CategoryComponent,MaterialComponent]
})
export class ProductModule { }
