import React, { useEffect, useState } from 'react';
import { Car } from '../types';
import { getCars } from '../api';
import { ShieldAlert, X } from 'lucide-react';

interface CarSelectionProps {
  onSelectCar: (car: Car) => void;
}

const INITIAL_BRANDS = [
  { name: 'Mahindra', logo: 'M' },
  { name: 'Toyota', logo: 'T' },
  { name: 'Maruti Suzuki', logo: 'MS' },
  { name: 'Volkswagen', logo: 'VW' },
  { name: 'Hyundai', logo: 'H' },
  { name: 'Honda', logo: 'H' }
];

export default function CarSelection({ onSelectCar }: CarSelectionProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selection Flow States
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBrand(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1rem' }}>
        <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#2563EB' }}></div>
        <p style={{ color: '#94a3b8' }}>Loading brand catalog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', maxWidth: '500px', margin: '3rem auto', backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px' }}>
        <ShieldAlert size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Failed to Load Brands</h3>
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

  // Filter cars belonging to the selected brand (case-insensitive check)
  const filteredCars = selectedBrand
    ? cars.filter(car => car.brand.toLowerCase() === selectedBrand.toLowerCase())
    : [];

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Select Brand</h2>
        <p className="page-subtitle">Choose a manufacturer to view available test drive vehicles.</p>
      </div>

      <div className="brand-grid">
        {INITIAL_BRANDS.map((brand) => (
          <div 
            key={brand.name} 
            className="brand-card" 
            onClick={() => handleBrandClick(brand.name)}
          >
            <div className="brand-logo-circle">{brand.logo}</div>
            <div className="brand-name">{brand.name}</div>
          </div>
        ))}
      </div>

      {/* Modal for Vehicle Selection */}
      {isModalOpen && selectedBrand && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Select {selectedBrand} Vehicle</h3>
              <button className="modal-close" onClick={handleCloseModal}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              {filteredCars.length > 0 ? (
                <div className="vehicle-option-list">
                  {filteredCars.map((car) => (
                    <div
                      key={car.id}
                      className="vehicle-option-item"
                      onClick={() => {
                        onSelectCar(car);
                        handleCloseModal();
                      }}
                    >
                      <span>{car.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
                  <p>No vehicles available for test drive under this brand currently.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
