import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

import { UsersService } from '@itscode/users';
import { IUser } from '@itscode/users';

declare const require: any;

@Component({
    selector: 'admin-users-list',
    templateUrl: './users-list.component.html',
    styles: []
})
export class UsersListComponent implements OnInit {
    users: IUser[] = [];

    constructor(
        private router: Router,
        private usersService: UsersService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._getUsers();
    }

    private _getUsers() {
        this.usersService
            .getUsers()
            .pipe(take(1))
            .subscribe({
                next: (res) => {
                    if (res.body) this.users = res.body;
                }
            });
    }

    onDeleteUser(userId: string) {
        this.confirmationService.confirm({
            header: 'Delete User',
            message: 'Are you sure that you want to delete this user?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.usersService.deleteUser(userId).subscribe({
                    next: (res) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'success',
                            detail: `${res.body}`
                        });
                        this._getUsers();
                    },
                    error: () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Product is not deleted!'
                        });
                    }
                });
            },
            reject: () => {}
        });
    }

    onUpdateUser(userId: string) {
        this.router.navigateByUrl(`users/form/${userId}`);
    }

    _getCountryName(code: string) {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/fa.json'));
        return countriesLib.getName(code, 'fa');
    }
}
