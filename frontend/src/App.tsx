import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import CarSelection from './components/CarSelection';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import AdminDashboard from './components/AdminDashboard';
import { Car, BookingResponse } from './types';
import { Compass, UserCheck } from 'lucide-react';

type ViewState = 'landing' | 'cars' | 'booking' | 'confirmation' | 'admin';

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);

  const startBooking = () => {
    setView('cars');
    setSelectedCar(null);
    setBookingResponse(null);
  };

  const handleCarSelect = (car: Car) => {
    setSelectedCar(car);
    setView('booking');
  };

  const handleBookingSuccess = (response: BookingResponse) => {
    setBookingResponse(response);
    setView('confirmation');
  };

  const navigateToHome = () => {
    setView('landing');
    setSelectedCar(null);
    setBookingResponse(null);
  };

  const navigateToAdmin = () => {
    setView('admin');
  };

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
              className={`nav-btn ${(view === 'cars' || view === 'booking' || view === 'confirmation') ? 'active' : ''}`}
              onClick={startBooking}
            >
              Book Drive
            </button>
            <button 
              className={`nav-btn admin-nav-btn ${view === 'admin' ? 'active' : ''}`}
              onClick={navigateToAdmin}
            >
              <UserCheck size={16} /> Admin Portal
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {view === 'landing' && (
          <LandingPage 
            onStartBooking={startBooking} 
            onNavigateToAdmin={navigateToAdmin} 
          />
        )}
        
        {view === 'cars' && (
          <CarSelection onSelectCar={handleCarSelect} />
        )}
        
        {view === 'booking' && selectedCar && (
          <BookingForm 
            selectedCar={selectedCar} 
            onBack={() => setView('cars')} 
            onBookingSuccess={handleBookingSuccess} 
          />
        )}
        
        {view === 'confirmation' && bookingResponse && (
          <Confirmation 
            bookingDetails={bookingResponse} 
            onBookAnother={startBooking} 
            onViewDashboard={navigateToAdmin} 
          />
        )}
        
        {view === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
         <p>&copy; {new Date().getFullYear()} Flowzap Cars Inc. All rights reserved.</p>
        <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', opacity: 0.7 }}>
          Built with TypeScript &bull; Express &bull; PostgreSQL &bull; React &bull; Docker
        </p>
      </footer>
    </div>
  );
}
