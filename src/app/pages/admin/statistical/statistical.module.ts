import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalComponent } from './statistical.component';
import { StatisticalRoutingModule } from './statistical-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  imports: [
    CommonModule,
    StatisticalRoutingModule,
    SharedModule,
    NzTransferModule,
    NzDatePickerModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),

  ],
  declarations: [StatisticalComponent],
})
export class StatisticalModule { }
