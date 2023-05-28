import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IRestPayload } from '../interfaces/rest-payload.interface';
import { IProduct } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private apiURLProducts = `${environment.apiURL}products/`;
    constructor(private http: HttpClient) {}

    public getProducts(): Observable<IRestPayload<IProduct[]>> {
        return this.http.get<IRestPayload<IProduct[]>>(this.apiURLProducts);
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
}
