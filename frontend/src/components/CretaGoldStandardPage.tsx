import { Car } from '../types';
import GoldStandardCarPage from './GoldStandardCarPage';
import { CRETA_GOLD_STANDARD_DATA } from '../data/cretaData';

interface CretaGoldStandardPageProps {
  citySlug: string;
  onCarSelect: (car: Car) => void;
}

export default function CretaGoldStandardPage({ citySlug, onCarSelect }: CretaGoldStandardPageProps) {
  return (
    <GoldStandardCarPage
      modelData={CRETA_GOLD_STANDARD_DATA}
      citySlug={citySlug}
      onCarSelect={onCarSelect}
    />
  );
}
