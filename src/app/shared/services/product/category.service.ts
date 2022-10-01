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
import { IProductCategoryProperty } from '../../models/product-category-property.model';
@Injectable({
  providedIn: 'root',
})
export class CategoryService extends AbstractService {
  public resourceUrl = SERVICE.PRODUCT + '/categories';
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
  ): Observable<EntityResponseType<ICategory[]>> {
    return super.get<ICategory[]>(`${this.resourceUrl}`, { params, loading });
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
  ): Observable<EntityResponseType<IProductCategoryProperty[]>> {
    return super.get<IProductCategoryProperty[]>(
      `${this.resourceUrl}/${id}/properties`,
      { loading }
    );
  }
  getPropertiesByCategoryIds(
    ids: string[]
  ): Observable<EntityResponseType<IProductCategoryProperty>> {
    return super.post<IProductCategoryProperty>(
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
