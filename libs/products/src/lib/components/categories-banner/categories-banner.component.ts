import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { ICategory } from '../../models/category';

@Component({
    selector: 'products-categories-banner',
    templateUrl: './categories-banner.component.html',
    styles: []
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
    endSubs$ = new Subject();
    categoreis: ICategory[] | null = null;

    constructor(private categoriesService: CategoriesService) {}

    ngOnInit(): void {
        this.categoriesService
            .getCategoriesList()
            .pipe(takeUntil(this.endSubs$))
            .subscribe({
                next: (res) => {
                    this.categoreis = res.body;
                }
            });
    }

    ngOnDestroy() {
        this.endSubs$.next(0);
        this.endSubs$.complete();
    }
}
