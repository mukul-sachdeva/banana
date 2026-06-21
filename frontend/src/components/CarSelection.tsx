import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { getCars } from '../api';
import { Gauge, Settings, ShieldAlert, Sparkles } from 'lucide-react';

interface CarSelectionProps {
  onSelectCar: (car: Car) => void;
}

export default function CarSelection({ onSelectCar }: CarSelectionProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCars() {
      try {
        setLoading(true);
        const data = await getCars();
        setCars(data);
      } catch (err: any) {
        console.error('Error fetching cars:', err);
        setError(err.message || 'Failed to load cars. Make sure the database and backend are running.');
      } finally {
        setLoading(false);
      }
    }
    loadCars();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1rem' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#2563EB' }}></div>
        <p style={{ color: '#94a3b8' }}>Loading fleet selection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '500px', margin: '3rem auto', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
        <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Failed to Load Cars</h3>
        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{error}</p>
        <button 
          className="select-car-btn" 
          onClick={() => window.location.reload()}
          style={{ width: 'auto', display: 'inline-block' }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Select Your Vehicle</h2>
        <p className="page-subtitle">Choose one of our premium test drive vehicles to get started.</p>
      </div>

      <div className="car-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              <img src={car.image_url} alt={car.name} className="car-image" />
              <span className="car-brand-badge">{car.brand}</span>
            </div>
            
            <div className="car-info">
              <h3 className="car-name">{car.name}</h3>
              
              <div className="car-specs">
                <span className="spec-badge">
                  <Settings size={12} /> {car.transmission}
                </span>
                <span className="spec-badge">
                  <Gauge size={12} /> {car.fuel_type}
                </span>
              </div>
              
              <div className="car-price-row">
                <div>
                  <div className="price-label">Price Range</div>
                  <div className="price-val">{car.price_range}</div>
                </div>
                <button 
                  className="select-car-btn" 
                  onClick={() => onSelectCar(car)}
                >
                  Select Car
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
