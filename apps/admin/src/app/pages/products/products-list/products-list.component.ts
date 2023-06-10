import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { IProduct, ProductsService } from '@itscode/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-product-list',
    templateUrl: './products-list.component.html',
    styles: []
})
export class ProductsListComponent implements OnInit {
    products: IProduct[] = [];
    constructor(
        private productsService: ProductsService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getProducts();
    }

    private _getProducts() {
        this.productsService
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
    onDeleteProducts(productId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productsService.deleteProduct(productId).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: `${res.body}`
                        });
                        this._getProducts();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Product is not deleted!'
                        });
                    }
                });
            },
            reject: () => {
                return;
            }
        });
    }
}
