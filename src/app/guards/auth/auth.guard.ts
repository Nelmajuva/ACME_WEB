import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_, __) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token_access');
  if(token) {
    router.navigateByUrl('/dashboard');
    return true;
  }

  return false;
};
