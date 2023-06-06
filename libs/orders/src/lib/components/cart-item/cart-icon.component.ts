import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@Component({
    selector: 'orders-cart-icon',
    templateUrl: './cart-icon.component.html',
    styles: []
})
export class CartIconComponent implements OnInit {
    cartCount: number | undefined = 0;
    constructor(private cartService: CartService) {}

    ngOnInit(): void {
        this.cartService.cart$.subscribe((cart: Cart) => {
            this.cartCount = cart?.items?.length ?? 0;
        });
    }

    get getCartCount() {
        return String(this.cartCount);
    }
}
