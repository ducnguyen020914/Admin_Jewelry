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
  public resourceUrl = 'https://633b0ce5e02b9b64c61e0ffa.mockapi.io/category';
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
    loading = false
  ): Observable<any> {
    return this.http.get(`${this.resourceUrl}`);
  }

  delete(id: string): Observable<EntityResponseType<any>> {
    return super.post<ICategory>(`${this.resourceUrl}/${id}/delete`);
  }

  create(category: Category): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(`${this.resourceUrl}`, category);
  }

  update(
    category: Category,
    id: any
  ): Observable<EntityResponseType<ICategory>> {
    return super.post<ICategory>(`${this.resourceUrl}/${id}/update`, category);
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
