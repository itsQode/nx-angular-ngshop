import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { MessageService } from 'primeng/api';

import { CategoriesService, Category } from '@itscode/products';
import { timer, firstValueFrom, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-categories-form',
    templateUrl: './categories-form.component.html',
    styles: []
})
export class CategoriesFormComponent implements OnInit {
    form!: FormGroup;
    isSubmited = false;
    editMode = false;
    currentCategoryId = '';

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            icon: [''],
            color: ['#000fff']
        });

        this._checkEditMode();
    }

    private _checkEditMode() {
        this.route.params.pipe(take(1)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentCategoryId = params['id'];

                this.categoriesService
                    .getCategoryById(params['id'])
                    .pipe(take(1))
                    .subscribe({
                        next: (res) => {
                            this.form.patchValue({
                                name: res.body?.name,
                                icon: res.body?.icon,
                                color: res.body?.color || '#fff'
                            });
                        },
                        error: () => {}
                    });
            }
        });
    }

    onSubmit() {
        if (this.isSubmited) return;

        if (this.form.invalid) return;

        this.isSubmited = true;

        const category: Category = {
            ...this.form.value,
            id: this.currentCategoryId
        };

        if (!this.editMode) this._createCategory(category);
        if (this.editMode) this._updateCategory(category);
    }

    private _createCategory(category: Category) {
        this.categoriesService.createCategory(category).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'success', detail: 'Category is created!' });
                firstValueFrom(timer(1500)).then(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not created!' });
                this.isSubmited = false;
            }
        });
    }

    private _updateCategory(category: Category) {
        this.categoriesService.updateCategoryById(category).subscribe({
            next: () => {
                this.messageService.add({ severity: 'success', summary: 'success', detail: `Category ${category.name} is updated!` });
                firstValueFrom(timer(2000)).then(() => {
                    this.location.back();
                });
            },
            error: () => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not updated!' });
                this.isSubmited = false;
            }
        });
    }

    get categoryForm() {
        return this.form.controls;
    }
}
