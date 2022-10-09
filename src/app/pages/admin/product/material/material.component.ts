import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialSearchRequest } from '../../../../shared/models/request/material-search-request.model';
import { Material } from '../../../../shared/models/material.model';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import CommonUtil from '../../../../shared/utils/common-utils';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  pathTranslate = 'model.material.';
  form:FormGroup = new FormGroup([]);
  materialSearchRequest:MaterialSearchRequest = {};
  categories:Material[] = [];
  isVisible = false;
  total = 0;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(private translateService: TranslateService,
    private modalService:NzModalService) { }
  
  ngOnInit() {
    this.loadDataCategory();
  }
  loadDataCategory(){

  }

  getTranslate(str: string): string {
    return this.translateService.instant(this.pathTranslate + '' + str);
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.materialSearchRequest.pageIndex,
      this.materialSearchRequest.pageSize
    );
  }
  onSearch(){};
  resetSearch(){};
  onQueryParamsChange(event:any){}
  onQuerySearch(event:any){};
  onLockAndUnLock(event:any){};
  create(): void {
    // const base = CommonUtil.modalBase(
    //   UpdateCategoryComponent,
    //   {
    //     action: ROUTER_ACTIONS.create,
    //   },
    //   '40%'
    // );
    // const modal: NzModalRef = this.modalService.create(base);
    // modal.afterClose.subscribe((result) => {
    //   if (result && result?.success) {
    //     this.loadDataCategory();
    //   }
    // });
  }

}
