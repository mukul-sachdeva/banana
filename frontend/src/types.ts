export interface Car {
  id: string;
  name: string;
  brand: string;
  transmission: string;
  fuel_type: string;
  price_range: string;
  image_url: string;
}

export interface BookingRequest {
  name: string;
  phone: string;
  email?: string;
  city: string;
  carId: string;
  preferredDate: string;
  preferredTimeSlot: string;
}

export interface BookingResponse {
  bookingId: string;
  carName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  message: string;
  // Customer details merged from form state for the receipt (not from API)
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  city?: string;
}

export interface BookingRecord {
  id: number;
  formatted_id: string;
  city: string;
  preferred_date: string;
  preferred_time_slot: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  car_name: string;
  car_brand: string;
}

export interface CityRequestPayload {
  city: string;
  fullName?: string;
  phone?: string;
  email?: string;
  interestedCars?: string[];
  purchaseTimeline?: string;
  source?: string;
}

export interface CityRequestResponse {
  message: string;
  requestId: number;
  city: string;
  createdAt: string;
}

export interface CityRequestStat {
  city: string;
  count: number;
}

export interface CityRequestRecord {
  id: number;
  city: string;
  full_name: string | null;
  phone: string | null;
  email: string | null;
  interested_cars: string[] | null;
  purchase_timeline: string | null;
  source: string;
  created_at: string;
}

