import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from "./employee/employee.component";
import {UserComponent} from "@pages/admin/user/user.component";
import {UpdateUserComponent} from "@pages/admin/user/update-user/update-user.component";

const routes = [
    {
      path: ROUTER_UTILS.user.list,
      component: UserComponent,
      data: {
        title: 'model.user.user',
      }
    },
    {
      path: ROUTER_UTILS.user.userCreate,
      component: UpdateUserComponent,
      data: {
        title: 'model.user.title',
        },
    },
    {
        path: ROUTER_UTILS.user.customer,
        component: CustomerComponent,
        data: {
          title: 'model.user.customer',
       }
    },
    {
        path: ROUTER_UTILS.user.employee,
        component: EmployeeComponent,
        data: {
          title: 'model.user.employee',
       }
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UserRoutingModule {}
