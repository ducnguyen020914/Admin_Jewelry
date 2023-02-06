import { Component, Input, OnInit } from '@angular/core';
import { Category, ICategory } from '../../../../shared/models/category.model';
import { CategorySearchRequest } from '../../../../shared/models/request/category-search-request.model';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { CategoryService } from '../../../../shared/services/product/category.service';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import { TranslateService } from '@ngx-translate/core';
import { map, filter } from 'rxjs/operators';
import { element } from 'protractor';
import { LocalStorageService } from 'ngx-webstorage';
import CommonUtil from "@shared/utils/common-utils";

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  @Input() isUpdate = false;
  @Input() isDetail = false;
  @Input() action = '';
  @Input() category: Category = new Category();
  initalState:Category = new Category();
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  pathTranslate = 'model.category.'
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  form:FormGroup = new  FormGroup([]);
  categorySearchRequest: CategorySearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  constructor(private fb: FormBuilder,
    private categoryService:CategoryService,
    private toast:ToastService,
    private modalRef:NzModalRef,
              private modalService: NzModalService,
              private localStorage:LocalStorageService,
    private translateService:TranslateService) { }
  get properties():FormArray{
    return this.form.get('properties') as FormArray;
  }
  ngOnInit() {

    this.initForm();
  }
  initForm(): void {
    console.log(this.category);

    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.category;
    this.form = this.fb.group({
      name: [dataObject.name, [Validators.required]],
      description:[dataObject.description],
        properties: this.fb.array([]),
    });
    if(this.isUpdate){
      dataObject.properties?.forEach((category:any) => {
        this.properties.push(this.fb.control(category.name));
      })
    }
  }
  searchCategories(id:string){};

  addProperties() {
    this.properties.push(
     this.fb.control('')
    );
  }
  onSubmit(): void {
    console.log('ádsda', this.properties);
    if (this.isUpdate) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }
  updateCategory(){
    const updatencc =CommonUtil.modalConfirm(
      this.translateService,
      'Xác nhận',
      'Bạn có muốn cập nhật thể loại không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(updatencc);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) => {
      if(result?.success) {
        console.log('heelooo khi');
        const category: Category = {
          ...this.form.value,
          lastModifiedBy:this.localStorage.retrieve('username'),
          properties:this.propertyValues().filter((element) => element.trim() !== '')
        };
        this.categoryService.update(category,this.category.categoryId).subscribe((res) => {
          this.toast.success('model.category.success.update');
          this.modalRef.close({
            success: true,
            value: category,
          });
        });
      }
    })
  }
  propertyValues():string[]{
    return this.properties.value;
  }
  createCategory(){
    const updatencc =CommonUtil.modalConfirm(
      this.translateService,
      'Xác nhận',
      'Bạn có muốn thêm thể loại không',
      {name: 'a'}
    )

    const modal: NzModalRef =this.modalService.create(updatencc);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) => {
      if(result?.success) {
        const category: Category = {
          ...this.form.value,
          createBy:this.localStorage.retrieve('username'),
          lastModifiedBy:this.localStorage.retrieve('username'),
          properties:this.propertyValues().filter((element) => element.trim() !== '')
        };
        console.log('heelooo khi',category);
        this.categoryService.create(category).subscribe((res) => {
          this.toast.success('model.category.success.create');
          this.modalRef.close({
            success: true,
            value: category,
          });
        });
      }
    })
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
