import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

import { CategoriesService, ICategory } from '@itscode/products';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit, OnDestroy {
    categories: ICategory[] = [];
    endsubs$ = new Subject();

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
            .pipe(takeUntil(this.endsubs$))
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
                this.categoriesService
                    .deleteCategory(id)
                    .pipe(takeUntil(this.endsubs$))
                    .subscribe({
                        next: () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'success',
                                detail: 'Category is deleted'
                            });
                            this._getCategories();
                        },
                        error: () => {
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

    ngOnDestroy() {
        this.endsubs$.next(0);
        this.endsubs$.complete();
    }
}
