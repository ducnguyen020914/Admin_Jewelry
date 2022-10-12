import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMaterial } from '@shared/models/material.model';
import {
  AbstractService,
  EntityResponseType,
} from '@shared/services/common/abstract.service';
import { Observable, of } from 'rxjs';
import { MaterialSearchRequest } from '../../models/request/material-search-request.model';
@Injectable({
  providedIn: 'root',
})
export class MaterialService extends AbstractService {
  public resourceUrl = "/api/v1/material";
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: MaterialSearchRequest,
    loading = true
  ): Observable<EntityResponseType<IMaterial[]> >{
    return super.get<IMaterial[]>(`${this.resourceUrl}`,{params,loading:true});
  }

  create(dish: IMaterial): Observable<EntityResponseType<IMaterial>> {
    return super.post<IMaterial>(`${this.resourceUrl}`, dish);
  }

  update(id: string, dish: IMaterial): Observable<EntityResponseType<IMaterial>> {
    return super.put<IMaterial>(`${this.resourceUrl}/${id}`, dish);
  }
  detail(id: string): Observable<EntityResponseType<IMaterial>> {
    return super.get<IMaterial>(`${this.resourceUrl}/${id}`);
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.delete<IMaterial>(`${this.resourceUrl}/${id}`);
  }
  lock(id: string): Observable<EntityResponseType<IMaterial>>{
    return super.post<IMaterial>(`${this.resourceUrl}/${id}/lock`);
  }
  unlock(id: string): Observable<EntityResponseType<IMaterial>>{
    return super.post<IMaterial>(`${this.resourceUrl}/${id}/unlock`);
  }
 
}
