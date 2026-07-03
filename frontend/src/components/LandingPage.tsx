import { Calendar, Shield, Zap, ArrowRight, Check } from 'lucide-react';
import { useSEO } from '../useSEO';

interface LandingPageProps {
  onStartBooking: () => void;
}

export default function LandingPage({ onStartBooking }: LandingPageProps) {
  useSEO({
    title: 'Flowzap - Book a Test Drive at Your Home',
    description: 'Skip dealership calls. Get a dealer to bring the car to you. Book a free home test drive in 60 seconds with Flowzap.',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://flowzap.co.in/#organization",
          "name": "Flowzap",
          "url": "https://flowzap.co.in",
          "email": "support@flowzap.co.in",
          "logo": {
            "@type": "ImageObject",
            "url": "https://flowzap.co.in/apple-touch-icon.png"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://flowzap.co.in/#website",
          "url": "https://flowzap.co.in",
          "name": "Flowzap",
          "publisher": {
            "@id": "https://flowzap.co.in/#organization"
          }
        }
      ]
    }
  });
  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-tag">Flowzap Drive</div>
        <h1 className="hero-title">Book a Test Drive at Your Home</h1>

        <div className="hero-trust-badges">
          <div className="trust-badge">
            <Check size={16} strokeWidth={3} />
            <span>Home Test Drive</span>
          </div>
          <div className="trust-badge">
            <Check size={16} strokeWidth={3} />
            <span>100% Free to Request</span>
          </div>
          <div className="trust-badge">
            <Check size={16} strokeWidth={3} />
            <span>Dealer Calls You to Confirm</span>
          </div>
        </div>

        <p className="hero-subtitle">
          Skip dealership calls. Get a dealer to bring the car to you.
        </p>

        <button className="hero-cta-btn" onClick={onStartBooking}>
          Book Free Test Drive <ArrowRight size={20} />
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
