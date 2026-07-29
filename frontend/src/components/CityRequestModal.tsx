import React, { useState, useEffect } from 'react';
import { X, MapPin, CheckCircle2, Car as CarIcon } from 'lucide-react';
import { submitCityRequest } from '../api';
import { trackEvent } from '../analytics/analytics';
import { EVENTS } from '../analytics/constants';

interface CityRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  source?: string;
}

const PURCHASE_TIMELINES = [
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Just exploring',
];

export default function CityRequestModal({ isOpen, onClose, source = 'website' }: CityRequestModalProps) {
  const [city, setCity] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interestedCarsInput, setInterestedCarsInput] = useState('');
  const [purchaseTimeline, setPurchaseTimeline] = useState<string>('1–3 months');

  const [submitting, setSubmitting] = useState(false);
  const [submittedCity, setSubmittedCity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle ESC key and backdrop lock
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!city.trim()) {
      return setError('Please enter your city.');
    }

    const carsList = interestedCarsInput
      ? interestedCarsInput.split(',').map(c => c.trim()).filter(Boolean)
      : [];

    try {
      setSubmitting(true);
      const reqCity = city.trim();

      void trackEvent(EVENTS.CITY_REQUEST_SUBMITTED, {
        city: reqCity,
        hasName: Boolean(fullName.trim()),
        hasPhone: Boolean(phone.trim()),
        hasEmail: Boolean(email.trim()),
        carCount: carsList.length,
        timeline: purchaseTimeline,
        source,
      });

      const response = await submitCityRequest({
        city: reqCity,
        fullName: fullName.trim() || undefined,
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        interestedCars: carsList,
        purchaseTimeline,
        source,
      });

      void trackEvent(EVENTS.CITY_REQUEST_SUCCESS, {
        city: reqCity,
        requestId: response.requestId,
        source,
      });

      setSubmittedCity(reqCity);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setCity('');
    setFullName('');
    setPhone('');
    setEmail('');
    setInterestedCarsInput('');
    setPurchaseTimeline('1–3 months');
    setSubmittedCity(null);
    setError(null);
    onClose();
  };

  return (
    <div className="city-modal-overlay" onClick={handleResetAndClose} role="dialog" aria-modal="true">
      <div className="city-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="city-modal-close" onClick={handleResetAndClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {submittedCity ? (
          /* Success State */
          <div className="city-modal-success">
            <div className="city-success-icon-wrapper">
              <CheckCircle2 size={56} className="city-success-icon" />
            </div>
            <h3 className="city-success-title">✅ You're on the list!</h3>
            <p className="city-success-message">
              Thank you for requesting Flowzap in <strong>{submittedCity}</strong>.
            </p>
            <p className="city-success-subtext">
              We're prioritizing expansion based on real demand. We'll notify you as soon as Flowzap launches in {submittedCity}!
            </p>
            <button className="city-success-btn" onClick={handleResetAndClose}>
              Got It
            </button>
          </div>
        ) : (
          /* Form State */
          <div>
            <div className="city-modal-header">
              <h2 className="city-modal-title">Bring Flowzap to Your City</h2>
              <p className="city-modal-subtitle">
                Flowzap is currently available only in Ludhiana during our pilot. We're expanding city by city based on real demand. Tell us where you'd like Flowzap next and we'll notify you when we launch there.
              </p>
            </div>

            {error && <div className="error-banner" style={{ marginBottom: '1.25rem' }}>{error}</div>}

            <form onSubmit={handleSubmit} className="city-modal-form">
              {/* City (Required) */}
              <div className="form-group">
                <label className="form-label" htmlFor="city-input">Your City *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }}>
                    <MapPin size={16} />
                  </span>
                  <input
                    id="city-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Chandigarh, Jalandhar, Amritsar, Delhi..."
                    style={{ paddingLeft: '38px' }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Contact Info (Optional) */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="full-name-input">Full Name (Optional)</label>
                  <input
                    id="full-name-input"
                    type="text"
                    className="form-input"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone-input">Phone Number (Optional)</label>
                  <input
                    id="phone-input"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email-input">Email Address (Optional)</label>
                <input
                  id="email-input"
                  type="email"
                  className="form-input"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Interested Cars (Text Input) */}
              <div className="form-group">
                <label className="form-label" htmlFor="interested-car-input" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CarIcon size={16} /> Which car(s) are you interested in? (Optional)
                </label>
                <input
                  id="interested-car-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Creta, XUV700, Curvv, Nexon..."
                  value={interestedCarsInput}
                  onChange={(e) => setInterestedCarsInput(e.target.value)}
                />
              </div>

              {/* Purchase Timeline (Radio) */}
              <div className="form-group">
                <label className="form-label">When are you planning to buy?</label>
                <div className="city-timeline-grid">
                  {PURCHASE_TIMELINES.map((timeline) => (
                    <label key={timeline} className={`city-timeline-option ${purchaseTimeline === timeline ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="purchaseTimeline"
                        value={timeline}
                        checked={purchaseTimeline === timeline}
                        onChange={(e) => setPurchaseTimeline(e.target.value)}
                        style={{ display: 'none' }}
                      />
                      <span className="city-timeline-radio-custom" />
                      <span>{timeline}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button type="submit" className="submit-booking-btn" disabled={submitting}>
                {submitting ? (
                  <>
                    <div className="spinner"></div> Submitting Request...
                  </>
                ) : (
                  <>Request My City</>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
