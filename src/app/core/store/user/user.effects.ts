import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      tap(() => console.log('update user')),
      mergeMap(({ newUser }) =>
        this.userService.updateUser(newUser as User).pipe(
          tap(response => {
            console.log('Login response received:', response);
          }),
          map(response => {
            console.log('Dispatching loginSuccess with user:', response);
            return AuthActions.loginSuccess({ user: response });
          }),
          catchError(error => {
            console.error('Login error:', error);
            return of(AuthActions.loginFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router
  ) {}
}
