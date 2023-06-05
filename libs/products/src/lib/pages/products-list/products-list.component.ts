import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';
import { ProductsService } from '../../services/products.service';
import { take } from 'rxjs';
import { ICategory } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'products-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] = [];
    categories: ICategory[] = [];
    isCategoryPage = false;

    constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.pipe(take(1)).subscribe({
            next: (params) => {
                params['categoryid'] ? this._getProducts([params['categoryid']]) : this._getProducts();
                params['categoryid'] ? (this.isCategoryPage = true) : (this.isCategoryPage = false);
            }
        });
        this._getCategories();
    }

    private _getProducts(categoriesFilter?: (string | undefined)[]) {
        this.productsService
            .getProducts(categoriesFilter)
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) {
                        this.products = res.body;
                    }
                }
            });
    }

    private _getCategories() {
        this.categoriesService
            .getCategoriesList()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) {
                        this.categories = res.body;
                    }
                }
            });
    }

    onCategoryFilter() {
        const selectedCategories = this.categories.filter((category) => category.checked).map((category) => category.id);
        this._getProducts(selectedCategories);
    }
}
