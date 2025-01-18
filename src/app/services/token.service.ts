import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public setToken(token:string){
    localStorage.setItem("token" , token);
  }

  getToken(): string | null {
    return localStorage.getItem("token") as string;
  }


  public saveToken(token:string ){
    this.setToken(token);
  }

  public saveData(token:string, email:string, number:string ){
    this.setToken(token);
    this.setUserEmail(email);
    this.setUserPhoneNumber(number);
  }

  clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('email');
  }

  getUserEmail(): string | null {
    return localStorage.getItem("email") as string | null;
  }

  public setUserEmail(email:string){
    localStorage.setItem("email" , email);
  }


  getUserPhoneNumber(): string | null {
    return localStorage.getItem("phoneNumber") as string | null;
  }

  public setUserPhoneNumber(phoneNumber:string){
    localStorage.setItem("phoneNumber" , phoneNumber);
  }


}
