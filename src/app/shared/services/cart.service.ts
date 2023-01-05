import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from './common/abstract.service';
import { Ship } from '../models/ship.model';
@Injectable({
  providedIn: 'root',
})
export class CartService extends AbstractService {
  public resourceUrl = '/api/v1/cart';
  // @ts-ignore
  constructor(protected http: HttpClient) {
    super(http);
  }

  chargeShipping(ship : Ship ) :Observable<any> {
    return this.http.post('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', ship,
    {headers:{token:'47c4a6b7-6337-11ed-b824-262f869eb1a7'}});
  }
  getServiceShipping(param : any ) :Observable<any> {
    return this.http.get('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services',
    {headers:{token:'47c4a6b7-6337-11ed-b824-262f869eb1a7'},params:param});
  }

}
