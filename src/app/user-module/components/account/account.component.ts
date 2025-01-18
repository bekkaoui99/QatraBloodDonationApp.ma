import {Component, OnInit} from '@angular/core';
import {DonateService} from "../../../services/donate.service";
import {DonateResponse} from "../../types/donateResponse";
import {data} from "autoprefixer";
import {ProfileResponse} from "../../types/ProfileResponse";
import {TokenService} from "../../../services/token.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  errorMessage!: string;
  showProfile = false;
  showBloodDonations = false;
  showRequestBenefits = false;

  isThereDonationsTypeDonorData: boolean = false;
  isThereDonationsTypeTakerData: boolean = false;
  donationsTypeDonor: DonateResponse[] = [];
  donationsTypeTaker: DonateResponse[] = [];
  paginatedDonationsTypeDonor: DonateResponse[] = [];
  paginatedDonationsTypeTaker: DonateResponse[] = [];
  profileData!: ProfileResponse;

  rowsPerPage = 3; // Number of items per page
  currentPageDonor = 0;
  currentPageTaker = 0;

  constructor(
    private donationService: DonateService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.showProfile = true;
    this.getAllDonationsTypeDonor();
    this.getAllDonationsTypeTaker();
    this.getProfileData();
  }

  getProfileData() {
    const userEmail = this.tokenService.getUserEmail();
    const userPhoneNumber = this.tokenService.getUserPhoneNumber();
    this.profileData = {
      email: userEmail ?? '',
      phoneNumber: userPhoneNumber ?? '',
    };
  }

  getAllDonationsTypeDonor() {
    this.donationService.getAllDonationsByType('DONOR').subscribe((data) => {
      this.donationsTypeDonor = data;
      this.isThereDonationsTypeDonorData = this.donationsTypeDonor.length !== 0;
      this.updatePaginatedDonations('donor');
    });
  }

  getAllDonationsTypeTaker() {
    this.donationService.getAllDonationsByType('TAKER').subscribe((data) => {
      this.donationsTypeTaker = data;
      this.isThereDonationsTypeTakerData = this.donationsTypeTaker.length !== 0;
      this.updatePaginatedDonations('taker');
    });
  }

  updatePaginatedDonations(type: 'donor' | 'taker') {
    const startIndex =
      type === 'donor'
        ? this.currentPageDonor * this.rowsPerPage
        : this.currentPageTaker * this.rowsPerPage;
    const data =
      type === 'donor' ? this.donationsTypeDonor : this.donationsTypeTaker;

    if (type === 'donor') {
      this.paginatedDonationsTypeDonor = data.slice(
        startIndex,
        startIndex + this.rowsPerPage
      );
    } else {
      this.paginatedDonationsTypeTaker = data.slice(
        startIndex,
        startIndex + this.rowsPerPage
      );
    }
  }

  deleteDonation(id: number, type: 'donor' | 'taker') {
    this.donationService.deleteDonationById(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Donation Deleted successfully!',
        });

        if (type === 'donor') {
          this.donationsTypeDonor = this.donationsTypeDonor.filter(
            (donation) => donation.id !== id
          );
          this.updatePaginatedDonations('donor');

          // Adjust page if no items are left on the current page
          if (
            this.paginatedDonationsTypeDonor.length === 0 &&
            this.currentPageDonor > 0
          ) {
            this.currentPageDonor--;
            this.updatePaginatedDonations('donor');
          }
        } else {
          this.donationsTypeTaker = this.donationsTypeTaker.filter(
            (donation) => donation.id !== id
          );
          this.updatePaginatedDonations('taker');

          // Adjust page if no items are left on the current page
          if (
            this.paginatedDonationsTypeTaker.length === 0 &&
            this.currentPageTaker > 0
          ) {
            this.currentPageTaker--;
            this.updatePaginatedDonations('taker');
          }
        }
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message ?? error.message ?? 'An error occurred';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.errorMessage,
        });
      },
    });
  }

  onPageChange(event: any, type: 'donor' | 'taker') {
    if (type === 'donor') {
      this.currentPageDonor = event.page;
      this.updatePaginatedDonations('donor');
    } else {
      this.currentPageTaker = event.page;
      this.updatePaginatedDonations('taker');
    }
  }

  showMyProfile() {
    this.showProfile = true;
    this.showRequestBenefits = false;
    this.showBloodDonations = false;
  }

  showMyBloodDonations() {
    this.showProfile = false;
    this.showRequestBenefits = false;
    this.showBloodDonations = true;
  }

  showMyRequestBenefits() {
    this.showProfile = false;
    this.showRequestBenefits = true;
    this.showBloodDonations = false;
  }

}
