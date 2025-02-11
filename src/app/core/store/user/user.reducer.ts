import { User } from './../../models/user.model';
import { createReducer, on } from '@ngrx/store';
import * as UserActions  from './user.actions'

export interface UserState {
  user: User | null;
  loading: boolean;
  error: any | null;
  success: string | null;
  userId: string | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  userId: null,
  success: null
};

export const userReducer = createReducer(
  initialState,

  on(UserActions.updateUser, (state, {newUser}) => ({
    ...state,
    user: newUser as User,
    loading: true,
    error: null
  })),

  on(UserActions.updateUserSuccess, (state, {success}) => ({
    ...state,
    loading: false,
    success
  })),

  on(UserActions.updateUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),


  on(UserActions.removeUser, (state, {userId}) => ({
    ...state,
    loading: true,
    userId
  })),


  on(UserActions.removeUserSuccess, (state, {success}) => ({
    ...state,
    loading: false,
    success
  })),

  on(UserActions.removeUserFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
);
