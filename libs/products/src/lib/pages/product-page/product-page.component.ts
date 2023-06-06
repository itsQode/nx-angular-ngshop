import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CartItem, CartService } from '@itscode/orders';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'products-product-page',
    templateUrl: './product-page.component.html',
    styles: []
})
export class ProductPageComponent implements OnInit {
    product!: IProduct;
    currentId = '';
    quantity = 1;

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
        private cartService: CartService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        //id ? currentID = id : currentId = null
        this._getId();

        if (this.currentId) this._getProduct();
    }

    private _getId() {
        this.route.params.pipe(take(1)).subscribe((params) => {
            this.currentId = params['productid'] ? params['productid'] : null;
        });
    }

    private _getProduct() {
        this.productsService
            .getProductById(this.currentId)
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) {
                        this.product = res.body;
                        console.log(res.body);
                    }
                }
            });
    }

    onAddProductToCart() {
        const cartItem: CartItem = {
            productId: this.product.id,
            quantity: this.quantity
        };
        this.cartService.setCartItem(cartItem);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cart Updated!' });
    }
}
