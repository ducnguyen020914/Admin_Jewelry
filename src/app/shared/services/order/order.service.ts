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
import { IOrder } from '../../models/order.model';
import { OrderSearchRequest, IOrderSearchRequest } from '../../models/request/order-search-request.model';
@Injectable({
  providedIn: 'root',
})
export class OrderService extends AbstractService {
  public resourceUrl = "/api/v1/order";
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: OrderSearchRequest,
    loading = true,
  ): Observable<EntityResponseType<IOrder[]> >{
    return super.get<IOrder[]>(`${this.resourceUrl}`,{params,loading:true});
  }
  findOne(
    id:string,
    loading = true,
  ): Observable<EntityResponseType<IOrder> >{
    return super.get<IOrder>(`${this.resourceUrl}/${id}`,{loading:true});
  }
  createOrder(
    params?: any,
    loading = true,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}`,params);
  }
  updateOrderWait(
    id:string,
    params?: any,
    loading = true,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}/${id}/orderwait`,params);
  }
  updateOrder(
    id:string,
    params?: any,
    loading = true,
  ): Observable<EntityResponseType<IOrder>>{
    return super.post<IOrder>(`${this.resourceUrl}/${id}`,params);
  }
 
}
