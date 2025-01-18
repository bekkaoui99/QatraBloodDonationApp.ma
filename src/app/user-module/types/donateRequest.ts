export interface DonationRequest {
  id?: number;
  email: string;
  type: string;
  bloodType?: string;
  locationId?: number;
  startDateAvailability: string;
  endDateAvailability?: string;
}
