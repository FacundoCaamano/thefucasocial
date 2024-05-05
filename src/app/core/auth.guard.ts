import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { map, take } from 'rxjs';

// ver en github
// export const authGuard: CanActivateFn = (route, state) => {
    // const router = inject(Router);
    // const authService = inject(AuthService);

    // return authService.authUser().pipe(
    //   map((isAuth) => {
    //     if (isAuth) {
    //       return true;
    //     }else{
    //       return router.createUrlTree(['/auth/login']);
    //     }
    //   })
    // );
 //};
