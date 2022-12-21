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
import { ISize } from '../../models/size.model';
import { ISizeSearchRequest } from '../../models/request/event-search-request.model';
@Injectable({
  providedIn: 'root',
})
export class SizeService extends AbstractService {
  public resourceUrl = "/api/v1/size";
  constructor(protected http: HttpClient) {
    super(http);
  }
  autoComplete(
    loading = true
  ): Observable<EntityResponseType<ISize[]> >{
    return super.get<ISize[]>(`${this.resourceUrl}`);
  }
  getbyProductId(productId:string): Observable<EntityResponseType<ISize[]>>{
    return super.get<ISize[]>(`${this.resourceUrl}/${productId}/product`);
  }

  search(param:ISizeSearchRequest): Observable<EntityResponseType<ISize[]>>{
    return super.get<ISize[]>(`${this.resourceUrl}`,{param});
  }

 
}
