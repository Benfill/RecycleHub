
import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const updateUser = createAction(
  '[User] Update User',
  props<{ newUser: Partial<User> }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ success:  string}>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const removeUserFailure = createAction(
  '[User] Remove User Failure',
  props<{ error: any }>()
);

export const removeUser = createAction(
  '[User] Remove User',
  props<{ userId: string }>()
);

export const removeUserSuccess = createAction(
  '[User] Remove User Success',
  props<{ success: string}>()
);


