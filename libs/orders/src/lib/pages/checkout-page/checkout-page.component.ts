import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as countriesLib from 'i18n-iso-countries';

import { IOrderItem } from '../../models/order-item';
import { IOrder } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../orders-constants';

declare const require: any;

@Component({
    selector: 'orders-checkout-page',
    templateUrl: './checkout-page.component.html',
    styles: []
})
export class CheckoutPageComponent implements OnInit {
    checkoutFormGroup!: FormGroup;
    isSubmited = false;
    orderItems: IOrderItem[] = [];
    userId = '';
    countries: any[] = [];
    constructor(private formBuilder: FormBuilder, private router: Router, private cartService: CartService, private ordersService: OrdersService) {}

    ngOnInit(): void {
        this._initCheckoutForm();
        this._getCartItems();
        this._getCountries();
    }

    private _initCheckoutForm() {
        this.checkoutFormGroup = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            phone: [''],
            city: ['', Validators.required],
            country: ['IR', Validators.required],
            zip: ['', Validators.required],
            apartment: ['', Validators.required],
            street: ['', Validators.required]
        });
    }

    private _getCartItems() {
        const cart: Cart = this.cartService.getCart();

        if (cart.items)
            this.orderItems = cart.items.map((item) => {
                return {
                    product: item.productId,
                    quantity: item.quantity
                };
            });

        console.log(this.orderItems);
    }

    private _getCountries() {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/fa.json'));
        this.countries = Object.entries(countriesLib.getNames('fa', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    onBackToCart() {
        this.router.navigate(['/cart']);
    }

    placeOrder() {
        this.isSubmited = true;
        if (this.checkoutFormGroup.invalid) {
            return;
        }

        const order: IOrder = {
            orderItems: this.orderItems,
            shippingAddress1: this.checkoutForm['street'].value,
            shippingAddress2: this.checkoutForm['apartment'].value,
            city: this.checkoutForm['city'].value,
            zip: this.checkoutForm['zip'].value,
            country: this.checkoutForm['country'].value,
            phone: this.checkoutForm['phone'].value,
            status: Object.keys(ORDER_STATUS)[0],
            user: '646744220daa93c8ce8b624a',
            dateOrdered: `${Date.now()}`
        };

        this.ordersService.createOrder(order).subscribe({
            next: (res) => {
                if (res.body) {
                    this.router.navigate(['success']);
                    this.cartService.emptyCart();
                }
            }
        });
    }

    get checkoutForm() {
        return this.checkoutFormGroup.controls;
    }
}
