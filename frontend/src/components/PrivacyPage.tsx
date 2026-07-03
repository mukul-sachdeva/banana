import { useSEO } from '../useSEO';

export default function PrivacyPage() {
  useSEO({
    title: 'Privacy Policy | Flowzap',
    description: 'Read the Flowzap Privacy Policy to understand how we securely gather and protect your home test drive booking information.',
  });

  return (
    <div className="content-page">
      <h1>Privacy Policy</h1>
      <p>Flowzap collects only the information necessary to process your home test drive request.</p>
      
      <p style={{ fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>This may include:</p>
      <ul>
        <li>Full Name</li>
        <li>Mobile Number</li>
        <li>Email Address (optional)</li>
        <li>Preferred City</li>
        <li>Selected Vehicle</li>
        <li>Preferred Test Drive Date</li>
        <li>Preferred Time Slot</li>
      </ul>

      <p>
        Your information is shared only with the dealership you select for the sole purpose of arranging your home test drive.
      </p>
      
      <p>
        Flowzap does not sell, rent, or share your personal information with advertisers, data brokers, or unrelated third parties.
      </p>

      <p>
        Flowzap uses reasonable security measures to protect customer information from unauthorized access.
      </p>

      <p>
        We retain booking information only for as long as reasonably necessary to operate the service, improve customer experience, resolve support requests, and comply with applicable legal obligations.
      </p>

      <p style={{ marginTop: '2.5rem' }}>
        If you have any questions regarding your personal information or wish to request deletion of your data, please contact:
      </p>
      <p style={{ fontWeight: '600' }}>
        <a href="mailto:support@flowzap.co.in" className="footer-link">support@flowzap.co.in</a>
      </p>
    </div>
  );
}
