import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const DashboardGuard = () => {
  const router = inject(Router);

  const token = sessionStorage.getItem('token_access');

  if (!token) {
    router.navigateByUrl('/auth/sign-in');
    return false;
  }

  return true;
};