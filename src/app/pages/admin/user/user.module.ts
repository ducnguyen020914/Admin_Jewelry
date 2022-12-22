import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {UserComponent} from "@pages/admin/user/user.component";
import { UserRoutingModule } from './user-routing.module';
import {UpdateUserComponent} from "@pages/admin/user/update-user/update-user.component";
import {CustomerListComponent} from "@pages/admin/user/customer/customer-list/customer-list.component";
import {CustomerUpdateComponent} from "@pages/admin/user/customer/customer-update/customer-update.component";
import {CustomerDetailsComponent} from "@pages/admin/user/customer/customer-details/customer-details.component";
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeUpdateComponent } from './employee/employee-update/employee-update.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EmployeeUpdateComponent1 } from './employee/employee-update1/employee-update1.component';
import { AddCustomerComponent } from './employee/AddCustomer/AddCustomer.component';
@NgModule({
  declarations: [
    UserComponent,
    UpdateUserComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDetailsComponent,
    EmployeeListComponent,
    EmployeeUpdateComponent,
    EmployeeDetailsComponent,
    EmployeeUpdateComponent1,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzAlertModule,
    NzDatePickerModule,
    NzAvatarModule,
    UserRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
