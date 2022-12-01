import { Component, Input, OnInit } from '@angular/core';
import { Category, ICategory } from '../../../../shared/models/category.model';
import { CategorySearchRequest } from '../../../../shared/models/request/category-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { CategoryService } from '../../../../shared/services/product/category.service';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { map, filter } from 'rxjs/operators';
import { WaitingProduct } from '../../../../shared/models/productReal.model';
import { WaitingProductService } from '../../../../shared/services/product/waiting-product.service';

@Component({
  selector: 'app-update-waitingProduct',
  templateUrl: './update-waitingProduct.component.html',
  styleUrls: ['./update-waitingProduct.component.css']
})
export class UpdateWaitingProductComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() isDetail = false;
  @Input() action = '';
  @Input() product:WaitingProduct = new WaitingProduct();
  initalState:Category = new Category();
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  pathTranslate = 'model.category.'
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  form:FormGroup = new  FormGroup([]);
  categorySearchRequest: CategorySearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  note:string = '';
  constructor(private fb: FormBuilder,
    private categoryService:CategoryService,
    private productService:WaitingProductService,
    private toast:ToastService,
    private modalRef:NzModalRef,
    private translateService:TranslateService) { }
  get properties():FormArray{
    return this.form.get('properties') as FormArray;
  }
  ngOnInit() {
    this.initForm();
    console.log(this.product);
    
  }
  initForm(): void {
  }
  searchCategories(id:string){};
  
  addProperties() {
    this.properties.push(
     this.fb.control('')
    );
  }
  onSubmit(): void {
    const  data = {
      note : this.note,
      sizeId: this.product.sizeId,
      productId:this.product.productId
    }
     this.productService.update(this.product.id+'',data).subscribe((res:any) =>{
      this.toast.success("Cập nhật thông tin thành công")
      this.modalRef.close({
        success: true,
        value: this.product
      });
    });
  }
  updateCategory(){
  }
  propertyValues():string[]{
    return this.properties.value;
  }
  createCategory(){
    
    const category: Category = {
      ...this.form.value,
      properties:this.propertyValues().filter((element) => element.trim() !== '')
    };
    console.log('heelooo khi',category);
    this.categoryService.create(category).subscribe((res) => {
      this.toast.success('model.category.success.create');
      this.modalRef.close({
        success: true,
      });
    });
  };
    getTranslate(str: string): string {
      return this.translateService.instant(this.pathTranslate + '' + str);
    }
  onChangeData(type: string, content: string): void {
    this.note = content;
  }
  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }

}
