import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { firstValueFrom, map, take, timer } from 'rxjs';

import { MessageService } from 'primeng/api';
import * as countriesLib from 'i18n-iso-countries';

import { IUser, UsersService } from '@itscode/users';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const require: any;

@Component({
    selector: 'admin-users-form',
    templateUrl: './users-form.component.html',
    styles: []
})
export class UsersFormComponent implements OnInit {
    editMode = false;
    form!: FormGroup;
    isSubmited = false;
    currentUserId = '';
    countries: unknown[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        this._initUserForm();
        this._getCountries();
        this._checkEditMode();
    }

    private _initUserForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            isAdmin: [false],
            street: [''],
            apartment: [''],
            zip: [''],
            city: [''],
            country: ['IR']
        });
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

    private _checkEditMode() {
        this.route.params.pipe(take(1)).subscribe((params) => {
            if (params['id']) {
                this.editMode = true;
                this.currentUserId = params['id'];

                this.usersService.getUser(params['id']).subscribe({
                    next: (res) => {
                        if (res.body) {
                            this.usersForm['name'].setValue(res.body.name),
                                this.usersForm['email'].setValue(res.body.email),
                                this.usersForm['isAdmin'].setValue(res.body.isAdmin),
                                this.usersForm['phone'].setValue(res.body.phone),
                                this.usersForm['street'].setValue(res.body.street),
                                this.usersForm['apartment'].setValue(res.body.apartment),
                                this.usersForm['zip'].setValue(res.body.zip),
                                this.usersForm['city'].setValue(res.body.city),
                                this.usersForm['country'].setValue(res.body.country);

                            this.usersForm['password'].setValidators([]);
                            this.usersForm['password'].updateValueAndValidity();
                        }
                    }
                });
            }
        });
    }

    onSubmit() {
        this.isSubmited = true;

        if (this.form.invalid) return;

        const user = {
            id: this.currentUserId,
            name: this.usersForm['name'].value,
            password: this.usersForm['password'].value,
            email: this.usersForm['email'].value,
            phone: this.usersForm['phone'].value,
            isAdmin: this.usersForm['isAdmin'].value,
            street: this.usersForm['street'].value,
            apartment: this.usersForm['apartment'].value,
            zip: this.usersForm['zip'].value,
            city: this.usersForm['city'].value,
            country: this.usersForm['country'].value
        };

        if (!this.editMode) this._addUser(user);
        else if (this.editMode) this._updateUser(user);
    }

    private _addUser(user: IUser) {
        this.usersService
            .createUser(user)
            .pipe(map((res) => res.body))
            .subscribe({
                next: (user: IUser | null) => {
                    this.messageService.add({ severity: 'success', summary: 'success', detail: `User ${user?.name} is created!` });
                    firstValueFrom(timer(1500)).then(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not created!' });
                    this.isSubmited = false;
                }
            });
    }

    private _updateUser(user: IUser) {
        this.usersService
            .updateUser(user)
            .pipe(map((res) => res.body))
            .subscribe({
                next: (user: IUser | null) => {
                    this.messageService.add({ severity: 'success', summary: 'success', detail: `User ${user?.name} is updated!` });
                    firstValueFrom(timer(1500)).then(() => {
                        this.location.back();
                    });
                },
                error: () => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User is not updated!' });
                    this.isSubmited = false;
                }
            });
    }

    get usersForm() {
        return this.form.controls;
    }
}
