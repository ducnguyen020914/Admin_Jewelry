import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  AccessorySearchRequest,
  AccessoryStatus
} from '../../../../shared/models/request/accessory-search-request.model';
import {TranslateService} from '@ngx-translate/core';
import {Accessory, IAccessory} from '@shared/models/accesory.model';
import {ACCESSORY_STATUS} from "@shared/constants/accsessory.constant";
import {PAGINATION} from "@shared/constants/pagination.constants";
import {NzMarks} from "ng-zorro-antd/slider";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {ToastService} from "@shared/services/helpers/toast.service";
import {Router} from "@angular/router";
import {AccessoryService} from "@shared/services/product/accessory.service";
import {LENGTH_VALIDATOR} from "@shared/constants/validators.constant";
import CommonUtil from "@shared/utils/common-utils";
import {UpdateAccessoryComponent} from "@pages/admin/product/update-accessory/update-accessory.component";
import {ROUTER_ACTIONS} from "@shared/utils/router.utils";
import {NzTableQueryParams} from "ng-zorro-antd/table";

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.css']
})
export class AccessoryComponent implements OnInit {
  accessoryStatus = ACCESSORY_STATUS;
  pathTranslate = 'model.category.';
  form:FormGroup = new FormGroup([]);
  accessorySearchRequest:AccessorySearchRequest = {};
  accsessories: Accessory[] = [];
  isVisible = false;
  total = 0;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  pageIndex = PAGINATION.PAGE_DEFAULT;
  pageSize = PAGINATION.SIZE_DEFAULT;
  marks: NzMarks = {
    0: '0đ',
    20000000: '20.000.000đ',
    40000000: '40.000.000đ',
    60000000: '60.000.000đ',
    80000000: '80.000.000đ',
    100000000: '100.000.000đ',
  };
  isCallFirstRequest = false;
  LENGTH_VALIDATOR = LENGTH_VALIDATOR;
  minPrice = 0;
  maxPrice = 100000000;
  constructor(private translateService: TranslateService,
              private modalService: NzModalService,
              private fb: FormBuilder,
              private accessoryService: AccessoryService,
              private toast: ToastService,
              private router: Router) { }

  ngOnInit() {
    this.initFormSearch();
    this.loadData(this.pageIndex,this.pageSize);
  }

  initFormSearch(): void {
    this.form = this.fb.group({
      status: [this.accessorySearchRequest.status || ''],
      rangePrice: [[this.minPrice, this.maxPrice], []],
      startPrice: [this.accessorySearchRequest.startPrice || this.minPrice],
      endPrice: [this.accessorySearchRequest.endPrice || this.maxPrice],
      keyword: [this.accessorySearchRequest.keyword || null],
    });
  }

  loadData(pageIndex:number,pageSize:number,sortBy?:string){
    this.accessorySearchRequest.pageIndex = pageIndex;
    this.accessorySearchRequest.pageSize = pageSize;
    this.accessorySearchRequest.sortBy = sortBy;
    this.accessoryService.search(this.accessorySearchRequest).subscribe((res:any) => {
      this.accsessories = res.body?.data;
      this.total = res.body?.page.total;
    })
  }

  getTranslate(str: string): string {
    return this.translateService.instant(this.pathTranslate + '' + str);
  }

  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.accessorySearchRequest.pageIndex,
      this.accessorySearchRequest.pageSize
    );
  }

  update(accessory: IAccessory){
    const base= CommonUtil.modalBase(
      UpdateAccessoryComponent,
      {
        isUpdate: true,
        accessory,
      },
      '60%'
    )
    const modal: NzModalRef =this.modalService.create(base);
    modal.afterClose.subscribe((result)=>{
      if(result && result?.success){
        this.loadData(this.pageIndex,this.pageSize);
      }
    })
  };
  detail(){};
  delete(accessory: IAccessory):void{
    const deleteForm =CommonUtil.modalConfirm(
      this.translateService,
      'model.accessory.deleteAccessory',
      'model.accessory.deleteContent',
      {name: accessory.name}
    )
    const modal: NzModalRef =this.modalService.create(deleteForm);
    modal.afterClose.subscribe((result: {success: boolean; data: any}) =>{
      if(result?.success){
        this.accessoryService.delete(accessory.accessoryId || '', accessory).subscribe((respone: any) =>{
          this.toast.success('model.accessory.success.delete');
          this.loadData(this.pageIndex, this.pageSize);
        });
      }
    });
  };

  create(): void {
    const base = CommonUtil.modalBase(
      UpdateAccessoryComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '60%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadData(this.pageIndex,this.pageSize);
      }
    });
  }

  lock(accessory: IAccessory){
    this.isVisible = true;
    if(accessory.status === AccessoryStatus.ACTIVE){
      this.lockPopup = {
        title: 'model.accessory.lockTitle',
        content: 'model.accessory.lockContent',
        interpolateParams: { name: accessory.name },
        okText: 'action.lock',
        callBack:()=>{
          if(accessory.accessoryId){
            this.accessoryService.inactive(accessory.accessoryId,accessory).
              subscribe(()=>{
                this.toast.success('model.accessory.lockSuccess');
                accessory.status =AccessoryStatus.INACTIVE;
            })
          }
        }
      }
    }else {
      this.lockPopup = {
        title: 'model.accessory.unlockTitle',
        content: 'model.accessory.unlockContent',
        interpolateParams: { name: accessory.name },
        okText: 'action.unlock',
        callBack:()=>{
          if(accessory.accessoryId){
            this.accessoryService.active(accessory.accessoryId,accessory).
            subscribe(()=>{
              this.toast.success('model.accessory.uhlockSuccess');
              accessory.status =AccessoryStatus.ACTIVE;
            })
          }
        }
      }
    }
  };

  onLockAndUnLock(result: { success: boolean }): void {
    this.lockPopup.callBack = () => {};
    this.isVisible = false;
  }
  onSearch(): void {
    this.accessorySearchRequest.keyword =
      this.form.get('keyword')?.value;
    this.accessorySearchRequest.status = this.form.get('status')?.value;
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
  }
  resetSearch(){
    this.form.reset();
    this.accessorySearchRequest = {};
    this.pageIndex = PAGINATION.PAGE_DEFAULT;
    this.pageSize = PAGINATION.SIZE_DEFAULT;
    this.loadData(this.pageIndex, this.pageSize);
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

  onQuerySearch(event:any){};

  // getText(status: string): string {
  //   if(status === AccessoryStatus.ACTIVE){
  //     return this.translateService.instant(
  //       'model.accessory.statusAcc.active'
  //     )
  //   }else if (status ===AccessoryStatus.INACTIVE){
  //     return this.translateService.instant(
  //       'model.accessory.statusAcc.inactive'
  //     )
  //   }else {
  //     return this.translateService.instant(
  //       'model.accessory.statusAcc.drafts'
  //     )
  //   }
  // }

  formatColor(type: string): string {
    if (type === AccessoryStatus.ACTIVE) {
      return 'badge-info';
    } else if (type === AccessoryStatus.INACTIVE) {
      return 'badge-danger';
    } else {
      return 'badge-secondary';
    }
  }

  format(type: string): string {
    if (type === AccessoryStatus.ACTIVE) {
      return 'model.accessory.statusAcc.active';
    } else if (type === AccessoryStatus.INACTIVE) {
      return 'model.accessory.statusAcc.inactive';
    } else {
      return 'model.accessory.statusAcc.drafts';
    }
  }
}

