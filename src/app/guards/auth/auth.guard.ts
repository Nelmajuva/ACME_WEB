import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token_access');

  if (token) {
    router.navigateByUrl('/');
    return false;
  }

  return true;
};