import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { ROUTER_UTILS } from '../../../shared/utils/router.utils';
import { StatisticalComponent } from './statistical.component';
import { StatisticalTopComponent } from './statistical-top/statistical-top.component';

const routes = [
    {
        path: ROUTER_UTILS.statistical.statisticaldoanhthu,
        component: StatisticalComponent,
        data: {
          title: 'model.statistical.statistical',
       }
    },
    {
      path: ROUTER_UTILS.statistical.statisticalTop,
      component: StatisticalTopComponent,
      data: {
        title: 'model.statistical.statistical',
     }
  }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class StatisticalRoutingModule {}