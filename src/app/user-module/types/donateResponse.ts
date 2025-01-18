export interface DonateResponse {
  id: number;
  type: string;
  bloodType?: string;
  city: string;
  locationId?: number;
  locationName: string;
  address: string;
  addressUrl?: string;
  startDateAvailability: string;
  endDateAvailability: string;
  createdAt: string;
}
