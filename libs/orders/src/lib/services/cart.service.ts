import { Injectable } from '@angular/core';
import { Cart, CartItem } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

export const CART_KEY = 'cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

    initCartLocalStorage() {
        if (this.getCart()) return;

        const initCart = {
            items: []
        };

        localStorage.setItem(CART_KEY, JSON.stringify(initCart));
    }

    getCart(): Cart {
        const cartJsonString = localStorage.getItem(CART_KEY);

        const cart: Cart = cartJsonString ? JSON.parse(cartJsonString) : null;

        return cart;
    }

    setCartItem(cartItem: CartItem): Cart {
        const cart: Cart = this.getCart();

        const isCartItemExist = cart.items?.find((item) => item.productId === cartItem.productId);
        if (isCartItemExist) {
            cart.items?.map((item) => {
                if (!item.quantity) return item;
                if (!cartItem.quantity) return item;

                if (item.productId === cartItem.productId) {
                    item.quantity = item.quantity += cartItem.quantity;
                }
                return item;
            });
        } else {
            cart.items?.push(cartItem);
        }

        localStorage.setItem(CART_KEY, JSON.stringify(cart));

        this.cart$.next(cart);

        return cart;
    }
}
