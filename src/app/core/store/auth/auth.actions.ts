import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user:  User}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export const register = createAction(
  '[Auth] Register',
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User}>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

export const updateProfile = createAction(
  '[Auth] Update Profile',
  props<{ user: User }>()
);

export const updateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: User }>()
);

export const updateProfileFailure = createAction(
  '[Auth] Update Profile Failure',
  props<{ error: string }>()
);

export const deleteAccount = createAction(
  '[Auth] Delete Account',
  props<{ userId: string }>()
);

export const deleteAccountSuccess = createAction(
  '[Auth] Delete Account Success'
);

export const deleteAccountFailure = createAction(
  '[Auth] Delete Account Failure',
  props<{ error: string }>()
);

export const initAuth = createAction('[Auth] Initialize Auth');
export const initAuthSuccess = createAction(
  '[Auth] Initialize Auth Success',
  props<{ user: User }>()
);
