import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { IRestPayload } from '../interfaces/rest-payload.interface';
import { IAuth } from '../models/auth';
import { LocalstorageService } from './localstorage.service';
import { Router } from '@angular/router';
import { UsersFacade } from '../state/users.facade';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiURLUsers = environment.apiURL + 'users';
    constructor(private http: HttpClient, private localstorageService: LocalstorageService, private router: Router, private usersFacade: UsersFacade) {}

    login(email: string, password: string): Observable<IRestPayload<IAuth>> {
        return this.http.post<IRestPayload<IAuth>>(`${this.apiURLUsers}/login`, { email, password });
    }

    logout() {
        this.localstorageService.removeToken();
        this.usersFacade.logOut();
        this.router.navigate(['/login']);
    }
}
