import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SORT } from '@shared/constants/common.constant';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { IBaseResponse } from '@shared/models/base.model';
import { IProduct } from '@shared/models/productReal.model';
import {
  IProductSearchRequest,
  ProductSearchRequest,
} from '@shared/models/request/product-search-request.model';
import {
  AbstractService,
  EntityResponseType,
} from '@shared/services/common/abstract.service';
import { Observable, of } from 'rxjs';
import { IProductPropertyValue } from '../../models/product-property-value.model';
import { VendorSearchRequest } from '../../models/request/vendor-search-request.model';
import { IVendor, Vendor } from '../../models/vendor.model';
@Injectable({
  providedIn: 'root',
})
export class VendorService extends AbstractService {
  public resourceUrl = "/api/v1/vendor";
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: VendorSearchRequest,
    loading = false
  ): Observable<EntityResponseType<IVendor[]> >{
    return super.get<IVendor[]>(`${this.resourceUrl}`,{params});
  }

  create(dish: Vendor): Observable<EntityResponseType<Vendor>> {
    return super.post<Vendor>(`${this.resourceUrl}`, dish);
  }

  update(id: string, dish: IVendor): Observable<EntityResponseType<IVendor>> {
    return super.put<IVendor>(`${this.resourceUrl}/${id}`, dish);
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.delete<IVendor>(`${this.resourceUrl}/${id}`);
  }
 
}
