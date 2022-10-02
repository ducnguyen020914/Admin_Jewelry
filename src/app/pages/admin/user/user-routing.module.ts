import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from "./employee/employee.component";

const routes = [
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