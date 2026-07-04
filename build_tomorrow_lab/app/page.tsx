import Link from 'next/link';
import SupportButton from './SupportButton';
import { getAddress } from './addresses';

export const metadata = {
  title: 'Builder Support Fund — Support an independent build',
  description: 'Support an independent build in its earliest stage. Funds go toward registration, legal setup, and launch essentials.',
};

const SOLANA_ADDRESS = getAddress('SOL')?.address ?? '';

const uses = [
  { title: 'Registration', text: 'Formally registering the entity so the work can operate on solid footing.' },
  { title: 'Legal setup', text: 'Baseline legal and compliance essentials to start correctly and stay clean.' },
  { title: 'Launch essentials', text: 'The practical, unglamorous costs it takes to actually get off the ground.' },
];

const tiers = [
  { index: '01', title: 'Seed', amount: 10, badge: 'Starter', points: ['A quiet thank-you', 'Helps cover small fixed costs'] },
  { index: '02', title: 'Support', amount: 50, badge: 'Common', points: ['Moves a real line item forward', 'Meaningful early backing'] },
  { index: '03', title: 'Backer', amount: 150, badge: 'Strong', points: ['Covers a full setup step', 'Serious momentum'] },
  { index: '04', title: 'Founding', amount: 500, badge: 'Major', points: ['Underwrites a core essential', 'Foundational support'] },
];

export default function Page() {
  return (
    <main className="container">
      <section className="hero-grid">
        <div className="glass-panel">
          <div className="glass-inner hero-copy">
            <div className="eyebrow">Independent fundraiser</div>
            <h1 className="hero-gradient">Support an independent build in its earliest stage.</h1>
            <p className="lead">
              This is a direct, public fundraiser. Contributions go toward the essential costs of getting
              started — registration, legal setup, and launch essentials — with public receiving addresses
              so support goes straight where it&apos;s needed.
            </p>
            <div className="hero-actions">
              <Link className="btn primary" href="/support">Support this build</Link>
              <Link className="btn secondary" href="/addresses">Public receiving addresses</Link>
            </div>
            <div className="hero-trust">
              <span>Public addresses</span>
              <span>Crypto-enabled</span>
              <span>Direct support</span>
            </div>
          </div>
        </div>
        <div className="glass-panel">
          <div className="glass-inner hero-stage">
            <div className="rocket-area">
              <div className="progress-bubble">
                <div className="eyebrow">Where funds go</div>
                <p className="big">3</p>
                <p className="sub">essentials, nothing extra</p>
              </div>
              <div className="rocket-ring" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Why funds are needed</div>
              <h2>Essential setup costs</h2>
              <p>Straightforward and specific. Support covers the following and nothing more.</p>
            </div>
          </div>
          <div className="funding-grid">
            {uses.map((use, i) => (
              <div className="glass-panel fund-card" key={use.title}>
                <div className="glass-inner">
                  <div className="fund-top">
                    <div>
                      <div className="fund-index">{String(i + 1).padStart(2, '0')}</div>
                      <div className="fund-title">{use.title}</div>
                    </div>
                  </div>
                  <p className="fund-text">{use.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel glass-panel" id="support-tiers">
        <div className="glass-inner">
          <div className="section-head">
            <div>
              <div className="eyebrow">Support tiers</div>
              <h2>Pick a starting point</h2>
              <p>Tiers are suggestions — any amount helps. Buttons below send on Solana. For other networks, use the support page to copy the address.</p>
            </div>
          </div>
          <div className="pricing-grid">
            {tiers.map((tier) => (
              <div className="pricing-wrap" key={tier.index}>
                <div className="glass-panel price-card">
                  <div className="glass-inner">
                    <div className="price-head">
                      <div>
                        <div className="eyebrow">Tier {tier.index}</div>
                        <div className="price-title">{tier.title}</div>
                      </div>
                      <div className="price-badge">{tier.badge}</div>
                    </div>
                    <div className="price-row">
                      <div className="price-value">${tier.amount}</div>
                      <div className="price-mode">and up</div>
                    </div>
                    <div className="price-points">
                      {tier.points.map((point) => (
                        <div className="price-point" key={point}>
                          <span className="tick">+</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                    <SupportButton amount={tier.amount} solAddress={SOLANA_ADDRESS} label={`Send $${tier.amount}+ (Solana)`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="cta-row">
            <Link className="btn primary" href="/support">Choose an amount &amp; network</Link>
            <Link className="btn secondary" href="/faq">How it works</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
