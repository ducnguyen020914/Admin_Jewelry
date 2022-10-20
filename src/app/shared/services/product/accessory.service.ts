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
import { Observable, of } from 'rxjs';
import { IProductPropertyValue } from '../../models/product-property-value.model';
import { IAccessory } from '../../models/accesory.model';
import { AccessorySearchRequest } from '../../models/request/accessory-search-request.model';
import { AbstractService, EntityResponseType } from '../common/abstract.service';

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
  search(
    params?: AccessorySearchRequest,
    loading = true
  ): Observable<EntityResponseType<IAccessory[]> >{
    return super.get<IAccessory[]>(`${this.resourceUrl}`,{params,loading:true});
  }

  create(dish: IAccessory): Observable<EntityResponseType<IAccessory>> {
    return super.post<IAccessory>(`${this.resourceUrl}`, dish);
  }

  update( accessory: IAccessory, id: string,): Observable<EntityResponseType<IAccessory>> {
    return super.put<IAccessory>(`${this.resourceUrl}/${id}`, accessory);
  }
  detail(id: string): Observable<EntityResponseType<IAccessory>> {
    return super.get<IAccessory>(`${this.resourceUrl}/${id}`);
  }

  delete(id: string, dish: IAccessory): Observable<EntityResponseType<any>> {
    return super.put<IAccessory>(`${this.resourceUrl}/delete/${id}`,dish);
  }
  active(id: string, accessory: IAccessory): Observable<EntityResponseType<IAccessory>>{
    return super.put<IAccessory>(`${this.resourceUrl}/active/${id}`,accessory);
  }
  inactive(id: string, accessory: IAccessory): Observable<EntityResponseType<IAccessory>>{
    return super.put<IAccessory>(`${this.resourceUrl}/inactive/${id}`,accessory);
  }

}
