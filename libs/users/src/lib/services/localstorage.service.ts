import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

const TOKEN = 'jwtToken';

@Injectable({
    providedIn: 'root'
})
export class LocalstorageService {
    setToken(data: string) {
        localStorage.setItem(TOKEN, data);
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }

    isValidToken() {
        const token = this.getToken();

        if (token) {
            const tokenDecod = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            return !this._isTokenExpired(tokenDecod.exp);
        } else {
            return false;
        }
    }

    getUserIdFromToken() {
        const token = this.getToken();
        if (token) {
            const tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            if (tokenDecode) {
                return tokenDecode.userId;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    private _isTokenExpired(expiration: number) {
        return Math.floor(Date.now() / 1000) >= expiration;
    }
}
