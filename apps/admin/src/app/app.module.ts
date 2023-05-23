import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

const UX_MODULE = [CardModule, ToolbarModule, ButtonModule, TableModule];

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

const routes: Routes = [
    {
        path: '',
        title: 'root path of admin app',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            }
        ]
    }
];

@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent],
    imports: [BrowserModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), ...UX_MODULE],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}