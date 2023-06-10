import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '@env/environment';
import { IRestPayload } from '../interfaces/rest-payload.interface';
import { IProduct } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiURLProducts = `${environment.apiURL}products/`;
    constructor(private http: HttpClient) {}

    public getProducts(categoriesFilter?: (string | undefined)[]): Observable<IRestPayload<IProduct[]>> {
        let params = new HttpParams();
        if (categoriesFilter) {
            params = params.append('categories', categoriesFilter.join(','));
        }
        return this.http.get<IRestPayload<IProduct[]>>(this.apiURLProducts, { params });
    }

    public getProductById(productId: string): Observable<IRestPayload<IProduct>> {
        return this.http.get<IRestPayload<IProduct>>(`${this.apiURLProducts}${productId}`);
    }

    public createProduct(productData: FormData): Observable<IRestPayload<IProduct>> {
        return this.http.post<IRestPayload<IProduct>>(this.apiURLProducts, productData);
    }

    public updateProductById(productData: FormData, productId: string) {
        return this.http.put<IRestPayload<IProduct>>(`${this.apiURLProducts}${productId}`, productData);
    }

    public deleteProduct(productId: string): Observable<IRestPayload<string>> {
        return this.http.delete<IRestPayload<string>>(`${this.apiURLProducts}${productId}`);
    }

    getProductsCount(): Observable<number> {
        return this.http.get<IRestPayload<number>>(`${this.apiURLProducts}get/count`).pipe(
            map((res) => {
                if (res.body) return res.body;
                else return 0;
            })
        );
    }

    public getFeaturedProducts(count: number): Observable<IRestPayload<{ products: IProduct[] }>> {
        return this.http.get<IRestPayload<{ products: IProduct[] }>>(`${this.apiURLProducts}get/featured/${count}`);
    }
}
