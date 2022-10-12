import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Employee, IEmployee} from "@shared/models/employee.model";
import {RegisterStatus} from "@shared/constants/guest-registraition.constants";
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "@shared/services/employee.service";
import {FileService} from "@shared/services/file.service";
import {TranslateService} from "@ngx-translate/core";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {USER_GENDER} from "@shared/constants/user.constant";
import * as moment from "moment";
import {NzModalRef} from "ng-zorro-antd/modal";
import {ToastService} from "@shared/services/helpers/toast.service";
import {LENGTH_VALIDATOR, VALIDATORS} from "@shared/constants/validators.constant";
import CommonUtil from "@shared/utils/common-utils";
import {differenceInCalendarDays} from "date-fns";
import {ROUTER_ACTIONS} from "@shared/utils/router.utils";
import { DEFAULT_DATE_FORMAT } from '@shared/constants/common.constant';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss']
})
export class EmployeeUpdateComponent implements OnInit {
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;
  @Input() employee: IEmployee = new Employee();
  @Input() action = '';
  isUpdate = false;
  employeeGender = USER_GENDER;
  form: UntypedFormGroup = new UntypedFormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  initalState: IEmployee = new Employee('', '', '');
  imageUrl?: any;
  file?: File;
  avatarPlaceHolder = AVATAR_PLACEHOLDER_FILE;
  isVisible = false;
  dayOfBirth = moment().toDate();
  DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
  constructor(
    private fb: UntypedFormBuilder,
    private translate: TranslateService,
    private employeeService: EmployeeService,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    if (this.employee.id) {
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
    console.log(this.employee);
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.employee;
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
        // this.action === this.ROUTER_ACTIONS.update ? new Date(this.employee.dayOfBirth as Date) : '',
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
        const employee: Employee = {
          ...this.form.value,
          avatarFileId: file.id,
        };
        if (this.form.get('dayOfBirth')?.value) {
          employee.dayOfBirth = moment(employee.dayOfBirth).format('yyyy-MM-DD');
        }
        if (this.action === this.ROUTER_ACTIONS.update) {
          this.update(employee);
        } else {
          this.create(employee);
        }
      });
    } else {
      const employee: Employee = {
        ...this.form.value,
        avatarFileId: this.employee.avatarFileId,
      };
      if (this.action === this.ROUTER_ACTIONS.update) {
        this.update(employee);
      } else {
        this.create(employee);
      }
    }
  }

  private create(employee: IEmployee): void {
    console.log(employee);
    this.employeeService.create(employee).subscribe((res: any) => {
      this.toast.success('model.employee.success.create');
      this.closeModal(res.body.data);
    });
  }

  private update(employee: IEmployee): void {
    this.employeeService
      .update(employee, this.employee.id || '')
      .subscribe((res: any) => {
        this.toast.success('model.employee.success.update');
        this.closeModal(res.body.data);
      });
  }

  private closeModal(employee: IEmployee): void {
    this.modalRef.close({
      success: true,
      value: employee,
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
        this.employee.avatarFileId = data as string;
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
