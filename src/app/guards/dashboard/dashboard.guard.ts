import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const dashboardGuard: CanActivateFn = (_, __) => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token_access');
  if(!token) {
    router.navigateByUrl('/auth/sign-in');
    return false;
  }

  return true;
};
