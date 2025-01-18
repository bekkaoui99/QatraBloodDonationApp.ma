import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonateService} from "../../../services/donate.service";
import Swal from "sweetalert2";
import {DonateResponse} from "../../types/donateResponse";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent {

  donationResponse : DonateResponse[] = [];
  isDataFetched : boolean = false;
  donationForm!: FormGroup;
  bloodTypes = [
    { label: 'A+', value: 'A_PLUS' },
    { label: 'A-', value: 'A_MINUS' },
    { label: 'B+', value: 'B_PLUS' },
    { label: 'B-', value: 'B_MINUS' },
    { label: 'AB+', value: 'AB_PLUS' },
    { label: 'AB-', value: 'AB_MINUS' },
    { label: 'O+', value: 'O_PLUS' },
    { label: 'O-', value: 'O_MINUS' }
  ];
  cities: string[] = [];
  constructor(
    private fb: FormBuilder,
    private donateService: DonateService
  ) { }


  loadCities(): void {
    this.donateService.getAllCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  ngOnInit(): void {
    this.donationForm = this.fb.group({
      donationType: ['', Validators.required],
      bloodType: ['', Validators.required],
      city: ['', Validators.required]
    });

    this.loadCities();

  }

  thereIsNoDataForThisSearch : boolean = false;

  onSubmit(): void {
    if(this.donationForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    if (this.donationForm.valid) {
      const searchForDonationRequest = this.donationForm.value;
      this.donateService.getAllDonations(searchForDonationRequest).subscribe({
        next:(data) => {
          this.donationResponse = data;
          if(this.donationResponse.length === 0){
            this.thereIsNoDataForThisSearch = true;
          }else {
            this.thereIsNoDataForThisSearch = false;
          }
          this.isDataFetched = true
        }
      });
    }
  }

  get type() {
    return this.donationForm.get('type');
  }

  get bloodType() {
    return this.donationForm.get('bloodType');
  }

  get city() {
    return this.donationForm.get('city');
  }

  getDetailsOfDonation(donation: DonateResponse) {

    this.donateService.getDonationDetails(donation.id).subscribe({
      next:(phoneNumber) => {
        const message = 'Phone Number : ' + phoneNumber;
          Swal.fire({
          icon: 'info',
          title: 'Donation Details',
          text: message
        })
      },
      error:(error) => {
        const errorMessage = error.error.message
        Swal.fire({
          icon: 'error',
          title: 'Getting Donation Details Error',
          text: errorMessage
        });
      }
    })
  }

}
