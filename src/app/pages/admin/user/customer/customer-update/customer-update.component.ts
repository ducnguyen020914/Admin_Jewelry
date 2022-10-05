import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_DATE_FORMAT } from '@shared/constants/common.constant';
import { USER_GENDER } from '@shared/constants/user.constant';
import {
  LENGTH_VALIDATOR,
  VALIDATORS,
} from '@shared/constants/validators.constant';
import { ToastService } from '@shared/services/helpers/toast.service';
import CommonUtil from '@shared/utils/common-utils';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { differenceInCalendarDays } from 'date-fns';
import * as moment from 'moment';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FileService } from '@shared/services/file.service';
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {Customer, ICustomer} from "@shared/models/customer.model";
import {CustomerService} from "@shared/services/customer.service";

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css'],
})
export class CustomerUpdateComponent implements OnInit {
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;
  @Input() customer: ICustomer = new Customer();
  @Input() action = '';
  isUpdate = false;
  customerGender = USER_GENDER;
  form: UntypedFormGroup = new UntypedFormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  initalState: ICustomer = new Customer('', '', '');
  imageUrl?: any;
  file?: File;
  avatarPlaceHolder = AVATAR_PLACEHOLDER_FILE;
  isVisible = false;
  dayOfBirth = moment().toDate();
  DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
  constructor(
    private fb: UntypedFormBuilder,
    private translate: TranslateService,
    private customerService: CustomerService,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm(): void {
    if (this.customer.id) {
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
    console.log(this.customer);
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.customer;
    this.form = this.fb.group({
      name: [
        dataObject.fullName,
        [
          Validators.required,
          Validators.maxLength(LENGTH_VALIDATOR.NAME_MAX_LENGTH.MAX),
        ],
      ],
      phoneNumber: [
        dataObject.phoneNumber,
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
      dayOfBirth: [
        // this.action === this.ROUTER_ACTIONS.update ? new Date(this.customer.dayOfBirth as Date) : '',
        dataObject.dayOfBirth,
        [Validators.maxLength(LENGTH_VALIDATOR.BIRTH_MAX_LENGTH.MAX)],
      ],
      gender: [
        dataObject.gender,
        [Validators.maxLength(LENGTH_VALIDATOR.GENDER_MAX_LENGTH.MAX)],
      ],
      address: [
        dataObject.address,
        [
          Validators.maxLength(LENGTH_VALIDATOR.ADDRESS_MAX_LENGTH.MAX),
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

  private onSubmit(): void {
    console.log(this.file);
    if (this.file) {
      this.fileService.uploadFile(this.file).subscribe((response: any) => {
        const file = response.body?.data;
        const customer: Customer = {
          ...this.form.value,
          avatarFileId: file.id,
        };
        if (this.form.get('dayOfBirth')?.value) {
          customer.dayOfBirth = moment(customer.dayOfBirth).format('yyyy-MM-DD');
        }
        if (this.action === this.ROUTER_ACTIONS.update) {
          this.update(customer);
        } else {
          this.create(customer);
        }
      });
    } else {
      const customer: Customer = {
        ...this.form.value,
        avatarFileId: this.customer.avatarFileId,
      };
      if (this.action === this.ROUTER_ACTIONS.update) {
        this.update(customer);
      } else {
        this.create(customer);
      }
    }
  }

  private create(customer: ICustomer): void {
    console.log(customer);
    this.customerService.create(customer).subscribe((res: any) => {
      this.toast.success('model.customer.success.create');
      this.closeModal(res.body.data);
    });
  }

  private update(customer: ICustomer): void {
    this.customerService
      .update(customer, this.customer.id || '')
      .subscribe((res: any) => {
        this.toast.success('model.customer.success.update');
        this.closeModal(res.body.data);
      });
  }

  private closeModal(customer: ICustomer): void {
    this.modalRef.close({
      success: true,
      value: customer,
    });
  }
  enterDatePicker(event: any): void {
    const date = event?.target?.value;
    if (CommonUtil.newDate(date).toString() === 'Invalid Date') {
      this.form.controls.dayOfBirth.setValue(
        this.form.controls.dayOfBirth.value
      );
      this.datePicker.close();
    } else if (!this.disabledAfterToday(CommonUtil.newDate(date))) {
      this.form.controls.dayOfBirth.setValue(CommonUtil.newDate(date));
      this.datePicker.close();
    } else {
      this.form.controls.dayOfBirth.setValue(
        this.form.controls.dayOfBirth.value
      );
      this.datePicker.close();
    }
  }
  disabledAfterToday(current: Date): boolean {
    return differenceInCalendarDays(current, new Date()) > 0;
  }

  getFiles(files: any): void {
    if (files) {
      this.file = files[0];
      this.getBase64(files[0]).then((data) => {
        this.customer.avatarFileId = data as string;
        // this.imageUrl = data;
      });
    }
  }

  getBase64(image: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
