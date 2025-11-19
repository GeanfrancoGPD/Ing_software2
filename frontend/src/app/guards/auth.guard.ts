import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): any => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.getData().pipe(
    // Si `getData` responde OK, dejamos pasar
    map(() => true),
    // Si falla (401, 403, error de red, etc.), redirigimos al login
    catchError((error) => {
      console.error('Error en authGuard:', error);

      const urlTree: UrlTree = router.createUrlTree(
        ['/login'],
        {
          queryParams: { redirectTo: state.url }
        }
      );
      return of(urlTree);
    })
  );
};
