import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  LENGTH_VALIDATOR,
  VALIDATORS,
} from '@shared/constants/validators.constant';
import { FileService } from '@shared/services/file.service';
import { ToastService } from '@shared/services/helpers/toast.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Accessory, IAccessory} from "@shared/models/accesory.model";
import {AccessoryService} from "@shared/services/product/accessory.service";
import {ACCESSORY_STATUS} from "@shared/constants/accsessory.constant";

@Component({
  selector: 'app-update-accessory',
  templateUrl: './update-accessory.component.html',
  styleUrls: ['./update-accessory.component.scss']
})
export class UpdateAccessoryComponent implements OnInit {
  @Input() isUpdate = false;
  @Input() accessory: IAccessory = new Accessory();
  form: FormGroup = new FormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  @Input() action = '';
  file?: File;
  initalState: IAccessory = new Accessory('', '');
  accessoryStatus = ACCESSORY_STATUS;
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private accessoryService: AccessoryService,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private modalService: NzModalService,
    private translateService: TranslateService,
    private fileService: FileService
  ){ }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.accessory;
    this.form = this.fb.group({
      name: [
        dataObject.name,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.NAME_MAX_LENGTH.MAX),
        ],
      ],
      color: [
        dataObject.color,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.COLOR_MAX_LENGTH.MAX),
        ],
      ],
      description: [
        dataObject.description,
        [
          Validators.maxLength(LENGTH_VALIDATOR.DESC_MAX_LENGTH.MAX),
        ],
      ],
      price: [
        dataObject.price,
        [
          Validators.required,
          Validators.min(0)
        ],
      ],
      status: [
        dataObject.status,
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
    const accessory: IAccessory = {
      ...this.form.value,
      price:
        this.form.value.price &&
        CommonUtil.formatToNumber(this.form.value.price),
    };
      if (this.isUpdate) {
        this.updateAccessory(accessory);
      } else {
        this.createAccessory(accessory);
      }
  }

  private createAccessory(accessory: IAccessory): void {
    const phukien =CommonUtil.modalConfirm(
      this.translateService,
      'Xác nhận',
      'Bạn có muốn thêm phụ kiện không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(phukien);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) => {
      if(result?.success) {
        if (this.form.invalid) {
          CommonUtil.markFormGroupTouched(this.form);
          return;
        }

        this.accessoryService.create(accessory).subscribe((res) => {
          this.toast.success('model.accessory.success.create');
          this.modalRef.close({
            success: true,
            value: accessory,
          });
        });
      }
    })
  }

  private updateAccessory(accessory: IAccessory): void {

    const updatephukien =CommonUtil.modalConfirm(
      this.translateService,
      'Xác nhận',
      'Bạn có muốn cập nhật phụ kiện không',
      {name: 'a'}
    )
    const modal: NzModalRef =this.modalService.create(updatephukien);
    modal.afterClose.subscribe((result:{success: boolean; data: any}) => {
      if(result?.success) {
        if (this.form.invalid) {
          CommonUtil.markFormGroupTouched(this.form);
          return;
        }
        if (this.accessory?.accessoryId) {
          this.accessoryService
            .update(accessory, this.accessory.accessoryId)
            .subscribe((res) => {
              this.toast.success('model.accessory.success.update');
              this.modalRef.close({
                success: true,
                value: accessory,
              });
            });
        }
      }
    })
  }
}
