import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');


export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserSuccess = createSelector(
  selectUserState,
  (state) => state.success
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

