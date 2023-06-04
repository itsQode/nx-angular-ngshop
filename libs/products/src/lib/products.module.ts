import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';

@NgModule({
    imports: [CommonModule, HttpClientModule, RouterModule, ButtonModule],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent],
    declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent]
})
export class ProductsModule {}
