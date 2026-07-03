import React, { useState } from 'react';
import { Car, BookingRequest, BookingResponse } from '../types';
import { createBooking } from '../api';
import { Calendar, User, Phone, Mail, MapPin, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useSEO } from '../useSEO';

interface BookingFormProps {
  selectedCar: Car;
  onBack: () => void;
  onBookingSuccess: (response: BookingResponse) => void;
}

const getLocalDateString = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getEarliestSelectableSlot = () => {
  const now = new Date();
  const earliest = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const businessStart = new Date(earliest);
  businessStart.setHours(9, 0, 0, 0);
  const businessEnd = new Date(earliest);
  businessEnd.setHours(17, 0, 0, 0); // 5:00 PM is start of last slot (5pm-6pm)

  if (earliest <= businessStart) {
    return businessStart;
  }

  if (earliest > businessEnd) {
    const nextDay = new Date(businessStart);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }

  return earliest;
};

const generateAvailableSlots = (selectedDate: string) => {
  const slots = [];
  const now = new Date();
  const earliestAllowed = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  // Parse YYYY-MM-DD locally to avoid UTC conversion shifts
  const parts = selectedDate.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);
  const selected = new Date(year, month, day);

  for (let hour = 9; hour < 18; hour++) {
    const slotStart = new Date(selected);
    slotStart.setHours(hour, 0, 0, 0);

    const slotEnd = new Date(selected);
    slotEnd.setHours(hour + 1, 0, 0, 0);

    if (slotStart < earliestAllowed) {
      continue;
    }

    if (slotStart <= now) {
      continue;
    }

    const start = slotStart.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const end = slotEnd.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    slots.push(`${start} - ${end}`);
  }

  return slots;
};

const CITIES = [
  'Ludhiana'
];

export default function BookingForm({ selectedCar, onBack, onBookingSuccess }: BookingFormProps) {
  useSEO({
    title: `Book Test Drive: ${selectedCar.brand} ${selectedCar.name} | Flowzap`,
    description: `Schedule a free home test drive for the ${selectedCar.brand} ${selectedCar.name}. Choose your date and time slot.`,
  });

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableSlots = preferredDate
    ? generateAvailableSlots(preferredDate)
    : [];

  const minSelectableDate = getLocalDateString(getEarliestSelectableSlot());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!name.trim()) return setError('Please enter your name.');
    if (!phone.trim() || phone.length < 8) return setError('Please enter a valid phone number (at least 8 digits).');
    if (!city) return setError('Please select a showroom city.');
    if (!preferredDate) return setError('Please select a preferred test drive date.');
    if (!preferredTimeSlot) return setError('Please select a time slot.');

    // Validate 24-hour buffer in local timezone on submission
    const parts = preferredDate.split('-');
    const yr = parseInt(parts[0], 10);
    const mo = parseInt(parts[1], 10) - 1;
    const dy = parseInt(parts[2], 10);
    const selectedDateTime = new Date(yr, mo, dy);
    
    const match = preferredTimeSlot.match(/^(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      let hr = parseInt(match[1], 10);
      const min = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hr < 12) hr += 12;
      if (ampm === 'AM' && hr === 12) hr = 0;
      selectedDateTime.setHours(hr, min, 0, 0);
    }
    
    const diffMs = selectedDateTime.getTime() - Date.now();
    if (diffMs < 24 * 60 * 60 * 1000) {
      return setError('Selected test drive slot must be at least 24 hours in the future.');
    }

    const bookingPayload: BookingRequest = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      city,
      carId: selectedCar.id,
      preferredDate,
      preferredTimeSlot
    };

    try {
      setSubmitting(true);
      const response = await createBooking(bookingPayload);
      onBookingSuccess({
        ...response,
        customerName: name.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim() || undefined,
        city,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="nav-btn" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', paddingLeft: 0 }}>
          <ArrowLeft size={16} /> Back to fleet selection
        </button>
      </div>

      <div className="page-header" style={{ marginBottom: '2rem' }}>
        <h2 className="page-title">Book a Test Drive</h2>
        <p className="page-subtitle">Provide your contact info and preferred schedule below.</p>
      </div>

      <div className="booking-layout">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="form-card">
          {error && <div className="error-banner">{error}</div>}

          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={20} color="#2563EB" /> Contact Information
          </h3>

          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                <User size={16} />
              </span>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                style={{ paddingLeft: '38px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                  <Phone size={16} />
                </span>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 (555) 000-0000"
                  style={{ paddingLeft: '38px' }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <p className="form-field-hint">Your details are only used to schedule your test drive.</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address (Optional)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  style={{ paddingLeft: '38px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginTop: '2.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="#2563EB" /> Booking Preferences
          </h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="city">Select City *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', zIndex: 1 }}>
                  <MapPin size={16} />
                </span>
                <select
                  id="city"
                  className="form-input"
                  style={{ paddingLeft: '38px', appearance: 'none' }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                >
                  <option value="">Choose Showroom Location</option>
                  {CITIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">Preferred Date *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                  <Calendar size={16} />
                </span>
                <input
                  id="date"
                  type="date"
                  min={minSelectableDate}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={preferredDate}
                  onChange={(e) => {
                    setPreferredDate(e.target.value);
                    setPreferredTimeSlot('');
                  }}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={16} /> Preferred Time Slot *
            </label>
            <div className="time-slot-grid">
              {!preferredDate ? (
                <p>Please select a date first</p>
              ) : availableSlots.length === 0 ? (
                <p>No slots available for this day</p>
              ) : (
                availableSlots.map((slot) => (
                  <div
                    key={slot}
                    className={`time-slot-pill ${preferredTimeSlot === slot ? 'selected' : ''
                      }`}
                    onClick={() => setPreferredTimeSlot(slot)}
                  >
                    {slot}
                  </div>
                ))
              )}
            </div>
          </div>

          <button type="submit" className="submit-booking-btn" disabled={submitting}>
            {submitting ? (
              <>
                <div className="spinner"></div> Processing Request...
              </>
            ) : (
              <>
                Confirm Booking Request <ShieldCheck size={18} />
              </>
            )}
          </button>
        </form>

        {/* Selected Car Summary */}
        <div className="summary-card">
          <h3 className="summary-title">Booking Summary</h3>
          <div className="summary-car-preview">
            <img src={selectedCar.image_url} alt={selectedCar.name} className="summary-car-img" />
            <div>
              <div className="summary-car-brand">{selectedCar.brand}</div>
              <div className="summary-car-name">{selectedCar.name}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div className="summary-detail-row">
              <span className="summary-label">Transmission:</span>
              <span className="summary-val">{selectedCar.transmission}</span>
            </div>
            <div className="summary-detail-row">
              <span className="summary-label">Fuel Type:</span>
              <span className="summary-val">{selectedCar.fuel_type}</span>
            </div>
            <div className="summary-detail-row">
              <span className="summary-label">Location:</span>
              <span className="summary-val">{city || 'Not Selected'}</span>
            </div>
            <div className="summary-detail-row">
              <span className="summary-label">Date:</span>
              <span className="summary-val">{preferredDate || 'Not Selected'}</span>
            </div>
            <div className="summary-detail-row">
              <span className="summary-label">Time Slot:</span>
              <span className="summary-val" style={{ fontSize: '0.8rem' }}>{preferredTimeSlot || 'Not Selected'}</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.8rem', color: '#64748b' }}>
            <span style={{ color: 'var(--primary)', marginTop: '2px' }}><ShieldCheck size={16} /></span>
            <p>Your details are secure. We only share them with the certified dealership assigned to your drive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
