import Link from 'next/link';
import SupportConsole from './SupportConsole';

export const metadata = {
  title: 'Support — Builder Support Fund',
  description: 'Choose an amount, choose a network, and send directly to a public receiving address.',
};

export default function SupportPage() {
  return (
    <main className="container">
      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <div className="eyebrow">Support this build</div>
          <h1 className="hero-gradient">Send direct support</h1>
          <p className="lead">
            This page is for direct public support. Choose an amount, choose a network, then copy the address
            and send from your own wallet. On Solana you can also open a compatible wallet directly.
            All addresses are also listed on the{' '}
            <Link href="/addresses" className="panel-link">addresses page</Link>.
          </p>
        </div>
      </section>

      <SupportConsole />
    </main>
  );
}
