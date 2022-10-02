import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { StatisticalComponent } from './statistical.component';

const routes = [
    {
        path: ROUTER_UTILS.statistical.root,
        component: StatisticalComponent,
        data: {
          title: 'model.statistical.statistical',
       }
    },
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class StatisticalRoutingModule {}