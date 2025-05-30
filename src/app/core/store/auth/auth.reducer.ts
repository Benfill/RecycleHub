import { createReducer, on } from '@ngrx/store';
import * as AuthActions  from './auth.actions'
import { User } from '../../models/user.model';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { user }) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return {
      ...state,
      user,
      loading: false,
      error: null,
      auth: true
    };
  }),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logout, () => initialState),

  on(AuthActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.updateProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  on(AuthActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logoutSuccess, state => ({
    ...state,
    user: null,
    loading: false,
    error: null
  })),

  on(AuthActions.deleteAccountSuccess, () => initialState),

  on(AuthActions.deleteAccountFailure, (state, { error }) => ({
    ...state,
    error,
    auth: false
  })),

  on(AuthActions.initAuthSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),
);
