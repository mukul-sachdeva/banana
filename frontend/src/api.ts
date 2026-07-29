import { Car, BookingRequest, BookingResponse, BookingRecord, CityRequestPayload, CityRequestResponse, CityRequestStat, CityRequestRecord } from './types';

// Use environment variable for API URL or fall back to window.location origin for relative paths/proxies
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function getCars(): Promise<Car[]> {
  const response = await fetch(`${API_BASE}/api/cars`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to retrieve car listings.');
  }
  return response.json();
}

export async function createBooking(bookingData: BookingRequest): Promise<BookingResponse> {
  const response = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit test drive request.');
  }
  return response.json();
}

export async function getAdminBookings(): Promise<BookingRecord[]> {
  const response = await fetch(`${API_BASE}/api/bookings/admin`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to retrieve booking list.');
  }
  return response.json();
}

export async function updateBookingStatus(id: number, status: string): Promise<{ message: string; booking: { bookingId: string; status: string } }> {
  const response = await fetch(`${API_BASE}/api/bookings/admin/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to update booking status.');
  }
  return response.json();
}

export async function submitCityRequest(data: CityRequestPayload): Promise<CityRequestResponse> {
  const response = await fetch(`${API_BASE}/api/city-requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit city request.');
  }
  return response.json();
}

export async function getCityRequestStats(): Promise<CityRequestStat[]> {
  const response = await fetch(`${API_BASE}/api/city-requests/admin/stats`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to retrieve city demand statistics.');
  }
  return response.json();
}

export async function getCityRequestList(city?: string): Promise<CityRequestRecord[]> {
  const url = city ? `${API_BASE}/api/city-requests/admin/list?city=${encodeURIComponent(city)}` : `${API_BASE}/api/city-requests/admin/list`;
  const response = await fetch(url);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to retrieve city request list.');
  }
  return response.json();
}

