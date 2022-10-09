import { Component, OnInit,Input } from '@angular/core';
import { Vendor } from '../../../../shared/models/vendor.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { ROUTER_ACTIONS } from '../../../../shared/utils/router.utils';
import { TranslateService } from '@ngx-translate/core';
import { VendorService } from '../../../../shared/services/product/vendorservice';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { VALIDATORS } from '../../../../shared/constants/validators.constant';
import CommonUtil from '../../../../shared/utils/common-utils';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
  @Input() isUpdate = false;
  @Input() vendor:Vendor  = new Vendor();
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  @Input() action = '';
  initalState: Vendor = new Vendor();
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private vendorService: VendorService,
    private modalRef: NzModalRef,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.vendor;
    this.form = this.fb.group({
      name: [
        dataObject.name,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.NAME_MAX_LENGTH.MAX),
        ],
      ],
      bankNumber: [
        dataObject.bankNumber,
        [
          Validators.required,
        ],
      ],
      bankName: [
        dataObject.bankName,
        [
          Validators.required,
        ],
      ],
      phone: [
        dataObject.phone,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.PHONE_MAX_LENGTH.MAX),
          Validators.pattern(VALIDATORS.PHONE),
        ],
      ],
      email: [
        dataObject.email,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.EMAIL_MAX_LENGTH.MAX),
          Validators.pattern(VALIDATORS.EMAIL),
        ],
      ],
      address: [
        dataObject.address,
        [
          Validators.required,
        ],
      ],
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
      this.updateManufacture();
    } else {
      this.createManufacture();
    }
  }

  private createManufacture(): void {
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const vendor: Vendor = {
      ...this.form.value,
    };
    this.vendorService.create(vendor).subscribe((res) => {
      this.toast.success('model.manufacture.success.create');
      this.modalRef.close({
        success: true,
        value: vendor,
      });
    });
  }

  private updateManufacture(): void {
    console.log(this.vendor);
    
    if (this.form.invalid) {
      CommonUtil.markFormGroupTouched(this.form);
      return;
    }
    const vendor: Vendor = {
      ...this.form.value,
    };
    if (this.vendor?.vendorId) {
      this.vendorService
        .update( this.vendor.vendorId,vendor)
        .subscribe((res) => {
          this.toast.success('model.manufacture.success.update');
          this.modalRef.close({
            success: true,
            value: vendor,
          });
        });
    }
  }

}
