import { Component, OnInit } from '@angular/core';
import {FormGroup, UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { STATUS_ACTIVE } from '@shared/constants/common.constant';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { FileService } from '@shared/services/file.service';
import CommonUtil from '@shared/utils/common-utils';
import {RegisterStatus} from '@shared/constants/guest-registraition.constants';
import {LENGTH_VALIDATOR} from '@shared/constants/validators.constant';
import * as moment from 'moment';
import {AVATAR_PLACEHOLDER_FILE} from "@shared/constants/images.contrant";
import {Customer, ICustomer} from "@shared/models/customer.model";
import {CustomerService} from "@shared/services/customer.service";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  form: UntypedFormGroup = new UntypedFormGroup({});
  formSearch: UntypedFormGroup = new UntypedFormGroup({});
  customer: ICustomer = new Customer();
  registerStatus = RegisterStatus;
  customerId = '';
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
    private customerService: CustomerService,
    private fileService: FileService,
    private translateService: TranslateService,
  ) {
    this.router.paramMap.subscribe((res) => {
      this.customerId = res.get('id') || '';
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
      name: this.customer.fullName,
      email: this.customer.email,
      phoneNumber: this.customer.phoneNumber,
      dayOfBirth: this.customer.dayOfBirth,
      gender: this.customer.gender,
      avatarFileId: this.customer.avatarFileId,
      avatarFileUrl: this.customer.avatarFileUrl,
    });
  }

  getProfile(): void {
    this.customerService.findById(this.customerId, true).subscribe((res: any) => {
      this.getContactQRCode(res.body?.data);
      this.customer = res.body?.data;
      console.log(this.customer);
      if (this.customer?.avatarFileUrl) {
        this.imageUrl = this.fileService.getFileResource(
          this.customer.avatarFileUrl
        );
      }
      this.initForm();
    });
  }

  getContactQRCode(customer: ICustomer): void {
    // Properties available in vCard version 3.0 are listed below. They have to be separated through line breaks.
    // Properties can be defined in any order (except BEGIN, END, VERSION).
    const name =
      // (customer.companyCode ? customer.companyCode?.toUpperCase() + ' ' : '') +
      customer.fullName ? customer.fullName?.toUpperCase() : 'USER';
    this.vCardData =
      `BEGIN:VCARD` +
      `\nN:${name}` +
      `\nTEL;TYPE=work,VOICE:${customer.phoneNumber}` +
      `\nEMAIL:${customer.email}` +
      `\nBDAY:${customer.dayOfBirth}` +
      `\nVERSION:3.0\nEND:VCARD`;
  }

  onChangeTab(tabIndex: number): any {
    this.tabIndex = tabIndex;
  }


}
