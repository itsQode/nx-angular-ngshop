import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

const UX_MODULE = [BadgeModule, ButtonModule, InputNumberModule];

import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-item/cart-icon.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { FormsModule } from '@angular/forms';

export const ordersRoutes: Route[] = [];

@NgModule({
    imports: [CommonModule, RouterModule, OrdersRoutingModule, FormsModule, ...UX_MODULE],
    declarations: [CartIconComponent, CartPageComponent],
    exports: [CartIconComponent]
})
export class OrdersModule {
    constructor(private cartService: CartService) {
        cartService.initCartLocalStorage();
    }
}
