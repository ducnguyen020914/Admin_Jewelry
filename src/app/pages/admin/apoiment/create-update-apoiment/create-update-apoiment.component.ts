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
import { element } from 'protractor';
import { LocalStorageService } from 'ngx-webstorage';
import { Apoiment, CalendarStatus } from '../../../../shared/models/apoiment.model';
import { ProductService } from '../../../../shared/services/product/product.service';
import { Product } from '../../../../shared/models/productReal.model';
import { SizeService } from '../../../../shared/services/product/size.service';
import { Size } from '../../../../shared/models/size.model';
import * as moment from 'moment';
import { CalendarService } from '../../../../shared/services/calendar.service';
@Component({
  selector: 'app-create-update-apoiment',
  templateUrl: './create-update-apoiment.component.html',
  styleUrls: ['./create-update-apoiment.component.css']
})
export class CreateUpdateApoimentComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() isDetail = false;
  @Input() action = '';
  @Input() calendar: Apoiment = new Apoiment();
  status = this.calendar.status+'';
  initalState:Apoiment = new Apoiment();
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  pathTranslate = 'model.category.'
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  plainFooter = 'plain extra footer';
  products:Product[] = [];
  sizes:Size[] = [];
  form:FormGroup = new  FormGroup([]);
  categorySearchRequest: CategorySearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  constructor(private fb: FormBuilder,
    private categoryService:CategoryService,
    private toast:ToastService,
    private modalRef:NzModalRef,
    private localStorage:LocalStorageService,
    private translateService:TranslateService,
    private productService:ProductService,
    private sizeService:SizeService,
    private calendarService:CalendarService) {
    
     }
  get properties():FormArray{
    return this.form.get('properties') as FormArray;
  }
  ngOnInit() {
    console.log(this.calendar);
   this.loadProduct();
    this.initForm();
    if(this.isUpdate){
      this.loadSize(this.calendar.productId+'');
    }
    
  }
  initForm(): void {
    console.log(this.calendar);
    
    const dataObject =
      !this.isUpdate
        ? this.initalState
        : this.calendar;
    this.form = this.fb.group({
      userName: [{value :dataObject.userName,disabled:this.isUpdate && this.checkStatus() ? true:false}, [Validators.required]],
      phoneNumber:[{value :dataObject.phoneNumber,disabled:this.isUpdate && this.checkStatus() ? true:false},[Validators.required]],
      email:[{value:dataObject.email,disabled:this.isUpdate && this.checkStatus() ? true:false},[Validators.required,Validators.email]],
      time:[{value:dataObject.time,disabled:this.isUpdate && this.checkStatus() ? true:false},[Validators.required]],
      productId:[{value:dataObject.productId,disabled:this.isUpdate && this.checkStatus() ? true:false},[Validators.required]],
      sizeId:[{value:dataObject.sizeId,disabled:this.isUpdate && this.checkStatus() ? true:false},[Validators.required]],
      note:[dataObject.note],
    });
  
  }
  private loadProduct(){
    this.productService.autoComlete().subscribe((res:any)=>{
      this.products = res.body.data;
    })
  }
  loadSize(productId:string){
    this.sizeService.getbyProductId(productId).subscribe((res:any)=>{
      this.sizes = res.body.data;
    })
  }
  searchCategories(id:string){};

  onSubmit(): void {
    if (this.isUpdate) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }
  updateCategory(){
    console.log('heelooo khi');
    const apoiment: Apoiment = { 
      ...this.form.value,
    };
    this.calendarService.update(apoiment,this.calendar.id+'').subscribe((res) => {
      this.toast.success('Cập nhật lịch hẹn thành công');
      this.modalRef.close({
        success: true,
        value: apoiment,
      });
    });
  }
  checkStatus(){
    if(this.calendar.status){
      return this.calendar.status !== CalendarStatus.WAIT_CONFIRM ? true: false;
    }
    return false;
  }
  propertyValues():string[]{
    return this.properties.value;
  }
  createCategory(){
    const apoiment: Apoiment = { 
      ...this.form.value,
      status:CalendarStatus.WAIT_CONFIRM
    };
    console.log('heelooo khi',apoiment);
    this.calendarService.create(apoiment).subscribe((res) => {
      this.toast.success('Đặt lịch hẹn thành công');
      this.modalRef.close({
        success: true,
        value: apoiment,
      });
    });
  };
    getTranslate(str: string): string {
      return this.translateService.instant(this.pathTranslate + '' + str);
    }
  onChangeData(type: string, content: string): void {
    this.form.get(type)?.setValue(content);
  }
  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }
}
