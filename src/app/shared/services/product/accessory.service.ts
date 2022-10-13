import {
  HttpClient,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractService,
  EntityResponseType,
} from '@shared/services/common/abstract.service';
import { Observable, of } from 'rxjs';
import {AccessorySearchRequest} from "@shared/models/request/accessory-search-request.model";
import {IAccessory} from "@shared/models/accesory.model";
@Injectable({
  providedIn: 'root',
})
export class AccessoryService extends AbstractService {
  public resourceUrl = "/api/v1/accessory";
  constructor(protected http: HttpClient) {
    super(http);
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

  update(id: string, dish: IAccessory): Observable<EntityResponseType<IAccessory>> {
    return super.put<IAccessory>(`${this.resourceUrl}/${id}`, dish);
  }
  detail(id: string): Observable<EntityResponseType<IAccessory>> {
    return super.get<IAccessory>(`${this.resourceUrl}/${id}`);
  }

  delete(id: string, dish: IAccessory): Observable<EntityResponseType<any>> {
    return super.put<IAccessory>(`${this.resourceUrl}/delete/${id}`,dish);
  }
  lock(id: string): Observable<EntityResponseType<IAccessory>>{
    return super.post<IAccessory>(`${this.resourceUrl}/${id}/lock`);
  }
  unlock(id: string): Observable<EntityResponseType<IAccessory>>{
    return super.post<IAccessory>(`${this.resourceUrl}/${id}/unlock`);
  }

}
