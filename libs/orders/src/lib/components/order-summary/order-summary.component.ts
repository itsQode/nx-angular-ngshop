import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
    selector: 'orders-order-summary',
    templateUrl: './order-summary.component.html',
    styles: []
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    endSubs$ = new Subject();
    totalPrice = 0;
    isCheckout = false;
    constructor(private cartService: CartService, private orderService: OrdersService, private router: Router) {
        this.router.url.includes('checkout') ? (this.isCheckout = true) : (this.isCheckout = false);
    }

    ngOnInit(): void {
        this._getOrderSummary();
    }

    private _getOrderSummary() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
            this.totalPrice = 0;
            if (cart) {
                cart.items?.map((item) => {
                    if (!item.productId) return;

                    this.orderService
                        .getProductById(item.productId)
                        .pipe(take(1))
                        .subscribe((res) => {
                            if (item.quantity) this.totalPrice += item.quantity * res.body.price;
                        });
                });
            }
        });
    }

    onNavigateToCheckOut() {
        this.router.navigate(['/checkout']);
    }

    ngOnDestroy(): void {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }
}
