import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Employee, IEmployee} from "@shared/models/employee.model";
import {RegisterStatus} from "@shared/constants/guest-registraition.constants";
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "@shared/services/employee.service";
// import {FileService} from "@shared/services/file.service";
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
import { ICustomer, Customer } from '../../../../../shared/models/customer.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Role } from '@shared/models/request/employee-request.model';
import { CountryService } from '../../../../../shared/services/country.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update1.component.html',
  styleUrls: ['./employee-update1.component.scss']
})
export class EmployeeUpdateComponent1 implements OnInit {
  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;
  @Input() employee: ICustomer = new Customer();
  @Input() action = '';
  isUpdate = false;
  employeeGender = USER_GENDER;
  form: UntypedFormGroup = new UntypedFormGroup({});
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  ROUTER_ACTIONS = ROUTER_ACTIONS;
  initalState: ICustomer ={};
  imageUrl?: any;
  file?: File;
  avatarPlaceHolder = AVATAR_PLACEHOLDER_FILE;
  isVisible = false;
  birthday = moment().toDate();
  DEFAULT_DATE_FORMAT = DEFAULT_DATE_FORMAT;
  foodPlaceholder =  `assets/images/icon/fast-food.png`;
  dowloadUrl:any;
  constructor(
    private fb: UntypedFormBuilder,
    private translate: TranslateService,
    private employeeService: EmployeeService,
    private modalRef: NzModalRef,
     private toast: ToastService,
    // private fileService: FileService,
    private storage: AngularFireStorage,
    private countryService:CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.province().subscribe((res:any)=>{
      console.log(res);
      
    })
    this.initForm();
    console.log(this.employee);
    
  }
  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.employee;
    this.form = this.fb.group({
      userName: [
        dataObject.userName || "",
        [
          Validators.required,
        ],
      ],
      password: [
        dataObject.password,
        [
          Validators.required,
        ],
      ],
      confirmPassword: [
        dataObject.password,
        [
          Validators.required,
        ],
      ],
      cccd: [
        dataObject.cccd,
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.pattern(VALIDATORS.CCCD),
        ],
      ],
      fullName: [
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
      birthday: [
        // this.action === this.ROUTER_ACTIONS.update ? new Date(this.employee.birthday as Date) : '',
        dataObject.birthday,
        [ Validators.required,Validators.maxLength(LENGTH_VALIDATOR.BIRTH_MAX_LENGTH.MAX)],
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

  disabledAfterToday(current: Date): boolean {
    const year = new Date();
    year.setFullYear(year.getFullYear() - 18);
    return current > year;
  }
  private onSubmit(): void {
        const customer:ICustomer = {
          ...this.form.value,
          note:"note",
          role:Role.EMPLOYEE,
          imageUrl:this.imageUrl ? this.imageUrl :null
        }
        console.log(customer);
        
        if (this.form.get('birthday')?.value) {
          customer.birthday = moment(customer.birthday).format('yyyy-MM-DD');
        }
        if (this.action === this.ROUTER_ACTIONS.update) {
          this.update(customer);
        } else {
          this.create(customer);
        }
  }

  private create(employee: ICustomer): void {;
    this.employeeService.create(employee).subscribe((res: any) => {
      this.toast.success('Thêm nhân viên thành công');
      this.closeModal(res.body.data);
    },(error)=> {
      this.toast.error(error.error.message)
    });
  }

  private update(employee: IEmployee): void {
    this.employeeService.update(employee,this.employee.userId).subscribe((res: any) => {
      this.toast.success('Cập nhật nhân viên thành công');
      this.closeModal(res.body.data);
    },(error)=> {
      this.toast.error(error.error.message)
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
      this.form.controls.birthday.setValue(
        this.form.controls.birthday.value
      );
      this.datePicker.close();
    } else if (!this.disabledAfterToday(CommonUtil.newDate(date))) {
      this.form.controls.birthday.setValue(CommonUtil.newDate(date));
      this.datePicker.close();
    } else {
      this.form.controls.birthday.setValue(
        this.form.controls.birthday.value
      );
      this.datePicker.close();
    }
  }

  getFiles(files: any): void {
    if (files) {
      this.file = files[0];
      this.getBase64(files[0]).then((data) => {
        this.employee.imageUrl = data as string;
      });
      const n = Date.now();
      const filePath = `User/${this.file?.name}_${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.dowloadUrl = fileRef.getDownloadURL();
            this.dowloadUrl.subscribe((url:any) => {
              this.imageUrl = url;
            });
          })
        )
        .subscribe((url) => {
          if (url) {
            console.log(url);
          }
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
