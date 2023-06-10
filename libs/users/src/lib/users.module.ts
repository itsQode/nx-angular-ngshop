import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromUsers from './state/users.reducer';
import { UsersEffects } from './state/users.effects';
import { UsersFacade } from './state/users.facade';

const UX_MODULES = [InputTextModule, ButtonModule, ToastModule];

const routes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild(routes),
        ...UX_MODULES,
        StoreModule.forFeature(fromUsers.USERS_FEATURE_KEY, fromUsers.usersReducer),
        EffectsModule.forFeature([UsersEffects])
    ],
    declarations: [LoginComponent],
    providers: [MessageService, UsersFacade]
})
export class UsersModule {}
