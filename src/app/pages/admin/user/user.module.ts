import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {UserComponent} from "@pages/admin/user/user.component";
@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NzAlertModule,
    NzAvatarModule,

  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SettingModule {}
