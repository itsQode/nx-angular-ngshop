import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../models/product';

@Component({
    selector: 'products-product-item',
    templateUrl: './product-item.component.html',
    styles: []
})
export class ProductItemComponent implements OnInit {
    @Input() product!: IProduct;
    constructor() {}

    ngOnInit(): void {}
}
