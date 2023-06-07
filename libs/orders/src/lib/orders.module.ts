import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';

const UX_MODULE = [BadgeModule, ButtonModule, InputNumberModule, InputTextModule, InputMaskModule, DropdownModule];

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-item/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';

export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, OrdersRoutingModule, FormsModule, ReactiveFormsModule, ...UX_MODULE],
    declarations: [CartIconComponent, CartPageComponent, OrderSummaryComponent, CheckoutPageComponent, ThankYouComponent],
    exports: [CartIconComponent, OrderSummaryComponent]
})
export class OrdersModule {
    constructor(private cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
