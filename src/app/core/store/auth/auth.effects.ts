import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials.email, credentials.password).pipe(
          map((u) => u !== null ? AuthActions.loginSuccess({user: u}) : AuthActions.loginFailure({error: 'login failer.'})),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          console.log('LoginSuccess effect triggered with user:', user);
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ user }) =>
        this.authService.checkUserExists(user.email).pipe(
          mergeMap(exists => {
            if (exists) {
              return of(AuthActions.registerFailure({ error: 'User with this email already exists' }));
            }
            return this.authService.register(user).pipe(
              map(registeredUser => {
                if (registeredUser) {
                  localStorage.setItem('users', JSON.stringify([
                    ...JSON.parse(localStorage.getItem('users') || '[]'),
                    registeredUser
                  ]));
                  return AuthActions.registerSuccess({ user: registeredUser });
                }
                return AuthActions.registerFailure({ error: 'Registration failed' });
              }),
              catchError(error => {
                console.error('Registration error:', error);
                return of(AuthActions.registerFailure({
                  error: error.message || 'An error occurred during registration'
                }));
              })
            );
          }),
          catchError(error => {
            console.error('Check user exists error:', error);
            return of(AuthActions.registerFailure({
              error: error.message || 'An error occurred while checking user existence'
            }));
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(() => {
          this.router.navigate(['/auth/login']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authService.logout();
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => this.router.navigate(['/auth/login']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
