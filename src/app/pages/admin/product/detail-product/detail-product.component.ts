import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { IProduct, Product } from '../../../../shared/models/productReal.model';
import { PRODUCT_STATUS } from '../../../../shared/constants/product.constant copy';
import { ProductStatus } from '../../../../shared/models/enums/productStatus.enum';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {
  @Input() product: IProduct = new Product();
  constructor(
    private modalRef: NzModalRef,
  ) { }

  ngOnInit(): void {
    console.log(this.product);
    
  }

  // pipeType(type: string): string {
  //   return BookingCommonUtil.pipeProductType(type);
  // }

  // pipeSubType(type: string): string {
  //   return BookingCommonUtil.pipeProductSubtype(type);
  // }

  onCancel(): void {
    this.modalRef.close({
      success: false,
      data: null,
    })
  }

  getSize(): string[]{
    const sizes:string[] = [];
    this.product.productSizes?.forEach((size) => {
      sizes.push(size.size+'');
    })
    return sizes;
  }

}
