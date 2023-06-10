import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UsersActions from './users.actions';
import * as UsersFeature from './users.reducer';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { LocalstorageService } from '../services/localstorage.service';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
    buildUsersSession$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.buildUserSession),
            concatMap(() => {
                if (this.localstorageService.isValidToken()) {
                    const userId = this.localstorageService.getUserIdFromToken();
                    if (userId) {
                        return this.usersService.getUser(userId).pipe(
                            map((user) => {
                                if (user.body) {
                                    return UsersActions.buildUserSessionSuccess({ user: user.body });
                                } else {
                                    return UsersActions.buildUserSessionFailed();
                                }
                            }),
                            catchError(() => of(UsersActions.buildUserSessionFailed()))
                        );
                    } else {
                        return of(UsersActions.buildUserSessionFailed());
                    }
                } else {
                    return of(UsersActions.buildUserSessionFailed());
                }
            })
        )
    );

    constructor(private readonly actions$: Actions, private localstorageService: LocalstorageService, private usersService: UsersService) {}
}
