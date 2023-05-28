import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CategoriesService, ICategory } from '@itscode/products';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: ICategory[] = [];

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategories();
    }

    private _getCategories() {
        this.categoriesService
            .getCategoriesList()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (!res.body) return;
                    this.categories = res.body;
                }
            });
    }

    onDeleteCategory(id: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(id).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'success',
                            detail: 'Category is deleted'
                        });
                        this._getCategories();
                    },
                    error: (err) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category is not deleted!'
                        });
                    }
                });
            },
            reject: () => {
                return;
            }
        });
    }

    onUpdateCategory(id: string) {
        this.router.navigateByUrl(`categories/form/${id}`);
    }
}
