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
import { IEventSearchRequest } from '../../models/request/event-search-request.model';
import { IEvent } from '../../models/event.model';
@Injectable({
  providedIn: 'root',
})
export class EventService extends AbstractService {
  public resourceUrl = "/api/v1/event";
  constructor(protected http: HttpClient) {
    super(http);
  }
  getAll(
    loading = true
  ): Observable<EntityResponseType<ISize[]> >{
    return super.get<ISize[]>(`${this.resourceUrl}/getAll`);
  }

  search(params?:IEventSearchRequest):Observable<EntityResponseType<IEvent[]> >{
    return super.get<IEvent[]>(`${this.resourceUrl}`,{params});
  }
  addEvent(param?:any):Observable<any> {
    return super.post<IEvent>(`${this.resourceUrl}`,param);
  }
  updateEvent(id:string,param?:any):Observable<any> {
    return super.put<IEvent>(`${this.resourceUrl}/${id}`,param);
  }


 
}
