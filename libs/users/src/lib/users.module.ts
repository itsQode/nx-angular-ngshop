import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

const UX_MODULES = [InputTextModule, ButtonModule, ToastModule];

const routes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, RouterModule, RouterModule.forChild(routes), ...UX_MODULES],
    declarations: [LoginComponent],
    providers: [MessageService]
})
export class UsersModule {}
