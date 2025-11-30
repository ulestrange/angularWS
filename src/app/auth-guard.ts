import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from './auth-custom.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.currentUser$.value?.role === 'admin') {
    return true;
  } else {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
};
