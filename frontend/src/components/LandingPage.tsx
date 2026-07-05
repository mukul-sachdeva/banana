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

const BRAND_PILLS = [
  '50+ Popular Cars',
  'Maruti Suzuki',
  'Hyundai',
  'Mahindra',
  'Tata',
  'Kia',
  'Honda',
  'Toyota',
  'Volkswagen',
  'MG'
];

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

  const [query, setQuery] = useState('');
  const [cars, setCars] = useState<Car[]>([]);
  const [results, setResults] = useState<Car[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fetch car data once on mount for the search bar
  useEffect(() => {
    getCars().then(setCars).catch(() => {});
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
      return car ? { ...car, localImage: fc.image } : null;
    })
    .filter(Boolean) as (Car & { localImage: string })[];

  const handleCTAClick = () => {
    void trackEvent(EVENTS.BOOK_DRIVE_CLICKED, { source: 'hero' });
    onStartBooking();
  };

  const handleBrandPillClick = (brand: string) => {
    if (brand === '50+ Popular Cars') {
      void trackEvent(EVENTS.BOOK_DRIVE_CLICKED, { source: 'hero_pill_catalog' });
      onStartBooking();
    } else {
      void trackEvent(EVENTS.BRAND_SELECTED, { source: 'hero_pill', brand });
      setQuery(brand);
    }
  };

  return (
    <div className="landing-page">
      <section className="hero-section">

        {/* Hero tag — directs to action, not trust */}
        <div className="hero-tag">Browse 50+ Popular Cars</div>

        <h1 className="hero-title">Book a Test Drive at Your Home</h1>

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
            <span>Dealer Calls You to Confirm</span>
          </div>
        </div>

        <p className="hero-subtitle">
          Skip dealership calls. Get a dealer to bring the car to you.
        </p>

        {/* Search bar */}
        <div className="hero-search-wrapper" ref={searchRef}>
          <div className="hero-search-bar">
            <Search size={18} className="hero-search-icon" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search your favourite car..."
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

        {/* Primary CTA */}
        <button className="hero-cta-btn" onClick={handleCTAClick}>
          Browse Available Cars <ArrowRight size={20} />
        </button>

        {/* Brand pills row — answers "do they have my car?" */}
        <div className="hero-brand-pills">
          {BRAND_PILLS.map((b) => (
            <button
              key={b}
              className={`brand-pill${b === '50+ Popular Cars' ? ' brand-pill--catalog' : ''}`}
              onClick={() => handleBrandPillClick(b)}
            >
              {b}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Cars — quick access to top vehicles */}
      {featuredCars.length > 0 && (
        <section className="popular-cars-section">
          <h2 className="popular-cars-title">Popular Cars</h2>
          <p className="popular-cars-subtitle">
            Start with India's most popular cars available for a free home test drive.
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
