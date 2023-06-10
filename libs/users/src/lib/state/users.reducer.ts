import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as UsersActions from './users.actions';
import { UsersEntity } from './users.models';
import { IUser } from '../models/user';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
    user: IUser | null;
    isAuthenticated: boolean | null;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersStete: UsersState = {
    user: null,
    isAuthenticated: null
};

const reducer = createReducer(
    initialUsersStete,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({ ...state, user: action.user, isAuthenticated: true })),
    on(UsersActions.buildUserSessionFailed, (state) => ({ ...state, user: null, isAuthenticated: false }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
    return reducer(state, action);
}
