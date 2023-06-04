import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { take } from 'rxjs';

@Component({
    selector: 'products-featured-products',
    templateUrl: './featured-products.component.html',
    styles: []
})
export class FeaturedProductsComponent implements OnInit {
    featuredProducts: IProduct[] = [];
    constructor(private productsService: ProductsService) {}

    ngOnInit(): void {
        this._getFeaturedProducst();
    }

    _getFeaturedProducst() {
        this.productsService
            .getFeaturedProducts(4)
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) {
                        this.featuredProducts = res.body.products;
                    }
                }
            });
    }
}
