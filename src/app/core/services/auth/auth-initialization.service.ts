import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from '../local-storage/local-storage.service';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store';

@Injectable({
  providedIn: 'root'
})
export class AuthInitializationService {
  constructor(
    private store: Store<AppState>,
    private localStorage: LocalStorageService
  ) {}

  initializeAuth() {
    const user = this.localStorage.getItem('user');
    if (user) {
      this.store.dispatch(AuthActions.initAuthSuccess({ user }));
    }
  }
}
