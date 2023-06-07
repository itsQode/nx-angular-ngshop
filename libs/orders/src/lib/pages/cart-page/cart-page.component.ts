import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItemDetailed } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit, OnDestroy {
    cartItemDetailed: CartItemDetailed[] = [];
    endSubs$ = new Subject();

    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetailg();
    }

    private _getCartDetailg() {
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart: Cart) => {
            this.cartItemDetailed = [];
            cart.items?.forEach((cartItem) => {
                if (cartItem.productId)
                    this.ordersService.getProductById(cartItem.productId).subscribe((product) => {
                        this.cartItemDetailed.push({
                            product: product.body,
                            quantity: cartItem.quantity
                        });
                    });
            });
        });
    }

    onBackToShop() {
        this.router.navigate(['/products']);
    }

    onDeleteCartItem(cartItem: CartItemDetailed) {
        const productId = cartItem.product.id;
        this.cartService.deletCartItem(productId);
    }

    onUpdateCartItemQuantity(cartItem: CartItemDetailed, { value }: any) {
        const newCartItem = {
            productId: cartItem.product.id,
            quantity: value
        };

        this.cartService.setCartItem(newCartItem, true);
    }

    ngOnDestroy(): void {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }
}
