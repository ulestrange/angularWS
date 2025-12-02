import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthCustomService } from './auth-custom.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.isAuthenticated$.value) {
    return true;
  } else {
    return router.createUrlTree(['/login'], {
              queryParams: { returnUrl: state.url }});
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  if (authService.currentUser$.value?.role === 'admin') {
    return true;
  } else {
      return router.createUrlTree(['/login'], {
              queryParams: { returnUrl: state.url }});
  }
};


/// note - a more 'functional way' of writing the auth guard

export const authGuard2: CanActivateFn = (route, state) => {
  const authService = inject(AuthCustomService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    // Use RxJS map to return true or UrlTree
    map(isAuth => {
      return isAuth
        ? true
        : router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
          });
    })
  );
};



