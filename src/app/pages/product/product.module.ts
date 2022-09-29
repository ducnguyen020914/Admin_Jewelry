import { NgModule } from "@angular/core";
import { ProductRoutingModule } from './product-routing.module';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';

@NgModule({
    declarations: [
        ProductComponent
    ],
    imports: [
    CommonModule,
    ProductRoutingModule,
    ],
    providers: [],
    schemas: [],
  })
  export class ProductModule {}