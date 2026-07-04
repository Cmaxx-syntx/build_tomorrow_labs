import Link from 'next/link';

export const metadata = {
  title: 'About — Builder Support Fund',
  description: 'A short, neutral note about this independent fundraiser.',
};

export default function AboutPage() {
  return (
    <main className="container">
      <section className="section-panel glass-panel">
        <div className="glass-inner about-copy">
          <div className="eyebrow">About</div>
          <h1 className="hero-gradient">About this fundraiser</h1>
          <p className="message-text">
            This is an independent fundraiser to cover the essential first costs of a solo build —
            registration, legal setup, and the practical launch essentials.
          </p>
          <p className="message-text">
            It is intentionally simple and direct: public receiving addresses, no intermediaries, and support
            that goes straight toward getting started. Any amount is appreciated, and there is no obligation.
          </p>
          <div className="cta-row" style={{ marginTop: 8 }}>
            <Link className="btn primary" href="/support">Support this build</Link>
            <Link className="btn secondary" href="/faq">How it works</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
