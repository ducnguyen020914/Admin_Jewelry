import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { ApoimentComponent } from './apoiment.component';
import { ApoimentRoutingModule } from './apoiment-routing.module';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { CreateUpdateApoimentComponent } from './create-update-apoiment/create-update-apoiment.component';

@NgModule({
  declarations: [
    ApoimentComponent,
    CreateUpdateApoimentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QRCodeModule,
    ApoimentRoutingModule,
    NzTransferModule,
    NzDatePickerModule,
    NzSliderModule,
    NzTagModule,
    NzAutocompleteModule,
  ],
  providers: []
})
export class ApoimentModule {
}
