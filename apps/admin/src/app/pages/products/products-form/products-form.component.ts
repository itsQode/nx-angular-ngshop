import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { firstValueFrom, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { CategoriesService, ICategory, IProduct, ProductsService } from '@itscode/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'admin-product-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editMode = false;
    form!: FormGroup;
    isSubmited = false;
    categories!: ICategory[];
    imageDisplay: string | ArrayBuffer = '';
    currentProductId = '';

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private productsService: ProductsService,
        private location: Location,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
        this._checkEditMode();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            brand: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            countInStock: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService
            .getCategoriesList()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    this.categories = res.body ?? [];
                }
            });
    }

    private _checkEditMode() {
        this.route.params.pipe(take(1)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentProductId = params['id'];

                this._getProduct();
            }
        });
    }

    private _getProduct() {
        this.productsService
            .getProductById(this.currentProductId)
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    this.productsForm['name'].setValue(res.body?.name);
                    this.productsForm['brand'].setValue(res.body?.brand);
                    this.productsForm['price'].setValue(res.body?.price);
                    this.productsForm['category'].setValue(res.body?.category?.id);
                    this.productsForm['countInStock'].setValue(res.body?.countInStock);
                    this.productsForm['description'].setValue(res.body?.description);
                    this.productsForm['richDescription'].setValue(res.body?.richDescription);
                    this.productsForm['isFeatured'].setValue(res.body?.isFeatured);
                    if (res.body?.image) this.imageDisplay = res.body.image;

                    this.productsForm['image'].setValidators([]);
                    this.productsForm['image'].updateValueAndValidity();
                }
            });
    }

    onSubmit() {
        this.isSubmited = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();

        Object.keys(this.productsForm).map((key) => {
            productFormData.append(key, this.productsForm[key].value);
        });

        if (!this.editMode) this._addProduct(productFormData);
        else if (this.editMode) this._updateProduct(productFormData);
    }

    private _addProduct(productData: FormData) {
        this.productsService
            .createProduct(productData)
            .pipe(map((res) => res.body))
            .subscribe({
                next: (product: IProduct | null) => {
                    this.messageService.add({ severity: 'success', summary: 'success', detail: `Product ${product?.name} is created!` });
                    firstValueFrom(timer(1500)).then(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not created!' });
                    this.isSubmited = false;
                }
            });
    }

    private _updateProduct(productData: FormData) {
        this.productsService
            .updateProductById(productData, this.currentProductId)
            .pipe(map((res) => res.body))
            .subscribe({
                next: (product: IProduct | null) => {
                    this.messageService.add({ severity: 'success', summary: 'success', detail: `Product ${product?.name} is updated!` });
                    firstValueFrom(timer(1500)).then(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product is not updated!' });
                    this.isSubmited = false;
                }
            });
    }

    onImageUpload(event: Event) {
        const file = (event.target as HTMLInputElement).files?.item(0);

        if (file) {
            this.form.patchValue({ image: file });
            this.form.get('image')?.updateValueAndValidity();
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.result) this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    get productsForm() {
        return this.form.controls;
    }
}
