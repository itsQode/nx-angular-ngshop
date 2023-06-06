import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from 'primeng/accordion';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@itscode/products';
import { UiModule } from '@itscode/ui';
import { OrdersModule } from '@itscode/orders';

const UX_MODULES = [AccordionModule];

@NgModule({
    declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, ...UX_MODULES, ProductsModule, UiModule, OrdersModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
