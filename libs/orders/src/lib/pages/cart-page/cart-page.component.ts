import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Cart, CartItemDetailed } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'orders-cart-page',
    templateUrl: './cart-page.component.html',
    styles: []
})
export class CartPageComponent implements OnInit {
    cartItemDetailed: CartItemDetailed[] = [];

    constructor(private router: Router, private cartService: CartService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._getCartDetailg();
    }

    private _getCartDetailg() {
        this.cartService.cart$.subscribe((cart: Cart) => {
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

    onDeleteCartItem() {}
}
