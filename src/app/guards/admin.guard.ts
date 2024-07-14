import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);

   if (typeof localStorage !== 'undefined') {
      const admin = localStorage.getItem('admin')
      if (admin) {
         return true;
      } else {
         router.navigate(['/admin-login'])
         return false;
      }
   } else {
      router.navigate(['/admin-login'])
      return false;
   }
}