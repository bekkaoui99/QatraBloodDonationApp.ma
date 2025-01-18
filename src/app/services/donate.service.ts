import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {DonationRequest} from "../user-module/types/donateRequest";
import {DonateResponse} from "../user-module/types/donateResponse";
import {LocationResponse} from "../user-module/types/LocationResponse";
import {DonationSearchRequest} from "../user-module/types/DonationSearchRequest";

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  private readonly REST_API_URL = environment.REST_API_URL;
  constructor(private http: HttpClient) {

  }



  public getAllDonationsByType(type: string):Observable<DonateResponse[]>{
    return this.http.get<DonateResponse[]>(`${this.REST_API_URL}/donations/user/${type}`);
  }

  public getAllDonations(donationSearchRequest: DonationSearchRequest):Observable<DonateResponse[]>{
    return this.http.post<DonateResponse[]>(`${this.REST_API_URL}/donations/0/10` , donationSearchRequest);
  }

  public deleteDonationById(id: number):Observable<number>{
    return this.http.delete<number>(`${this.REST_API_URL}/donations/${id}` );
  }

  public getDonationDetails(id: number): Observable<string>{
    return this.http.get<string>(`${this.REST_API_URL}/donations/${id}/phoneNumber` , { responseType: 'text' as 'json' } );
  }

  public getAllCities(): Observable<string[]>{
    return this.http.get<string[]>(`${this.REST_API_URL}/locations/cities`);
  }

  public getAllLocations(selectedCity: string): Observable<LocationResponse[]>{
    return this.http.get<LocationResponse[]>(`${this.REST_API_URL}/locations/city/${selectedCity}`);
  }

  createDonat(donationRequest: DonationRequest): Observable<DonateResponse> {
    return  this.http.post<DonateResponse>(`${this.REST_API_URL}/donations`, donationRequest);
  }


}
