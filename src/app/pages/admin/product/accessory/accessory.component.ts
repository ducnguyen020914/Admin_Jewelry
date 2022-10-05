import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccessorySearchRequest } from '../../../../shared/models/request/accessory-search-request.model';
import { TranslateService } from '@ngx-translate/core';
import { Accessory } from '@shared/models/accesory.model';

@Component({
  selector: 'app-accessory',
  templateUrl: './accessory.component.html',
  styleUrls: ['./accessory.component.css']
})
export class AccessoryComponent implements OnInit {

  pathTranslate = 'model.category.';
  form:FormGroup = new FormGroup([]);
  accessorySearchRequest:AccessorySearchRequest = {};
  categories:Accessory[] = [];
  isVisible = false;
  total = 0;
  lockPopup = {
    title: '',
    content: '',
    okText: '',
    interpolateParams: {},
    callBack: () => {},
  };
  constructor(private translateService: TranslateService) { }
  
  ngOnInit() {
  }


  getTranslate(str: string): string {
    return this.translateService.instant(this.pathTranslate + '' + str);
  }
  onSearch(){};
  resetSearch(){};
  onQueryParamsChange(event:any){}
  onQuerySearch(event:any){};
  onLockAndUnLock(event:any){};

}

