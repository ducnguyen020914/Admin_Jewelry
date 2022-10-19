import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SORT } from '@shared/constants/common.constant';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IBaseResponse } from '@shared/models/base.model';
import { IProduct } from '@shared/models/productReal.model';
import {
  IProductSearchRequest,
  ProductSearchRequest,
} from '@shared/models/request/product-search-request.model';
import {
  AbstractService,
  EntityResponseType,
} from '@shared/services/common/abstract.service';
import { Observable, of } from 'rxjs';
import { IProductPropertyValue } from '../../models/product-property-value.model';
import { IAccessory } from '../../models/accesory.model';
import { AccessorySearchRequest } from '../../models/request/accessory-search-request.model';
@Injectable({
  providedIn: 'root',
})
export class AccessoryService extends AbstractService {
  public resourceUrl = "/api/v1/accessory";
  constructor(protected http: HttpClient) {
    super(http);
  }
  autoComplete(
    params?:AccessorySearchRequest,
    loading = false
  ): Observable<EntityResponseType<IAccessory[]>> {
    return super.get<IAccessory[]>(`${this.resourceUrl}/auto-complete`,{params});
  }
}
