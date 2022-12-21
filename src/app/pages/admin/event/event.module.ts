import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EventRoutingModule } from './event-routing.module';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { EventComponent } from './event.component';

@NgModule({
  declarations: [
  EventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EventRoutingModule,
    NzTransferModule,
    NzDatePickerModule,
    NzSliderModule,
    NzTagModule,
    NzAutocompleteModule,
  ],
  providers: []
})
export class EventModule {
}
