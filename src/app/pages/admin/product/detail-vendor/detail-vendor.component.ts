import { Component, OnInit,Input } from '@angular/core';
import { Vendor, IVendor } from '../../../../shared/models/vendor.model';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-detail-vendor',
  templateUrl: './detail-vendor.component.html',
  styleUrls: ['./detail-vendor.component.css']
})
export class DetailVendorComponent implements OnInit {
  @Input() action = ''
  @Input() vendor: IVendor = new Vendor();
  constructor(private modalRef: NzModalRef) { }

  ngOnInit() {
    console.log(this.vendor);
    
  }
  onCancel(): void {
    this.modalRef.close({
      success: false,
      data: null,
    });
  }
}
