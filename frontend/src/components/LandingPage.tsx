import React from 'react';
import { Calendar, Shield, Zap, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onStartBooking: () => void;
  onNavigateToAdmin: () => void;
}

export default function LandingPage({ onStartBooking, onNavigateToAdmin }: LandingPageProps) {
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-tag">Flowzap Drive MVP</div>
        <h1 className="hero-title">Book a Test Drive in Minutes</h1>
        <p className="hero-subtitle">
          Experience your dream car today. Browse our selection of premium SUVs, pick your preferred date and time, and schedule your test drive instantly.
        </p>
        
        <button className="hero-cta-btn" onClick={onStartBooking}>
          Book Test Drive <ArrowRight size={20} />
        </button>

        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Zap size={36} />
            </div>
            <h3 className="feature-title">Instant Booking</h3>
            <p className="feature-desc">Select your car, pick a time slot, and lock it in. No long phone calls or dealer delays.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Calendar size={36} />
            </div>
            <h3 className="feature-title">Flexible Schedule</h3>
            <p className="feature-desc">Choose from multiple slots throughout the week. Adjust your request anytime.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Shield size={36} />
            </div>
            <h3 className="feature-title">Authorized Dealers</h3>
            <p className="feature-desc">We connect you directly with certified showrooms closest to your selected city.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
