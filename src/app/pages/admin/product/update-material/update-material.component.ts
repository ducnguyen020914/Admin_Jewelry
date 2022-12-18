import { Component, Input, OnInit } from '@angular/core';
import { Material } from '../../../../shared/models/material.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef, NzModalModule } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { LENGTH_VALIDATOR } from '../../../../shared/constants/validators.constant';
import { MATERIAL_TYPE } from '../../../../shared/constants/material.constant';
import { ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import { MaterialService } from '../../../../shared/services/product/material.service';
import CommonUtil from '../../../../shared/utils/common-utils';
import { PAGINATION } from '../../../../shared/constants/pagination.constants';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {
  @Input() action = '';
  @Input() isUpdate = false;
  @Input() material:Material = new Material();
  initalState:Material = new Material();
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  MATERIAL_TYPE = MATERIAL_TYPE;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  constructor( private fb: FormBuilder,
    private toast: ToastService,
    private modalRef: NzModalRef,
    private materialService:MaterialService,
    private modalService :NzModalModule) { }

  ngOnInit() {
  this.initForm();
  }
  initForm(): void {
    console.log(this.material);
    
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.material;
    this.form = this.fb.group({
      materialName: [dataObject.materialName, [Validators.required]],
      type :[dataObject.type,[Validators.required]],
      purchasePrice:[dataObject.purchasePrice,[Validators.required,Validators.min(0)]],
      salePrice:[dataObject.salePrice,[Validators.required,Validators.min(0)]],
      color: [dataObject.color, [Validators.required]],
      age: [dataObject.age, [Validators.required,Validators.min(0)]],
    });
  }
  onCancel(): void {
    this.modalRef.close({
      success: false,
      value: null,
    });
  }
  onSubmit(): void {
    if (this.isUpdate) {
      this.updateCategory();
    } else {
      this.createCategory();
    }
  }
  updateCategory(){
    console.log('heelooo khi');
    const material:Material  = {
      ...this.form.value,
      purchasePrice: this.form.value.purchasePrice &&
      CommonUtil.formatToNumber(this.form.value.purchasePrice),
      salePrice:  this.form.value.salePrice &&
      CommonUtil.formatToNumber(this.form.value.salePrice),
    };
    this.materialService.update(this.material.materialId+'',material).subscribe((res) => {
      this.toast.success('model.material.success.update');
      this.modalRef.close({
        success: true,
        value: material,
      });
    });
  }
  createCategory(){
    const material:Material  = {
      ...this.form.value,
      purchasePrice: this.form.value.purchasePrice &&
      CommonUtil.formatToNumber(this.form.value.purchasePrice),
      salePrice:  this.form.value.salePrice &&
      CommonUtil.formatToNumber(this.form.value.salePrice),
    };
    this.materialService.create(material).subscribe((res) => {
      this.toast.success('model.material.success.create');
      this.modalRef.close({
        success: true,
        value: material,
      });
    });
  };
 
}
