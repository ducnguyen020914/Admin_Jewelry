import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from './common/abstract.service';
import {ICustomerRequest} from "@shared/models/request/customer-request.model";
import {ICustomer} from "@shared/models/customer.model";
import { ICalendarSearchRequest } from '../models/request/calendar-search-request.model';
import { Apoiment } from '../models/apoiment.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService extends AbstractService {
  public resourceUrl = '/api/v1/calendar';
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: ICalendarSearchRequest,
    loading = true
  ): Observable<EntityResponseType<Apoiment[]>> {
    return super.get<Apoiment[]>(`${this.resourceUrl}/`, {
      params,
      loading,
    });
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.post<ICustomer>(`${this.resourceUrl}/${id}/delete`);
  }

  create(guest: Apoiment): Observable<EntityResponseType<Apoiment>> {
    return super.post<Apoiment>(`${this.resourceUrl}`, guest);
  }

  update(guest: Apoiment, id: string): Observable<EntityResponseType<Apoiment>> {
    return super.put<Apoiment>(`${this.resourceUrl}/${id}`, guest);
  }

  findById(id: any, loading = false): Observable<EntityResponseType<ICustomer>> {
    return super.get<ICustomer>(`${this.resourceUrl}/${id}`, { loading });
  }
  changeStatus(guest: Apoiment, id: string): Observable<EntityResponseType<Apoiment>> {
    return super.post<Apoiment>(`${this.resourceUrl}/changeStatus/${id}`, guest);
  }

  inactive(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICustomer>> {
    return super.get<ICustomer>(`${this.resourceUrl}/${id}/inactive`, {});
  }
  active(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICustomer>> {
    return super.get<ICustomer>(`${this.resourceUrl}/${id}/active`, {});
  }
}
