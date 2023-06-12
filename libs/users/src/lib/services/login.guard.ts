import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';

import { LocalstorageService } from './localstorage.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard {
    isCurrentUserExists = false;

    constructor(private localstorageService: LocalstorageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isValidToken = this.localstorageService.isValidToken();

        if (!isValidToken) {
            return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
}
