import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from '../../services';
import { IAppState } from '../../interfaces';
import { setUser } from '../../components/auth/+state/auth.actions';

export const DashboardGuard = () => {
  const router = inject(Router);
  const store = inject(Store<IAppState>);
  const authService = inject(AuthService);

  return authService.me().subscribe({
    next: (res) => {
      store.dispatch(setUser({ value: res.message.user }));
      sessionStorage.setItem('token_access', res.message.access_token);
      return true;
    },
    error: () => {
      sessionStorage.clear();
      router.navigateByUrl('/auth/sign-in');
      return false;
    },
  });
};
