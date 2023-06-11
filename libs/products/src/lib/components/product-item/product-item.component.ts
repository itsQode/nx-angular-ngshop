import { Component, Input } from '@angular/core';
import { IProduct } from '../../models/product';
import { CartService, CartItem } from '@itscode/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent {
    @Input() product!: IProduct;
    constructor(private cartService: CartService, private messageService: MessageService) {}

    onAddToCart(productId: string) {
        const cartItem: CartItem = {
            productId,
            quantity: 1
        };
        this.cartService.setCartItem(cartItem);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cart Updated!' });
    }
}
