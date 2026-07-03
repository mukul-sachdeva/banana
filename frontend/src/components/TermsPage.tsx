import { useSEO } from '../useSEO';

export default function TermsPage() {
  useSEO({
    title: 'Terms & Conditions | Flowzap',
    description: 'Read the Flowzap terms and conditions regarding home test drive scheduling requests, platform guidelines, and dealership policies.',
  });

  return (
    <div className="content-page">
      <h1>Terms & Conditions</h1>
      <p>
        Flowzap is a platform that connects customers with authorised automobile dealerships for home test drive requests.
      </p>

      <p style={{ fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
        By submitting a booking request, you agree that:
      </p>
      <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
        <li style={{ marginBottom: '0.75rem' }}>
          Your information will be shared with your selected dealership for scheduling your requested home test drive.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Flowzap does not guarantee dealership availability or appointment confirmation.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Final scheduling, confirmation and availability remain solely at the discretion of the dealership.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Flowzap does not own, sell or broker vehicles.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Home test drives remain subject to each dealership's operating policies, service areas, inventory availability and verification procedures.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Flowzap currently does not charge customers for submitting a home test drive request.
        </li>
        <li style={{ marginBottom: '0.75rem' }}>
          Flowzap is not responsible for appointment delays, cancellations or schedule changes made by dealerships after a booking request has been submitted.
        </li>
        <li style={{ marginBottom: '0.75rem', fontWeight: '500', color: 'var(--secondary)' }}>
          Submitting a request does not constitute a vehicle purchase or financial agreement.
        </li>
      </ul>
    </div>
  );
}
