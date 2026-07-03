import { useSEO } from '../useSEO';

export default function AboutPage() {
  useSEO({
    title: 'About Flowzap | Home Test Drive',
    description: 'Learn how Flowzap brings the automobile dealership directly to your doorstep for a fast, simple, and transparent test drive experience.',
  });

  return (
    <div className="content-page">
      <h1>About Flowzap</h1>
      <p>Buying a car should be exciting—not frustrating.</p>
      <p>
        Traditionally, booking a test drive means calling multiple dealerships, waiting for callbacks, visiting showrooms, and coordinating schedules.
      </p>
      <p>We believe the experience should be much simpler.</p>
      <p>
        With Flowzap, customers can request a free home test drive in just a few clicks while the dealership handles the scheduling and confirmation.
      </p>
      <p style={{ fontWeight: '600', margin: '2rem 0 1rem', fontSize: '1.2rem', color: 'var(--secondary)' }}>
        Our mission is simple:
      </p>
      <p style={{ fontSize: '1.25rem', fontStyle: 'italic', fontWeight: '500', color: 'var(--primary)' }}>
        "Bring the dealership to your doorstep."
      </p>
      <p>
        We're building Flowzap one customer at a time, learning from real customers and dealership partners to create a faster, simpler and more transparent car buying experience.
      </p>
    </div>
  );
}
