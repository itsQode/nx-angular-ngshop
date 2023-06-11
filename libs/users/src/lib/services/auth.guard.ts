import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { Buffer } from 'buffer';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard  {
    constructor(private router: Router, private localstorageService: LocalstorageService) {}
    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.localstorageService.getToken();
        if (!token) {
            return this.router.createUrlTree(['/login']);
        } else {
            const tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            if (tokenDecode.isAdmin && !this._isTokenExpired(tokenDecode.exp)) return true;
            return this.router.createUrlTree(['/login']);
        }
    }

    private _isTokenExpired(expiration: number) {
        return Math.floor(Date.now() / 1000) >= expiration;
    }
}
