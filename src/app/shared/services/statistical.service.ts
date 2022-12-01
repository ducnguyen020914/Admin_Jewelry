import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from './common/abstract.service';
import {ICustomerRequest} from "@shared/models/request/customer-request.model";
import {ICustomer} from "@shared/models/customer.model";
import { Revenue } from '../models/statistical.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticalService extends AbstractService {
   public resourceUrl = '/api/v1/statistical';
  constructor(protected http: HttpClient) {
    super(http);
  }
  revenue(
    params?: any,
    loading = true
  ): Observable<EntityResponseType<Revenue[]>> {
    return super.get<Revenue[]>(`${this.resourceUrl}/revenue`,{params});
  }
  category(
    loading = true
  ): Observable<EntityResponseType<Revenue[]>> {
    return super.get<Revenue[]>(`${this.resourceUrl}/category`);
  }

  material(
    loading = true
  ): Observable<EntityResponseType<Revenue[]>> {
    return super.get<Revenue[]>(`${this.resourceUrl}/material`);
  }

 
}
