import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from './common/abstract.service';
import {ICustomerRequest} from "@shared/models/request/customer-request.model";
import {ICustomer} from "@shared/models/customer.model";

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends AbstractService {
  public resourceUrl = SERVICE.CUSTOMER + '/customer';
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: ICustomerRequest,
    loading = true
  ): Observable<EntityResponseType<ICustomerRequest[]>> {
    return super.get<ICustomer[]>(`${this.resourceUrl}/`, {
      params,
      loading,
    });
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.post<ICustomer>(`${this.resourceUrl}/${id}/delete`);
  }

  create(guest: ICustomer): Observable<EntityResponseType<ICustomer>> {
    return super.post<ICustomer>(`${this.resourceUrl}`, guest);
  }

  update(guest: ICustomer, id: any): Observable<EntityResponseType<ICustomer>> {
    return super.post<ICustomer>(`${this.resourceUrl}/${id}/update`, guest);
  }

  findById(id: any, loading = false): Observable<EntityResponseType<ICustomer>> {
    return super.get<ICustomer>(`${this.resourceUrl}/${id}`, { loading });
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
