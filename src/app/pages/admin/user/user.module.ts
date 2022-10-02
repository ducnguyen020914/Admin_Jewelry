import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {UserComponent} from "@pages/admin/user/user.component";
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserRoutingModule } from './user-routing.module';
@NgModule({
  declarations: [
    UserComponent,
    CustomerComponent,
    EmployeeComponent
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
