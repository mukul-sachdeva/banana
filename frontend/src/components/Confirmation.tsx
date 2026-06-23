import { BookingResponse } from '../types';
import { Check, Clipboard, Calendar, Clock, Car } from 'lucide-react';

interface ConfirmationProps {
  bookingDetails: BookingResponse;
  onBookAnother: () => void;
  onViewDashboard: () => void;
}

export default function Confirmation({ bookingDetails, onBookAnother, onViewDashboard }: ConfirmationProps) {

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingDetails.bookingId);
    alert('Booking ID copied to clipboard!');
  };

  return (
    <div className="confirmation-card">
      <div className="success-check-wrapper">
        <Check size={40} strokeWidth={3} />
      </div>

      <h1 className="conf-title">Request Submitted!</h1>
      <p className="conf-subtitle">
        {bookingDetails.message}
      </p>

      <div className="conf-details-box">
        <div className="conf-detail-item">
          <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clipboard size={16} /> Booking Reference
          </span>
          <span className="conf-val conf-booking-id" onClick={handleCopyId} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
            {bookingDetails.bookingId} <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'normal' }}>(copy)</span>
          </span>
        </div>

        <div className="conf-detail-item">
          <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Car size={16} /> Selected Vehicle
          </span>
          <span className="conf-val">{bookingDetails.carName}</span>
        </div>

        <div className="conf-detail-item">
          <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} /> Chosen Date
          </span>
          <span className="conf-val">{bookingDetails.preferredDate}</span>
        </div>

        <div className="conf-detail-item">
          <span className="conf-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Clock size={16} /> Time Slot
          </span>
          <span className="conf-val">{bookingDetails.preferredTimeSlot}</span>
        </div>
      </div>

      <div className="conf-actions">
        <button className="back-home-btn" onClick={onBookAnother}>
          Book Another Drive
        </button>
        <button
          className="select-car-btn"
          onClick={onViewDashboard}
          style={{ borderStyle: 'dashed' }}
        >
          View Bookings Console
        </button>
      </div>
    </div>
  );
}
