import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Category } from '@shared/models/category.model';
import { CATEGORY_STATUS } from '../../../../shared/constants/product.constant copy';
import { CategorySearchRequest } from '../../../../shared/models/request/category-search-request.model';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import CommonUtil from '../../../../shared/utils/common-utils';
import { ROUTER_ACTIONS } from '@shared/utils/router.utils';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CategoryService } from '@shared/services/product/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  pathTranslate = 'model.category.';
  form:FormGroup = new FormGroup([]);
  categoryStatus = CATEGORY_STATUS;
  categorySearchRequest:CategorySearchRequest = {};
  categories:Category[] = [];
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
    private modalService:NzModalService,
    private categoryService:CategoryService) { }
  
  ngOnInit() {
    this.loadDataCategory();
  }
  loadDataCategory(){
    this.categoryService.search().subscribe((response) => {
      this.categories = response
    })
  }

  getTranslate(str: string): string {
    return this.translateService.instant(this.pathTranslate + '' + str);
  }
  getIndex(index: number): number {
    return CommonUtil.getIndex(
      index,
      this.categorySearchRequest.pageIndex,
      this.categorySearchRequest.pageSize
    );
  }
  onSearch(){};
  resetSearch(){};
  onQueryParamsChange(event:any){}
  onQuerySearch(event:any){};
  onLockAndUnLock(event:any){};
  create(): void {
    const base = CommonUtil.modalBase(
      UpdateCategoryComponent,
      {
        action: ROUTER_ACTIONS.create,
      },
      '40%'
    );
    const modal: NzModalRef = this.modalService.create(base);
    modal.afterClose.subscribe((result) => {
      if (result && result?.success) {
        this.loadDataCategory();
      }
    });
  }

}
