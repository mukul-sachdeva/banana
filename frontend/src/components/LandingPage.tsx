import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check, Search, X } from 'lucide-react';
import { useSEO } from '../useSEO';
import { trackEvent } from '../analytics/analytics';
import { EVENTS } from '../analytics/constants';
import { getCars } from '../api';
import { Car } from '../types';

interface LandingPageProps {
  onStartBooking: () => void;
  onCarSelect?: (car: Car) => void;
}


const FEATURED_CARS_CONFIG = [
  { name: 'Creta',  image: '/cars/creta.jpg' },
  { name: 'Nexon',  image: '/cars/nexon.jpg' },
  { name: 'Brezza', image: '/cars/brezza.jpg' },
  { name: 'Baleno', image: '/cars/baleno.jpg' },
  { name: 'Amaze',  image: '/cars/amaze.jpg' },
  { name: 'City',   image: '/cars/city.jpg' },
];

const HOW_IT_WORKS = [
  { step: '1', label: 'Browse Available Cars' },
  { step: '2', label: 'Choose Your Preferred Vehicle' },
  { step: '3', label: 'Pick Date & Time' },
  { step: '4', label: 'Dealer Confirms Your Booking' },
  { step: '5', label: 'Enjoy Your Free Home Test Drive' },
];

export default function LandingPage({ onStartBooking, onCarSelect }: LandingPageProps) {
  useSEO({
    title: 'Flowzap - Book a Test Drive at Your Home',
    description: 'Your next car isn\'t chosen online. It\'s chosen behind the wheel. Book a free home or dealership test drive in under one minute with Flowzap.',
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

  const [query, setQuery] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [results, setResults] = useState<Car[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch car data once on mount for the search bar
  useEffect(() => {
    getCars()
      .then(setCars)
      .catch((err) => {
        console.warn('[LandingPage] getCars failed', err);
      });
  }, []);

  // Filter results whenever query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = cars.filter(
      (c) => c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q)
    ).slice(0, 8);
    setResults(filtered);
    setShowResults(true);
  }, [query, cars]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleCarSelect = (car: Car, source = 'hero_search') => {
    void trackEvent(EVENTS.VEHICLE_SELECTED, { source, car_name: car.name, brand: car.brand });
    setQuery('');
    setShowResults(false);
    if (onCarSelect) {
      onCarSelect(car);
    } else {
      onStartBooking();
    }
  };

  // Match featured cars from API data by name and attach local image
  const featuredCars = FEATURED_CARS_CONFIG
    .map((fc) => {
      const car = cars.find((c) => c.name.toLowerCase() === fc.name.toLowerCase());
      if (car) return { ...car, localImage: fc.image };

      // Fallback: create a lightweight local-only car so featured grid still renders
      return {
        id: `local-${fc.name}`,
        name: fc.name,
        brand: '',
        transmission: '',
        fuel_type: '',
        price_range: '',
        image_url: '',
        localImage: fc.image,
      } as unknown as Car & { localImage: string };
    })
    .filter(Boolean) as (Car & { localImage: string })[];

  const handleCTAClick = () => {
    void trackEvent(EVENTS.BOOK_DRIVE_CLICKED, { source: 'hero' });
    onStartBooking();
  };



  return (
    <div className="landing-page">
      {/* Search Bar Section at the very top */}
      <section className="search-section">
        <div className="hero-search-wrapper" ref={searchRef} style={{ marginBottom: 0 }}>
          <div className="hero-search-bar">
            <Search size={18} className="hero-search-icon" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search Creta, XUV700, Curvv...."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowResults(true)}
              aria-label="Search cars"
              aria-autocomplete="list"
              aria-expanded={showResults}
            />
            {query && (
              <button
                className="hero-search-clear"
                onClick={() => { setQuery(''); setShowResults(false); }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {showResults && (
            <div className="hero-search-dropdown" role="listbox">
              {results.length > 0 ? (
                results.map((car) => (
                  <div
                    key={car.id}
                    className="hero-search-result"
                    role="option"
                    onClick={() => handleCarSelect(car)}
                  >
                    <span className="search-result-brand">{car.brand}</span>
                    <span className="search-result-name">{car.name}</span>
                    <ArrowRight size={14} className="search-result-arrow" />
                  </div>
                ))
              ) : (
                <div className="hero-search-empty">No results for "{query}"</div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Popular Cars — quick access to top vehicles directly below search */}
      {featuredCars.length > 0 && (
        <section className="popular-cars-section popular-cars-top">
          <h2 className="popular-cars-title">Popular Cars</h2>
          <p className="popular-cars-subtitle">
            Start with India's most popular cars. Every model is available for a free home or dealership test drive.
          </p>
          <div className="popular-cars-grid">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="popular-car-card"
                onClick={() => handleCarSelect(car, 'popular_cars')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleCarSelect(car, 'popular_cars'); }}
              >
                <div className="popular-car-img-wrapper">
                  <img
                    src={car.localImage}
                    alt={`${car.brand} ${car.name}`}
                    className="popular-car-img"
                    loading="lazy"
                  />
                </div>
                <div className="popular-car-info">
                  <span className="popular-car-brand">{car.brand}</span>
                  <span className="popular-car-name">{car.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="popular-cars-view-all" onClick={handleCTAClick}>
            View All Cars <ArrowRight size={16} />
          </button>
        </section>
      )}

      {/* Hero Section in the Middle */}
      <section className="hero-section hero-middle">
        <h1 className="hero-title">Your next car isn't chosen online.<br />It's chosen behind the wheel.</h1>

        {/* Existing benefit pills — kept as-is */}
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
            <span>Dealership Calls You to Confirm</span>
          </div>
        </div>

        <p className="hero-subtitle">
          Compare cars the only way that matters. Book a free home or dealership test drive in under one minute.
        </p>

        {/* Primary CTA */}
        <button className="hero-cta-btn" onClick={handleCTAClick}>
          Book your Test Drive <ArrowRight size={20} />
        </button>
      </section>

      {/* How It Works — replaces the duplicate info section */}
      <section className="how-it-works">
        <h2 className="hiw-title">How Flowzap Works</h2>
        <p className="hiw-subtitle">From browsing to your driveway in 5 simple steps</p>
        <div className="hiw-steps">
          {HOW_IT_WORKS.map((item, idx) => (
            <div key={item.step} className="hiw-step">
              <div className="hiw-step-number">{item.step}</div>
              {idx < HOW_IT_WORKS.length - 1 && <div className="hiw-step-connector" />}
              <p className="hiw-step-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
