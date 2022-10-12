import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MaterialSearchRequest, MaterialStatus } from '../../../../shared/models/request/material-search-request.model';
import { Material } from '../../../../shared/models/material.model';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import CommonUtil from '../../../../shared/utils/common-utils';
import { LENGTH_VALIDATOR } from '@shared/constants/validators.constant';
import { MATERIAL_TYPE, MATERIAL_STATUS } from '../../../../shared/constants/material.constant';
import { NzMarks } from 'ng-zorro-antd/slider';
import { PAGINATION } from '@shared/constants/pagination.constants';
import { MaterialService } from '../../../../shared/services/product/material.service';
import { UpdateMaterialComponent } from '../update-material/update-material.component';
import { ROUTER_ACTIONS, ROUTER_UTILS } from '../../../../shared/utils/router.utils';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { ToastService } from '../../../../shared/services/helpers/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  pathTranslate = 'model.material.';
  form:FormGroup = new FormGroup([]);
  materialSearchRequest: MaterialSearchRequest ={};
 pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  materials:Material[] = [];
  marks: NzMarks = {
    0: '0đ',
    20000000: '20.000.000đ',
    40000000: '40.000.000đ',
    60000000: '60.000.000đ',
    80000000: '80.000.000đ',
    100000000: '100.000.000đ',
  };
  isVisible = false;
  isCallFirstRequest = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  MATERIAL_TYPE = MATERIAL_TYPE;
  MATERIAL_STATUS = MATERIAL_STATUS;
  minPrice = 0;
  maxPrice = 100000000;
  total = 0;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(private translateService: TranslateService,
    private modalService:NzModalService,
    private fb:FormBuilder,
    private materialService:MaterialService,
    private toast:ToastService,
    private  route:Router) { }
  
  ngOnInit() {
    this.initForm();
    this.loadData(this.pageIndex,this.pageSize);
  }
  loadData(pageIndex:number,pageSize:number,sortBy?:string){
    this.materialSearchRequest.pageIndex = pageIndex;
    this.materialSearchRequest.pageSize = pageSize;
    this.materialSearchRequest.sortBy = sortBy;
    this.materialService.search(this.materialSearchRequest).subscribe((res:any) => {
      console.log(res);
      this.materials = res.body?.data;
      this.total = res.body?.page.total;
      
    })
  }
  initForm(): void {
    this.form = this.fb.group({
      status: [this.materialSearchRequest.status || ''],
      type: '',
      rangePrice: [[this.minPrice, this.maxPrice], []],
      startPrice: [this.materialSearchRequest.startPrice || this.minPrice],
      endPrice: [this.materialSearchRequest.endPrice || this.maxPrice],
      keyword: [this.materialSearchRequest.keyword || null],
      categoryId: '',
    });
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
  onSearch(){
    this.materialSearchRequest.status =
    this.form.get('status')?.value;
    this.materialSearchRequest.keyword =
    this.form.get('keyword')?.value;
  this.materialSearchRequest.type = this.form.get('type')?.value;
  this.materialSearchRequest.startPrice =
    this.form.get('startPrice')?.value;
  this.materialSearchRequest.endPrice =
    this.form.get('endPrice')?.value;
    this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT)
    
  };
  resetSearch(){
    this.form.get('status')?.setValue(null);
    this.form.get('keyword')?.setValue(null);
    this.form.get('startPrice')?.setValue(this.minPrice);
    this.form.get('endPrice')?.setValue(this.maxPrice);
    this.form.get('type')?.setValue(null);
    this.form.get('rangePrice')?.setValue([this.minPrice, this.maxPrice]);
    this.onSearch();
  };
  onQueryParamsChange(params: NzTableQueryParams): void {
    if (this.isCallFirstRequest) {
      this.isCallFirstRequest = false;
      return;
    }
    const { sort, filter } = params;
    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    let sortBy = '';
    if (sortField && sortOrder) {
      sortBy = `${sortField}.${sortOrder === 'ascend' ? 'asc' : 'desc'}`;
    }
    this.loadData(this.pageIndex, this.pageSize, sortBy);
  }
  format(value: any, type: string): any {
    if (value && type === 'status') {
      return this.translateService.instant(
        ['common', value.toLowerCase()].join('.')
      );
    }
  }
  onQuerySearch(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }
  create(): void {
    const base = CommonUtil.modalBase(
      UpdateMaterialComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '50%'
    );

    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result?.success) {
        this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
      }
    });
  }
  formatterPrice = (value: number): string =>
  CommonUtil.moneyFormat(value + '') + ' đ';
parserPrice = (value: string): number => CommonUtil.formatToNumber(value);
onChangeRangePrice(): void {
  this.form
    .get('startPrice')
    ?.setValue(this.form.get('rangePrice')?.value[0]);
  this.form
    .get('endPrice')
    ?.setValue(this.form.get('rangePrice')?.value[1]);
}
update(material:Material): void {
  const base = CommonUtil.modalBase(
    UpdateMaterialComponent,
    {
      isUpdate: true,
      material,
    },
    '40%'
  );
  const modal: NzModalRef = this.modalService.create(base);
  modal.afterClose.subscribe((result) => {
    if (result && result?.success) {
      this.loadData(PAGINATION.PAGE_DEFAULT,PAGINATION.SIZE_DEFAULT);
    }
  });
}
lock(material:Material ): void {
  this.isVisible = true;
  if (material.status === 'ACTIVE' ) {
    this.lockPopup = {
      title: 'model.material.lockTitle',
      content: 'model.material.lockContent',
      interpolateParams: { name: material.materialName },
      okText: 'action.lock',
      callBack: () => {
        if (material.materialId) {
          this.materialService
            .lock(material.materialId)
            .subscribe((next) => {
              this.toast.success('model.category.lockSuccess');
              material.status = MaterialStatus.INACTIVE;
            });
        }
      },
    };
  } else {
    this.lockPopup = {
      title: 'model.material.unlockTitle',
      content: 'model.material.unlockCategoryContent',
      interpolateParams: { name: material.materialName },
      okText: 'action.unlock',
      callBack: () => {
        if (material.materialId) {
          this.materialService
            .unlock(material.materialId)
            .subscribe((next) => {
              this.toast.success('model.material.unlockSuccess');
              material.status = MaterialStatus.ACTIVE;
            });
        }
      },
    };
  }
}

onLockAndUnLock(result: { success: boolean }): void {
  this.lockPopup.callBack = () => {};
  this.isVisible = false;
}
detail(material:Material): void {
  this.route.navigate([
    ROUTER_UTILS.product.root,
    ROUTER_UTILS.product.material,
    material.materialId,
    ROUTER_ACTIONS.detail,
  ]);
}

}
