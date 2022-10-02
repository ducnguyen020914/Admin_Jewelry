import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule
  ],
  declarations: [OrderComponent]
})
export class OrderModule { }
