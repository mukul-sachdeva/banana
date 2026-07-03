interface AboutUsProps {
  onBack: () => void;
}

export default function AboutUs({ onBack }: AboutUsProps) {
  return (
    <div className="page-section">
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="nav-btn" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', paddingLeft: 0 }}>
          Back to home
        </button>
      </div>

      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">About Flowzap</h2>
        <p className="page-subtitle">A trusted home test drive experience built for customers and dealerships.</p>
      </div>

      <div className="content-card">
        <p>Buying a car should be exciting—not frustrating.</p>
        <p>
          Traditionally, booking a test drive means calling multiple dealerships, waiting for callbacks,
          visiting showrooms, and coordinating schedules.
        </p>
        <p>We believe the experience should be much simpler.</p>
        <p>
          With Flowzap, customers can request a free home test drive in just a few clicks,
          while the dealership handles the scheduling and confirmation.
        </p>
        <p>Our mission is simple:</p>
        <p className="highlight-text">Bring the dealership to your doorstep.</p>
        <p>
          We're building Flowzap one customer at a time, learning from real customers and dealership
          partners to create a faster, simpler, and more transparent car buying experience.
        </p>
      </div>
    </div>
  );
}
