import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonateService} from "../../../services/donate.service";
import {LocationResponse} from "../../types/LocationResponse";
import {TokenService} from "../../../services/token.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.css']
})
export class DonateComponent {

  donationForm!: FormGroup;
  cities: string[] = [];

  locations: LocationResponse[] = [];
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
  typeOptions = [
    { label: 'Donate', value: 'DONOR' },
    { label: 'Receive', value: 'TAKER' }
  ];

  constructor(
    private fb: FormBuilder,
    private donateService: DonateService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {

    const userEmail = this.tokenService.getUserEmail();
    this.donationForm = this.fb.group({
      email: [{ value: userEmail, disabled: true }, [Validators.required, Validators.email]],
      type: ['', Validators.required],
      bloodType: ['', Validators.required],
      city: ['', Validators.required],
      locationId: ['', Validators.required],
      startDateAvailability: ['', Validators.required],
      endDateAvailability: ['']
    });


    this.loadCities(); // Fetch cities on component initialization
    this.donationForm.get('city')?.valueChanges.subscribe(city => {
      this.loadLocations(city);
    });
  }

  loadCities(): void {
    this.donateService.getAllCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  loadLocations(city: string): void {
    this.donateService.getAllLocations(city).subscribe((data) => {
      this.locations = data;
    });
  }

  get email() {
    return this.donationForm.get('email');
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

  get locationId() {
    return this.donationForm.get('locationId');
  }

  get startDateAvailability() {
    return this.donationForm.get('startDateAvailability');
  }

  get endDateAvailability() {
    return this.donationForm.get('endDateAvailability');
  }

  onSubmit(): void {
    if (this.donationForm.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields!'
      });
      return;
    }
    if (this.donationForm.valid) {
      const createdDonationRequest = this.donationForm.getRawValue();
      this.donateService.createDonat(createdDonationRequest).subscribe({
        next:(createDonationResponse) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Donation Request Created successfully!'
          })
          const emailValue = this.donationForm.get('email')?.value; // Get the current email value
          this.donationForm.reset({
            email: emailValue // Preserve the email value
          });
        },
        error: (err) => {
          const errorMessage = err.error.message
          Swal.fire({
            icon: 'error',
            title: 'Create Error',
            text: errorMessage
          });
        }

      });
    }
  }

}
