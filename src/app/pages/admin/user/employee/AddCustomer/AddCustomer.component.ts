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
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {ToastService} from "@shared/services/helpers/toast.service";
import {LENGTH_VALIDATOR, VALIDATORS} from "@shared/constants/validators.constant";
import CommonUtil from "@shared/utils/common-utils";
import {differenceInCalendarDays} from "date-fns";
import {ROUTER_ACTIONS} from "@shared/utils/router.utils";
import { DEFAULT_DATE_FORMAT } from '@shared/constants/common.constant';
import { ICustomer, Customer } from '../../../../../shared/models/customer.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { CountryService } from '../../../../../shared/services/country.service';
import { error } from 'console';


@Component({
  selector: 'app-AddCustomer',
  templateUrl: './AddCustomer.component.html',
  styleUrls: ['./AddCustomer.component.css']
})
export class AddCustomerComponent implements OnInit {
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
  province:any[] = [];
  distrist:any[] = [];
  ward:any[] = [];
  idDistrict:number = -1;
  idWard:number = -1;
  addresses:string[] = [];
  constructor(
    private fb: UntypedFormBuilder,
    private translateService: TranslateService,
    private employeeService: EmployeeService,
    private modalRef: NzModalRef,
    private toast: ToastService,
    private fileService: FileService,
    private storage: AngularFireStorage,
    private countryService:CountryService,
    private modalService: NzModalService
  ) {
  }

  ngOnInit(): void {
    this.countryService.province().subscribe((res:any)=>{
      this.province = res.data;
      this.initForm();
    })
    
    this.initForm();
  }
  initForm(): void {
    const dataObject =
      this.action === this.ROUTER_ACTIONS.create
        ? this.initalState
        : this.employee;
     this.addresses = dataObject.address?.split(", ") as string[]; 
    let addressDetail = '';
   if( this.addresses ){
    this.addresses .forEach((data,index) =>{
      if(index <  this.addresses .length-3 ) {
         addressDetail = addressDetail + data;
      }
    })
   }

    this.form = this.fb.group({
      // userName: [
      //   dataObject.userName || "",
      //   [
      //     Validators.required,
      //   ],
      // ],
      // password: [
      //   dataObject.password || "",
      //   [
      //     Validators.required,
      //   ],
      // ],
      // confirmPassword: [
      //   dataObject.password,
      //   [
      //     Validators.required,
      //   ],
      // ],
      cccd: [
        dataObject.cccd,
        [
          Validators.required,
          Validators.maxLength(14),
          Validators.pattern(VALIDATORS.CCCD)
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
          Validators.minLength(10),
          Validators.maxLength(LENGTH_VALIDATOR.PHONE_MAX_LENGTH.MAX),
          Validators.pattern(VALIDATORS.PHONE_SIMPLE),
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
        [ Validators.required,Validators.maxLength(LENGTH_VALIDATOR.GENDER_MAX_LENGTH.MAX)],
      ],
      province: [
        this.getCodeProvince( this.addresses  ?   this.addresses [ this.addresses .length - 1] : '' ) ,
        [
          Validators.required,
        ],
      ],
      district: [
        ,
        [
          Validators.required,
        ],
      ],
      ward: [
        ,
        [
          Validators.required,
        ],
      ],
      addressDetail: [
        addressDetail,
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

  getDistrist(provinceID:number){
    const params = {
      province_id:provinceID
    }
    this.countryService.distrist(params).subscribe((res:any) =>{
      this.distrist = res.data;
      this.form.get('district')?.setValue(this.getCodeDistrcit(this.addresses  ?   this.addresses [ this.addresses .length - 2] : '' ))
    })
  }
  getWard(districtId:number){
    this.countryService.ward(districtId).subscribe((res:any) =>{
      this.ward = res.data;
      this.form.get('ward')?.setValue(this.getCodeWard(this.addresses  ?   this.addresses [ this.addresses .length - 3] : '' ))
      
    })
  }
  getStringWard(){
    const ward = this.form.get('ward')?.value;
    let data2 = '';
    this.ward.forEach((data) => {
      const w= data.WardCode as string;
      if(w === ward){
        data2 =  data.WardName;
      }
    });
    return data2;
  }
  getCodeWard(param:string):string{
    let data2 = '';
    this.ward.forEach((data) => {
      
      if(data.WardName === param){
        data2 =  data.WardCode;
      }
    });
    return data2;
  }
  getStringDistrcit():string{
    const district = this.form.get('district')?.value;
    let data2 = '';
    this.distrist.forEach((data) => {
      if(data.DistrictID === district){
        data2 =  data.DistrictName;
      }
    });
    return data2;
  }
  getCodeDistrcit(param:string):number{
    let data2 = -1;
    this.distrist.forEach((data) => {
      if(data.DistrictName === param){
        data2 =  data.DistrictID;
      }
    });
    return data2;
  }
  getStringpProvince():string{
    const province = this.form.get('province')?.value;
    let data2 = '';
    this.province.forEach((data) => {
      if(data.ProvinceID === province){
        data2 =  data.ProvinceName;
      }
    });
    return data2;
  }
  getCodeProvince(param:string):number{
    console.log(param);
    let data2 = -1;
    this.province.forEach((data) => {
      if(data.ProvinceName === param){
        data2 =  data.ProvinceID;
        this.getDistrist(data2);  
      }
    });
    return data2;
  }
   onSubmit(): void {
    console.log(this.form.value);
    console.log(this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince());
        const customer:ICustomer = {
          ...this.form.value,
          note:"note",
          role:"CUSTOMER",
          imageUrl:this.imageUrl ? this.imageUrl :null,
          address:this.form.get('addressDetail')?.value +", " +this.getStringWard()+", " + this.getStringDistrcit() +", " + this.getStringpProvince()
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
    const form = CommonUtil.modalConfirm(
      this.translateService,
      'model.user.addProductOrderTitle',
      'model.user.addProductOrderContent'
    );
    const modal = this.modalService.create(form);
    
    modal.afterClose.subscribe((result: { success: boolean }) => {
      if (result.success) {
        this.employeeService.createCustomer(employee).subscribe((res: any) => {
          this.toast.success('Thêm Khách hàng thành công');
          this.closeModal(res.body.data);
        },(error)=> {
          this.toast.error(error.error.message)
        });
      }
    });
   
  }

  private update(employee: IEmployee): void {
    this.employeeService.update(employee,this.employee.userId).subscribe((res: any) => {
      this.toast.success('Cập nhật khách hàng thành công');
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
  disabledAfterToday(current: Date): boolean {
    const year = new Date();
    year.setFullYear(year.getFullYear() - 18);
    return current > year;
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
      if(!image){
        this.toast.error("Chỉ chọn được ảnh")
        return;
      }
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => {reject(error),this.toast.error("Chỉ chọn được ảnh")};
    });
  }

}
