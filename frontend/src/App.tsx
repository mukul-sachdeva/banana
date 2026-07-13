import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CarSelection from './components/CarSelection';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import AdminDashboard from './components/AdminDashboard';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';
import NotFoundPage from './components/NotFoundPage';
import ArticlePage from './components/ArticlePage';
import { Car, BookingResponse } from './types';
import { trackEvent } from './analytics/analytics';
import { EVENTS } from './analytics/constants';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function CustomerApp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  useEffect(() => {
    void trackEvent(EVENTS.PAGE_VIEW, { pathname: location.pathname });
  }, [location.pathname]);

  // Synchronize router paths with SPA states for backward/forward navigation
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSelectedCar(null);
      setBookingResponse(null);
    } else if (path === '/book') {
      if (!selectedCar) {
        setBookingResponse(null);
      }
    }
  }, [location.pathname]);

  const startBooking = () => {
    setSelectedCar(null);
    setBookingResponse(null);
    navigate('/book');
  };

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    navigate('/book');
  };

  const handleBookingSuccess = (response: BookingResponse) => {
    setBookingResponse(response);
    navigate('/confirmation');
  };

  const navigateToHome = () => {
    setSelectedCar(null);
    setBookingResponse(null);
    navigate('/');
  };

  const activeDrive = ['/book', '/confirmation'].includes(location.pathname);

  return (
    <div className="app-container">
      {/* Universal Sticky Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-container" onClick={navigateToHome}>
            <span className="logo-text">FLOWZAP</span>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-btn ${activeDrive ? 'active' : ''}`}
              onClick={startBooking}
            >
              Book Drive
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage onStartBooking={startBooking} onCarSelect={handleCarSelect} />} />
          <Route
            path="/book"
            element={
              selectedCar ? (
                <BookingForm
                  selectedCar={selectedCar}
                  onBack={() => setSelectedCar(null)}
                  onBookingSuccess={handleBookingSuccess}
                />
              ) : (
                <CarSelection onSelectCar={handleCarSelect} />
              )
            }
          />
          <Route
            path="/confirmation"
            element={
              bookingResponse ? (
                <Confirmation bookingDetails={bookingResponse} onBookAnother={startBooking} />
              ) : (
                <Navigate to="/book" replace />
              )
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog/:slug" element={<ArticlePage onStartBooking={startBooking} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Flowzap</p>
        <p className="footer-contact" style={{ marginTop: '0.25rem' }}>
          Questions? <a href="mailto:support@flowzap.co.in" className="footer-link" onClick={() => { void trackEvent(EVENTS.FOOTER_EMAIL_CLICKED, { source: 'footer' }); }}>support@flowzap.co.in</a>
        </p>
        <p className="footer-links" style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
          <Link to="/about" className="footer-link" onClick={() => { void trackEvent(EVENTS.ABOUT_OPENED, { source: 'footer' }); }}>About</Link>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link to="/privacy" className="footer-link" onClick={() => { void trackEvent(EVENTS.PRIVACY_OPENED, { source: 'footer' }); }}>Privacy Policy</Link>
          <span style={{ opacity: 0.5 }}>•</span>
          <Link to="/terms" className="footer-link" onClick={() => { void trackEvent(EVENTS.TERMS_OPENED, { source: 'footer' }); }}>Terms & Conditions</Link>
        </p>
        <div className="footer-suggested">
          <p className="footer-suggested-title">Suggested Pages</p>
          <div className="footer-suggested-links">
            <Link to="/blog/home-vs-dealer-test-drive" className="footer-link">Home vs Dealer Test Drive</Link>
            <Link to="/blog/test-drive-checklist" className="footer-link">Test Drive Checklist</Link>
            <Link to="/blog/best-suvs-under-20-lakhs" className="footer-link">Best SUVs Under ₹20L</Link>
            <Link to="/blog/tata-curvv-vs-hyundai-creta" className="footer-link">Curvv vs Creta</Link>
            <Link to="/blog/should-you-test-drive-multiple-cars" className="footer-link">Test Drive Multiple Cars?</Link>
            <Link to="/blog/why-home-test-drives-save-time" className="footer-link">Home Test Drives Save Time</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AdminApp() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <div className="logo-container" onClick={() => navigate('/')}>
            <span className="logo-text">FLOWZAP</span>
          </div>
        </div>
      </header>
      <main className="main-content">
        <AdminDashboard />
      </main>
      <footer className="footer">
        <p>&copy; 2026 Flowzap</p>
        <p className="footer-contact" style={{ marginTop: '0.25rem' }}>
          Questions? <a href="mailto:support@flowzap.co.in" className="footer-link">support@flowzap.co.in</a>
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </BrowserRouter>
  );
}
