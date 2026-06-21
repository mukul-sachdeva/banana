import React, { useState } from 'react';
import { Car, BookingRequest, BookingResponse } from '../types';
import { createBooking } from '../api';
import { Calendar, User, Phone, Mail, MapPin, Clock, ArrowLeft, ShieldCheck } from 'lucide-react';

interface BookingFormProps {
  selectedCar: Car;
  onBack: () => void;
  onBookingSuccess: (response: BookingResponse) => void;
}

const TIME_SLOTS = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM',
  '05:00 PM - 07:00 PM'
];

const CITIES = [
  'Mumbai',
  'Delhi',
  'Bengaluru',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata'
];

export default function BookingForm({ selectedCar, onBack, onBookingSuccess }: BookingFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Today's date in YYYY-MM-DD format for input "min" attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!name.trim()) return setError('Please enter your name.');
    if (!phone.trim() || phone.length < 8) return setError('Please enter a valid phone number (at least 8 digits).');
    if (!city) return setError('Please select a showroom city.');
    if (!preferredDate) return setError('Please select a preferred test drive date.');
    if (!preferredTimeSlot) return setError('Please select a time slot.');

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
      onBookingSuccess(response);
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
                  min={todayStr}
                  className="form-input"
                  style={{ paddingLeft: '38px' }}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
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
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot}
                  className={`time-slot-pill ${preferredTimeSlot === slot ? 'selected' : ''}`}
                  onClick={() => setPreferredTimeSlot(slot)}
                >
                  {slot.replace(' - ', '\n')}
                </div>
              ))}
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
