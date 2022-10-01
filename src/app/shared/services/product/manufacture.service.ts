import { Injectable } from '@angular/core';
import {SERVICE} from '@shared/constants/gateway-routes-api.constant';
import {HttpClient} from '@angular/common/http';
import {AbstractService, EntityResponseType} from '@shared/services/common/abstract.service';
import {Observable} from 'rxjs';
import {Category, ICategory} from '@shared/models/category.model';
import {IManufacture, Manufacture} from '@shared/models/manufacture.model';
import {ICategorySearchRequest} from '@shared/models/request/category-search-request.model';
import {IManufactureSearchRequest} from '@shared/models/request/manufacture-search-request.model';
import {IMeeting} from '@shared/models/meeting.model';

@Injectable({
  providedIn: 'root'
})
export class ManufactureService extends AbstractService{
  public resourceUrl = SERVICE.PRODUCT + '/manufactures';
  constructor(protected http: HttpClient) {
    super(http);
  }

  searchManufacturesAutoComplete(
    params?: any,
    loading = false
  ): Observable<EntityResponseType<IManufacture[]>> {
    return super.get<IManufacture[]>(`${this.resourceUrl}/auto-complete`, {
      params,
      loading,
    });
  }

  search(
    params?: IManufactureSearchRequest,
    loading = false
  ): Observable<EntityResponseType<IManufacture[]>> {
    return super.get<IManufacture[]>(`${this.resourceUrl}`, { params, loading });
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.post<IManufacture>(`${this.resourceUrl}/${id}/delete`);
  }

  create(manufacture: Manufacture): Observable<EntityResponseType<IManufacture>> {
    return super.post<IManufacture>(`${this.resourceUrl}`, manufacture);
  }

  update(
    manufacture: Manufacture,
    id: any,
  ): Observable<EntityResponseType<IManufacture>> {
    return super.post<IManufacture>(`${this.resourceUrl}/${id}/update`, manufacture);
  }
  findByManufactureId(id: string, loading = false
  ): Observable<EntityResponseType<IManufacture>> {
    return super.get<IManufacture>(`${this.resourceUrl}/${id}`, { loading })
  }
  inactive(id: string, loading = false): Observable<EntityResponseType<ICategory>> {
    return super.post<IManufacture>(`${this.resourceUrl}/${id}/inactive`,  {}, {loading})
  }

  active(id: string, loading = false): Observable<EntityResponseType<ICategory>> {
    return super.post<IManufacture>(`${this.resourceUrl}/${id}/active`, {}, {loading})
  }


}
