import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Category } from '../models/category';
import { IRestPayload } from '../interfaces/rest-payload.interface';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    apiURLCategories = `${environment.apiURL}categories/`;
    constructor(private http: HttpClient) {}

    public getCategoriesList(): Observable<IRestPayload<Category[]>> {
        return this.http.get<IRestPayload<Category[]>>(this.apiURLCategories);
    }

    public getCategoryById(categoryId: string): Observable<IRestPayload<Category>> {
        return this.http.get<IRestPayload<Category>>(`${this.apiURLCategories}${categoryId}`);
    }

    public createCategory(category: Category): Observable<IRestPayload<Category>> {
        return this.http.post<IRestPayload<Category>>(this.apiURLCategories, category);
    }

    public updateCategoryById(category: Category) {
        return this.http.put<IRestPayload<Category>>(`${this.apiURLCategories}${category.id}`, category);
    }

    public deleteCategory(categoryId: string): Observable<IRestPayload<string>> {
        return this.http.delete<IRestPayload<string>>(`${this.apiURLCategories}${categoryId}`);
    }
}
