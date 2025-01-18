import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, catchError, Observable, of, switchMap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {TokenService} from "./token.service";
import {LoginRequest} from "../authentication/types/LoginRequest";
import {LoginResponse} from "../authentication/types/LoginResponse";
import {RegistrationRequest} from "../authentication/types/RegistrationRequest";
import {jwtDecode} from "jwt-decode";
import {JwtCustomPayload} from "../authentication/types/JwtCustomPayload";
import {ResetPassword} from "../authentication/types/ResetPassword";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private readonly REST_API_AUTH_URL = environment.REST_API_AUTH_URL;

  public authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public email: string | undefined | null = null;
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.REST_API_AUTH_URL}/authenticate`, loginRequest);
  }

  forgetPassword(email: string): Observable<string> {
    return this.http.get<string>(`${this.REST_API_AUTH_URL}/recover-password-url/${email}`,
      { responseType: 'text' as 'json' });
  }

  resetPassword(resetPassword: ResetPassword, token: string): Observable<LoginResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<LoginResponse>(
      `${this.REST_API_AUTH_URL}/reset-password`,
      resetPassword,
      { headers }
    );
  }

  public logout(): void {
    this.authenticatedSubject.next(false);
    this.router.navigateByUrl('/landingPage');
    this.tokenService.clearTokens();
  }


  public register(registrationRequest: RegistrationRequest): Observable<RegistrationRequest> {
    return this.http.post<RegistrationRequest>(`${this.REST_API_AUTH_URL}/register`, registrationRequest);
  }


  isTokenExpired(token: string | null | undefined): boolean {
    if (typeof token !== 'string') {
      console.error("Invalid token specified: must be a string");
      this.router.navigateByUrl("/auth/login");
      return true;
    }
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      if (!exp) {
        return true;
      }
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (exp < currentTime)
        console.log("token expired")
      return exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  }



  public loadingData(loginResponse: LoginResponse): void {
    this.tokenService.saveData(loginResponse.token, loginResponse.email , loginResponse.phoneNumber);

    if(!this.isTokenExpired(this.tokenService.getToken())){
      this.authenticatedSubject.next(true);
    }

  }

  public getUserEmail(accessToken: string): string | undefined | null {
    const decoded = jwtDecode<JwtCustomPayload>(accessToken);
    return decoded ? decoded.sub : null;
  }


  public isUserAuthenticated(){
    if(!this.isTokenExpired(this.tokenService.getToken())){
      this.authenticatedSubject.next(true);
    }
  }



}
