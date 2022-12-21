import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductRoutingModule } from './product-routing.module';
import { CategoryComponent } from './category/category.component';
import { MaterialComponent } from './material/material.component';
import { SharedModule } from '../../../shared/shared.module';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { AccessoryComponent } from './accessory/accessory.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { VendorComponent } from './vendor/vendor.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import { DetailVendorComponent } from './detail-vendor/detail-vendor.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { UpdateMaterialComponent } from './update-material/update-material.component';
import { DetailMaterialComponent } from './detail-material/detail-material.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { UpdateAccessoryComponent } from './update-accessory/update-accessory.component';
import { OrderListComponent } from '../order/order-list/order-list.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { ProductProcessedComponent } from './product-processed/product-processed.component';
import { UpdateWaitingProductComponent } from './update-waitingProduct/update-waitingProduct.component';
import { DetailWaitingProductComponent } from './detail-waitingProduct/detail-waitingProduct.component';
import { SizeListComponent } from './size-list/size-list.component';
@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    NzTransferModule,
    NzDatePickerModule,
    NzSliderModule
  ],
  declarations: [
    ProductComponent,
    CategoryComponent,
    MaterialComponent,
    AccessoryComponent,
    UpdateCategoryComponent,
    VendorComponent,
    UpdateVendorComponent,
    DetailVendorComponent,
    DetailCategoryComponent,
    UpdateMaterialComponent,
    DetailMaterialComponent,
    ProductUpdateComponent,
    UpdateAccessoryComponent,
    DetailProductComponent,
    ProductProcessedComponent,
    UpdateWaitingProductComponent,
    DetailWaitingProductComponent,
    SizeListComponent
  ],
})
export class ProductModule {}
