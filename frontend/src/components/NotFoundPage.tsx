import { Link } from 'react-router-dom';
import { useSEO } from '../useSEO';

export default function NotFoundPage() {
  useSEO({
    title: 'Page Not Found (404) | Flowzap',
    description: 'The requested page could not be found on Flowzap. Return to our homepage to book a free home test drive.',
  });

  return (
    <div className="not-found-container" style={{ textAlign: 'center', padding: '5rem 1.5rem', maxWidth: '600px', margin: '0 auto' }}>
      <div className="brand-logo-circle" style={{ margin: '0 auto 2rem', width: '80px', height: '80px', fontSize: '2rem' }}>
        ⚡
      </div>
      <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--primary)' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2.5rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
        We couldn't find the page you are looking for. It might have been moved, deleted, or the URL might be mistyped.
      </p>
      <Link to="/" className="hero-cta-btn" style={{ textDecoration: 'none', display: 'inline-flex' }}>
        Return to Homepage
      </Link>
    </div>
  );
}
