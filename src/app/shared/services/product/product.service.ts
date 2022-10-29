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
@Injectable({
  providedIn: 'root',
})
export class ProductService extends AbstractService {
  public resourceUrl = "/api/v1/product";
  constructor(protected http: HttpClient) {
    super(http);
  }
  search(
    params?: ProductSearchRequest,
    loading = false
  ): Observable<EntityResponseType<IProduct[]>> {
    return super.get<IProduct>(`${this.resourceUrl}`,{params ,loading});
  }
  autoComlete(
    params?: ProductSearchRequest,
    loading = false
  ): Observable<EntityResponseType<IProduct[]>> {
    return super.get<IProduct[]>(`${this.resourceUrl}/autoComplete`,{params ,loading});
  }
  productOrders(
  ): Observable<EntityResponseType<IProduct[]>> {
    return super.get<IProduct[]>(`${this.resourceUrl}/product-order`);
  }
  create(dish: IProduct): Observable<EntityResponseType<IProduct>> {
    return super.post<IProduct>(`${this.resourceUrl}`, dish);
  }

  update(id: string, dish: IProduct): Observable<EntityResponseType<IProduct>> {
    return super.put<IProduct>(`${this.resourceUrl}/${id}`, dish);
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.delete<IProduct>(`${this.resourceUrl}/${id}`);
  }

  sortAndPaginateProducts(
    params: IProductSearchRequest,
    products: IProduct[]
  ): Observable<EntityResponseType<IProduct[]>> {
    const { sortBy } = params;
    let sortedAndPagniatedProducts = [...products];

    const [sortField, sortOrder] = (sortBy || '').split('.') as string[];

    // sort
    if (sortField && sortOrder) {
      sortedAndPagniatedProducts = sortedAndPagniatedProducts.sort(
        (a: any, b: any) => {
          if (a[sortField] > b[sortField]) {
            return sortOrder === SORT.ASC ? 1 : -1;
          } else if (a[sortField] === b[sortField]) {
            return 0;
          } else {
            return sortOrder === SORT.ASC ? -1 : 1;
          }
        }
      );
    }

    // paginate
    const { pageIndex, pageSize } = params;
    if (pageIndex && pageSize) {
      const startIndex = (pageIndex - 1) * pageSize;
      const endIndex = startIndex + (pageSize - 1);
      sortedAndPagniatedProducts = sortedAndPagniatedProducts.slice(
        startIndex,
        endIndex + 1
      );
    }

    const responseWrapper: EntityResponseType<any> = {
      body: {
        success: true,
        code: 200,
        data: sortedAndPagniatedProducts,
        message: 'Fetch products',
        // page?: IPageable;
        // timestamp?: string | number | any;
      },
      type: HttpEventType.Response,
      clone(): HttpResponse<IBaseResponse<IProduct[]>> {
        throw new Error('Function not implemented.');
      },
      headers: new HttpHeaders(),
      status: 200,
      statusText: 'OK',
      url: '/product',
      ok: true,
    };
    return of(responseWrapper);
  }

  inactiveProduct(
    id: string,
    loading = false
  ): Observable<EntityResponseType<IProduct>> {
    return super.get<IProduct>(
      `${this.resourceUrl}/${id}/unlock`,
    );
  }
  getProperties(
    id: string,
    loading = false
  ): Observable<EntityResponseType<IProduct>> {
    return super.get<IProductPropertyValue[]>(
      `${this.resourceUrl}/${id}/properties`,
      {}
    );
  }
  activeProduct(
    id: string,
    loading = false
  ): Observable<EntityResponseType<IProduct>> {
    return super.get<IProduct>(
      `${this.resourceUrl}/${id}/lock`
    );
  }
  detail(id:string): Observable<EntityResponseType<IProduct>>{
    return super.get<IProduct>(
      `${this.resourceUrl}/${id}`
    );
  }

}
