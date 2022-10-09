import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVICE } from '@shared/constants/gateway-routes-api.constant';
import { Category, ICategory } from '@shared/models/category.model';
import { ICategorySearchRequest } from '@shared/models/request/category-search-request.model';
import {
  AbstractService,
  EntityResponseType,
} from '@shared/services/common/abstract.service';
import { Observable } from 'rxjs';
import { ICategoryProperty } from '../../models/product-category-property.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AbstractService {
  public resourceUrl = '/api/v1/category';
  constructor(protected http: HttpClient) {
    super(http);
  }

  searchCategoriesAutoComplete(
    params?: any,
    loading = false
  ): Observable<EntityResponseType<ICategory[]>> {
    return super.get<ICategory[]>(`${this.resourceUrl}/auto-complete`, {
      params,
      loading,
    });
  }

  search(
    params?: ICategorySearchRequest,
    loading = true
  ): Observable<EntityResponseType<ICategory[]>> {
    return super.get<ICategory[]>(`${this.resourceUrl}`,{params});
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.delete<ICategory>(`${this.resourceUrl}/${id}`);
  }

  create(category: Category): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(`${this.resourceUrl}`, category);
  }

  update(
    category: Category,
    id: any
  ): Observable<EntityResponseType<ICategory>> {
    return super.put<ICategory>(`${this.resourceUrl}/${id}`, category);
  }

  findByCategoryId(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategory>> {
    return super.get<ICategory>(`${this.resourceUrl}/${id}`, { loading });
  }
  getProperties(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategoryProperty[]>> {
    return super.get<ICategoryProperty[]>(
      `${this.resourceUrl}/${id}/properties`,
      { loading }
    );
  }
  getPropertiesByCategoryIds(
    ids: string[]
  ): Observable<EntityResponseType<ICategoryProperty>> {
    return super.post<ICategoryProperty>(
      `${this.resourceUrl}/category-properties`,
      ids
    );
  }

  inactiveCategory(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(
      `${this.resourceUrl}/${id}/inactive`,
      {},
      { loading }
    );
  }

  activeCategory(
    id: string,
    loading = false
  ): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(
      `${this.resourceUrl}/${id}/active`,
      {},
      { loading }
    );
  }
}
