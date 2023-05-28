import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '@env/environment';
import { IRestPayload } from '@itscode/products';
import { Observable } from 'rxjs';
import { IUser } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    apiURLUsers = env.apiURL + 'users/';

    constructor(private http: HttpClient) {}

    getUsers(): Observable<IRestPayload<IUser[]>> {
        return this.http.get<IRestPayload<IUser[]>>(this.apiURLUsers);
    }

    getUser(userId: string): Observable<IRestPayload<IUser>> {
        return this.http.get<IRestPayload<IUser>>(`${this.apiURLUsers}${userId}`);
    }

    createUser(user: IUser): Observable<IRestPayload<IUser>> {
        return this.http.post<IRestPayload<IUser>>(this.apiURLUsers, user);
    }

    updateUser(user: IUser): Observable<IRestPayload<IUser>> {
        return this.http.put<IRestPayload<IUser>>(`${this.apiURLUsers}${user.id}`, user);
    }

    deleteUser(userId: string): Observable<IRestPayload<string>> {
        return this.http.delete<IRestPayload<string>>(`${this.apiURLUsers}${userId}`);
    }
}
