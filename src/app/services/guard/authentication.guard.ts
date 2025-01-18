import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {data} from "autoprefixer";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  let isAuthenticated = false;
  authenticationService.isUserAuthenticated();
  authenticationService.authenticatedSubject.subscribe({
    next:(data) => {
      isAuthenticated = data;
      if(!isAuthenticated){
        router.navigateByUrl("/auth/login");
        return
      }
    }
  })

  return isAuthenticated;
};
