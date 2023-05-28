import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { IProduct, ProductsService } from '@itscode/products';

@Component({
    selector: 'admin-product-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] = [];
    constructor(private productService: ProductsService, private router: Router) {}

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts() {
        this.productService
            .getProducts()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) {
                        this.products = res.body;
                    }
                }
            });
    }

    onUpdateProduct(productId: string) {
        this.router.navigateByUrl(`products/form/${productId}`);
    }
    onDeleteProducts(arg0: any) {
        throw new Error('Method not implemented.');
    }
}
