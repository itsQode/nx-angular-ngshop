import { Component, OnInit } from '@angular/core';
import { IOrder, OrdersService, IOrderStatus, ORDER_STATUS } from '@itscode/orders';

@Component({
    selector: 'admin-orders-list',
    templateUrl: './orders-list.component.html',
    styles: []
})
export class OrdersListComponent implements OnInit {
    orders: IOrder[] = [];
    orderStatus: IOrderStatus = ORDER_STATUS;

    constructor(private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getOrders();
    }

    private _getOrders() {
        this.ordersService.getOrders().subscribe({
            next: (res) => {
                if (res.body) {
                    this.orders = res.body;
                }
            }
        });
    }

    // onDeleteOrder(orderId: string) {}
}
