import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from '@env/environment';
import { IOrder } from '../models/order';
import { IRestPayload } from '../interfaces/rest-payload.interface';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    apiURLOrders = `${environment.apiURL}orders/`;
    apiURLProducts = `${environment.apiURL}products/`;

    constructor(private http: HttpClient) {}

    public getOrders(): Observable<IRestPayload<IOrder[]>> {
        return this.http.get<IRestPayload<IOrder[]>>(this.apiURLOrders);
    }

    public getOrderById(orderId: string): Observable<IRestPayload<IOrder>> {
        return this.http.get<IRestPayload<IOrder>>(`${this.apiURLOrders}${orderId}`);
    }

    public createOrder(order: IOrder): Observable<IRestPayload<IOrder>> {
        return this.http.post<IRestPayload<IOrder>>(this.apiURLOrders, order);
    }

    public updateOrderById(orderStatus: { status: string }, orderId: string) {
        return this.http.put<IRestPayload<IOrder>>(`${this.apiURLOrders}${orderId}`, orderStatus);
    }

    public deleteOrder(orderId: string): Observable<IRestPayload<string>> {
        return this.http.delete<IRestPayload<string>>(`${this.apiURLOrders}${orderId}`);
    }

    getOrdersCount(): Observable<number> {
        return this.http.get<IRestPayload<number>>(`${this.apiURLOrders}get/count`).pipe(
            map((res) => {
                if (res.body) return res.body;
                else return 0;
            })
        );
    }

    getTotalSales(): Observable<number> {
        return this.http.get<IRestPayload<number>>(`${this.apiURLOrders}get/totalsales`).pipe(
            map((res) => {
                if (res.body) return res.body;
                else return 0;
            })
        );
    }

    public getProductById(productId: string): Observable<IRestPayload<any>> {
        return this.http.get<IRestPayload<any>>(`${this.apiURLProducts}${productId}`);
    }
}
