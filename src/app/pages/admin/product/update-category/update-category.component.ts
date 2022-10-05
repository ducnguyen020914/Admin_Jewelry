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
  
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  form:FormGroup = new  FormGroup([]);
  categorySearchRequest: CategorySearchRequest = {
    pageIndex: PAGINATION.PAGE_DEFAULT,
    pageSize: PAGINATION.SIZE_DEFAULT,
  };
  constructor(private fb: FormBuilder,
    private categoryService:CategoryService,
    private toast:ToastService,
    private modalRef:NzModalRef) { }
  get properties():FormArray{
    return this.form.get('properties') as FormArray;
  }
  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.category;
    this.form = this.fb.group({
      name: [dataObject.name, [Validators.required]],
        properties: this.fb.array([]),
    });
  }
  searchCategories(id:string){};
  
  addProperties() {
    this.properties.push(
     this.fb.control('')
    );
    console.log(this.properties);
    
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
    console.log('heelooo khi');
    const category: Category = {
      ...this.form.value
    };
    this.categoryService.update(category,this.category.id).subscribe((res) => {
      this.toast.success('model.category.success.create');
      this.modalRef.close({
        success: true,
        value: category,
      });
    });
  }
  createCategory(){
    console.log('heelooo khi');
    const category: Category = {
      ...this.form.value
    };
    this.categoryService.create(category).subscribe((res) => {
      this.toast.success('model.category.success.create');
      this.modalRef.close({
        success: true,
        value: category,
      });
    });
  };
}
