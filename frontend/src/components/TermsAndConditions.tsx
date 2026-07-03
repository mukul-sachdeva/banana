interface TermsAndConditionsProps {
  onBack: () => void;
}

export default function TermsAndConditions({ onBack }: TermsAndConditionsProps) {
  return (
    <div className="page-section">
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="nav-btn" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', paddingLeft: 0 }}>
          Back to home
        </button>
      </div>

      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">Terms & Conditions</h2>
        <p className="page-subtitle">The Flowzap service terms for home test drive requests.</p>
      </div>

      <div className="content-card">
        <p>Flowzap is a platform that connects customers with automobile dealerships for home test drive requests.</p>
        <p>By submitting a booking request, you agree that:</p>
        <ul>
          <li>Your information will be shared with the selected dealership for scheduling your requested home test drive.</li>
          <li>Flowzap does not guarantee dealership availability or appointment confirmation.</li>
          <li>Final scheduling, confirmation, and availability remain solely at the discretion of the dealership.</li>
          <li>Flowzap does not own, sell, or broker vehicles.</li>
          <li>Home test drives remain subject to each dealership's policies, operating areas, inventory availability, and verification procedures.</li>
          <li>Flowzap currently does not charge customers for submitting a home test drive request.</li>
          <li>Flowzap is not responsible for delays, cancellations, or changes made by dealerships after a booking request has been submitted.</li>
        </ul>
      </div>
    </div>
  );
}
