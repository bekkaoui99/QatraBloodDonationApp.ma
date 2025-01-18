import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from "../token.service";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  #tokenService = inject(TokenService);
  #authService = inject(AuthenticationService);
  #router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // exclude /auth endpoint
    if (
      !request.url.includes('/login') &&
      !request.url.includes('/assets') &&
      !request.url.includes('/accounts/reset-password') &&
      !request.url.includes('/accounts/recover-password-url') &&
      !request.url.includes('/refresh-token')
    ) {
      let token = this.#tokenService.getToken();
      // check if the token is expired
      if (this.#authService.isTokenExpired(token as string)) {
        this.#router.navigateByUrl("/auth/login");
      }
      else {
        // if the token not expired
        const newRequest = request.clone({
          headers: request.headers.set('Authorization', 'Bearer ' + token),
        });
        return next.handle(newRequest);
      }
    }

    return next.handle(request);

  }

}
