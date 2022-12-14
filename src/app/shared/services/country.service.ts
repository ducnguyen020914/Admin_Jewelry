import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Observable } from 'rxjs';
import { AbstractService, EntityResponseType } from './common/abstract.service';
import {ICustomerRequest} from "@shared/models/request/customer-request.model";
import {ICustomer} from "@shared/models/customer.model";

@Injectable({
  providedIn: 'root',
})
export class CountryService extends AbstractService {
  public resourceUrl = SERVICE.CUSTOMER + '/customer';
  constructor(protected http: HttpClient) {
    super(http);
  }
  province(
  ): Observable<any> {
    return this.http.get("https://online-gateway.ghn.vn/shiip/public-api/master-data/province",{headers:{token:'47c4a6b7-6337-11ed-b824-262f869eb1a7'}});
  }
  distrist(
    params:any
    ): Observable<any> {
      return this.http.post("https://online-gateway.ghn.vn/shiip/public-api/master-data/district",params,{headers:{token:'47c4a6b7-6337-11ed-b824-262f869eb1a7'}});
    }
    ward(
      districtId:number
      ): Observable<any> {
        return this.http.get(`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,{headers:{token:'47c4a6b7-6337-11ed-b824-262f869eb1a7'}});
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
