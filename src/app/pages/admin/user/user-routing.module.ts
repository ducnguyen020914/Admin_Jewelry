import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import {UserComponent} from "@pages/admin/user/user.component";
import {UpdateUserComponent} from "@pages/admin/user/update-user/update-user.component";
import {CustomerListComponent} from "@pages/admin/user/customer/customer-list/customer-list.component";
import {CustomerDetailsComponent} from "@pages/admin/user/customer/customer-details/customer-details.component";
import {CustomerUpdateComponent} from "@pages/admin/user/customer/customer-update/customer-update.component";
import {EmployeeListComponent} from "@pages/admin/user/employee/employee-list/employee-list.component";

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
        path: ROUTER_UTILS.user.employee,
        component: EmployeeListComponent,
        data: {
          title: 'model.user.employee',
       }
    },
    {
      path: ROUTER_UTILS.customer.root,
      component: CustomerListComponent,
      data: {
        title: 'model.customer.title',
      },
    },
    {
      path: ROUTER_UTILS.customer.detail,
      component: CustomerDetailsComponent,
      data: {
        title: 'model.customer.title',
      },
    },
    {
      path: ROUTER_UTILS.customer.update,
      component: CustomerUpdateComponent,
      data: {
        title: 'model.customer.title',
      },
    },
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class UserRoutingModule {}
