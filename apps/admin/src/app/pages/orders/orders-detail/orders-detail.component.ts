import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder, OrdersService, ORDER_STATUS } from '@itscode/orders';
import { take } from 'rxjs';
import { MessageService } from 'primeng/api';

interface IOrderStatus {
    id: string;
    name: string;
}

@Component({
    selector: 'admin-orders-detail',
    templateUrl: './orders-detail.component.html',
    styles: []
})
export class OrdersDetailComponent implements OnInit {
    orderStatus: IOrderStatus[] = [];
    selectedStatus = '0';
    currentId = '';

    order: IOrder | null = null;
    constructor(private orderService: OrdersService, private route: ActivatedRoute, private messageService: MessageService) {}

    ngOnInit(): void {
        this._mapOrderStatus();
        this._getOrder();
    }

    private _mapOrderStatus() {
        this.orderStatus = Object.keys(ORDER_STATUS).map((key) => {
            return {
                id: key,
                name: ORDER_STATUS[Number(key)].label
            };
        });
    }

    private _getOrder() {
        this.route.params.pipe(take(1)).subscribe((params) => {
            if (params['id']) {
                this.orderService.getOrderById(params['id']).subscribe({
                    next: (res) => {
                        if (res.body) {
                            this.order = res.body;
                            if (res.body.id) this.currentId = res.body.id;
                            if (res.body.status) this.selectedStatus = res.body.status;
                        }
                    }
                });
            }
        });
    }

    onStatusChange() {
        const status = {
            status: this.selectedStatus
        };
        this.orderService.updateOrderById(status, this.currentId).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order  is Updated!' });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Order is not Updated!' });
            }
        });
    }
}
