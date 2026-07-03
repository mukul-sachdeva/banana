interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="page-section">
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="nav-btn" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', paddingLeft: 0 }}>
          Back to home
        </button>
      </div>

      <div className="page-header" style={{ marginBottom: '1.5rem' }}>
        <h2 className="page-title">Privacy Policy</h2>
        <p className="page-subtitle">How Flowzap protects the information you share with us.</p>
      </div>

      <div className="content-card">
        <p>Flowzap collects only the information necessary to process your home test drive request.</p>
        <p>This may include:</p>
        <ul>
          <li>Full name</li>
          <li>Mobile number</li>
          <li>Email address (optional)</li>
          <li>Preferred city</li>
          <li>Selected vehicle</li>
          <li>Preferred test drive date and time</li>
        </ul>
        <p>
          Your information is shared only with the dealership you select for the sole purpose of arranging
          your home test drive.
        </p>
        <p>
          Flowzap does not sell, rent, or share your personal information with advertisers or unrelated
          third parties.
        </p>
        <p>
          We retain booking information only as long as reasonably necessary to operate the service,
          improve customer experience, and comply with legal obligations.
        </p>
        <p>
          If you have any questions regarding your personal information or would like to request deletion
          of your data, please contact:
        </p>
        <p className="highlight-text">
          <a href="mailto:support@flowzap.co.in">support@flowzap.co.in</a>
        </p>
      </div>
    </div>
  );
}
