import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.isLoggedIn()) {
      router.navigateByUrl('/login')
      return false
  }
  // router.navigateByUrl('/')
  return true
}
