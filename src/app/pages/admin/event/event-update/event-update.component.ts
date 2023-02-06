import { Component, Input, OnInit } from '@angular/core';
import { Category, ICategory } from '../../../../shared/models/category.model';
import { CategorySearchRequest } from '../../../../shared/models/request/category-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LENGTH_VALIDATOR, VALIDATORS } from '../../../../shared/constants/validators.constant';
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
import { differenceInCalendarDays } from 'date-fns';
import { IEvent, EventProduct } from '../../../../shared/models/event.model';
import { EventService } from '../../../../shared/services/product/event.service';
import { log } from 'console';
@Component({
  selector: 'app-event-update',
  templateUrl: './event-update.component.html',
  styleUrls: ['./event-update.component.css']
})
export class EventUpdateComponent implements OnInit {

  @Input() isUpdate = false;
  @Input() isDetail = false;
  @Input() action = '';
  @Input() calendar: IEvent | undefined;

  initalState:EventProduct = new EventProduct();
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
    private eventService:EventService,
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
    
  }
  initForm(): void {
    console.log(this.calendar);
    
    const dataObject =
      !this.isUpdate
        ? this.initalState
        : this.calendar;
    this.form = this.fb.group({
      startDate:[dataObject?.startDate],
      discount:[dataObject?.discount],
      endDate:[dataObject?.endDate],
      name:[dataObject?.name],
      description:[dataObject?.description]
    });
  
  }
  onChangeCreateDate(rangeDate: { fromDate?: Date; toDate?: Date }): void {
    this.form.get('startDate')?.setValue(rangeDate.fromDate);
    this.form.get('endDate')?.setValue(rangeDate.toDate);
  }
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, new Date()) < 0;
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
    console.log(this.form.value);
    const endCreatedAt = this.form.get('endDate')?.value;
    const startCreatedAt = this.form.get('startDate')?.value;

    if (this.isUpdate) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }

  propertyValues():string[]{
    return this.properties.value;
  }
  updateCategory(){
    const event: IEvent = { 
      ...this.form.value,
    };
    console.log(event);
    this.eventService.updateEvent(this.calendar?.eventId + '',event).subscribe((res) => {
      this.toast.success('Cập nhật sự kiện thành công');
      this.modalRef.close({
        success: true,
        value: event,
      });
    });
  };
  createCategory(){
    const event: IEvent = { 
      ...this.form.value,
    };
    console.log(event);
    this.eventService.addEvent(event).subscribe((res) => {
      this.toast.success('Thêm sự kiện thành công');
      this.modalRef.close({
        success: true,
        value: event,
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
