import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'users-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup;
    isSubmited = false;
    authError = false;
    authMessage = 'Email or password are wrong!';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private usersService: UsersService,
        private localStorageService: LocalstorageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit() {
        this.isSubmited = true;
        this.authError = false;

        if (this.loginFormGroup.invalid) return;

        const email = this.loginForm['email'].value;
        const passwrod = this.loginForm['password'].value;

        this.authService.login(email, passwrod).subscribe({
            next: (res) => {
                this.authError = false;
                if (res.body) this.localStorageService.setToken(res.body.token);
                this.usersService.initAppSession();
                this.router.navigate(['/']);
            },
            error: (res: HttpErrorResponse) => {
                this.authError = true;
                if (res.status !== 400) {
                    this.authMessage = 'Error in the Server, please try again later!';
                }
            }
        });
    }

    get loginForm() {
        return this.loginFormGroup.controls;
    }
}
