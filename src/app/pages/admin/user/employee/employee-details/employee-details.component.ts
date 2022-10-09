import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Employee, IEmployee} from "@shared/models/employee.model";
import {RegisterStatus} from "@shared/constants/guest-registraition.constants";
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "@shared/services/employee.service";
import {FileService} from "@shared/services/file.service";
import {TranslateService} from "@ngx-translate/core";
import {LENGTH_VALIDATOR} from "@shared/constants/validators.constant";
import { STATUS_ACTIVE } from '@shared/constants/common.constant';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  form: UntypedFormGroup = new UntypedFormGroup({});
  formSearch: UntypedFormGroup = new UntypedFormGroup({});
  employee: IEmployee = new Employee();
  registerStatus = RegisterStatus;
  employeeId = '';
  imageUrl?: any;
  STATUS_ACTIVE = STATUS_ACTIVE;
  OTHER = 'OTHER';
  vCardData = '';
  files: [] | any;
  tabIndex = 0;
  total = 0;
  keyword = '';
  tabIndexAvatar = 0;
  INFO = {
    GENERAL: 0,
    WORK: 1,
  };
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  avatarPlaceHolder = AVATAR_PLACEHOLDER_FILE;
  curentDate: Date = new Date();

  constructor(
    private fb: UntypedFormBuilder,
    private router: ActivatedRoute,
    private employeeService: EmployeeService,
    private fileService: FileService,
    private translateService: TranslateService,
  ) {
    this.router.paramMap.subscribe((res) => {
      this.employeeId = res.get('id') || '';
    });
  }

  ngOnInit() {
    this.getProfile();
    this.initForm();
  }


  lastWeek(): Date {
    const date = this.curentDate;
    date.setDate(this.curentDate.getDate() - 7);
    return date;
  }

  initForm() {
    this.form = this.fb.group({
      name: this.employee.fullName,
      email: this.employee.email,
      phoneNumber: this.employee.phoneNumber,
      dayOfBirth: this.employee.dayOfBirth,
      gender: this.employee.gender,
      avatarFileId: this.employee.avatarFileId,
      avatarFileUrl: this.employee.avatarFileUrl,
    });
  }

  getProfile(): void {
    this.employeeService.findById(this.employeeId, true).subscribe((res: any) => {
      this.getContactQRCode(res.body?.data);
      this.employee = res.body?.data;
      console.log(this.employee);
      if (this.employee?.avatarFileUrl) {
        this.imageUrl = this.fileService.getFileResource(
          this.employee.avatarFileUrl
        );
      }
      this.initForm();
    });
  }

  getContactQRCode(employee: IEmployee): void {
    // Properties available in vCard version 3.0 are listed below. They have to be separated through line breaks.
    // Properties can be defined in any order (except BEGIN, END, VERSION).
    const name =
      // (employee.companyCode ? employee.companyCode?.toUpperCase() + ' ' : '') +
      employee.fullName ? employee.fullName?.toUpperCase() : 'USER';
    this.vCardData =
      `BEGIN:VCARD` +
      `\nN:${name}` +
      `\nTEL;TYPE=work,VOICE:${employee.phoneNumber}` +
      `\nEMAIL:${employee.email}` +
      `\nBDAY:${employee.dayOfBirth}` +
      `\nVERSION:3.0\nEND:VCARD`;
  }

  onChangeTab(tabIndex: number): any {
    this.tabIndex = tabIndex;
  }

}
