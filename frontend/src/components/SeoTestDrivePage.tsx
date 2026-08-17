import { useParams } from 'react-router-dom';
import { Car } from '../types';
import NotFoundPage from './NotFoundPage';
import CretaGoldStandardPage from './CretaGoldStandardPage';

interface SeoTestDrivePageProps {
  onStartBooking: () => void;
  onCarSelect: (car: Car) => void;
}

export default function SeoTestDrivePage({ onCarSelect }: SeoTestDrivePageProps) {
  const params = useParams();

  // Extract explicit route params
  const cityParam = (params.city || '').toLowerCase();
  const brandParam = (params.brand || '').toLowerCase();
  const modelParam = (params.model || '').toLowerCase();

  // As requested, ONLY Creta Gold Standard pages are active right now.
  if (brandParam === 'hyundai' && modelParam === 'creta' && cityParam) {
    return (
      <CretaGoldStandardPage
        citySlug={cityParam}
        onCarSelect={onCarSelect}
      />
    );
  }

  // All other car pages are disabled until rebuilt to Creta Gold Standard
  return <NotFoundPage />;
}
