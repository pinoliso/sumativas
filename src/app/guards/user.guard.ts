import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);

   if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user')
      if (user) {
         return true;
      } else {
         router.navigate(['/login'])
         return false;
      }
   } else {
      router.navigate(['/login'])
      return false;
   }
}