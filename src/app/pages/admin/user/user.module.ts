import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {UserComponent} from "@pages/admin/user/user.component";
import { EmployeeComponent } from './employee/employee.component';
import { UserRoutingModule } from './user-routing.module';
import {UpdateUserComponent} from "@pages/admin/user/update-user/update-user.component";
import {CustomerListComponent} from "@pages/admin/user/customer/customer-list/customer-list.component";
import {CustomerUpdateComponent} from "@pages/admin/user/customer/customer-update/customer-update.component";
import {CustomerDetailsComponent} from "@pages/admin/user/customer/customer-details/customer-details.component";
@NgModule({
  declarations: [
    UserComponent,
    EmployeeComponent,
    UpdateUserComponent,
    CustomerListComponent,
    CustomerUpdateComponent,
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzAlertModule,
    NzAvatarModule,
    UserRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
