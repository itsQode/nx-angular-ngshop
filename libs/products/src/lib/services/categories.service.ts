import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { ICategory } from '../models/category';
import { IRestPayload } from '../interfaces/rest-payload.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = `${environment.apiURL}categories/`;
    constructor(private http: HttpClient) {}

    public getCategoriesList(): Observable<IRestPayload<ICategory[]>> {
        return this.http.get<IRestPayload<ICategory[]>>(this.apiURLCategories);
    }

    public getCategoryById(categoryId: string): Observable<IRestPayload<ICategory>> {
        return this.http.get<IRestPayload<ICategory>>(`${this.apiURLCategories}${categoryId}`);
    }

    public createCategory(category: ICategory): Observable<IRestPayload<ICategory>> {
        return this.http.post<IRestPayload<ICategory>>(this.apiURLCategories, category);
    }

    public updateCategoryById(category: ICategory) {
        return this.http.put<IRestPayload<ICategory>>(`${this.apiURLCategories}${category.id}`, category);
    }

    public deleteCategory(categoryId: string): Observable<IRestPayload<string>> {
        return this.http.delete<IRestPayload<string>>(`${this.apiURLCategories}${categoryId}`);
    }
}
