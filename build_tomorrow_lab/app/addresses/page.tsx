import CopyButton from '../CopyButton';
import { receivingAddresses, networkNotes } from '../addresses';

export const metadata = {
  title: 'Addresses — Builder Support Fund',
  description: 'Public receiving addresses, grouped by network. Send only on the listed network.',
};

export default function AddressesPage() {
  return (
    <main className="container">
      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <div className="eyebrow">Public receiving addresses</div>
          <h1 className="hero-gradient">Receiving addresses</h1>
          <p className="lead">
            These are the only official receiving addresses. Send only on the network listed for each address.
            Sending on the wrong network can cause permanent loss.
          </p>
        </div>
      </section>

      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <div className="notice" style={{ marginBottom: 20 }}>
            <strong>EVM address reuse</strong>
            <p style={{ marginTop: 8 }}>
              The same address is used across these EVM networks: Ethereum, BNB Chain, Polygon, Arbitrum One, and Base.
              Funds are held in a self-custodied wallet. The same address is used across all EVM networks because EVM chains share address derivation.
            </p>
          </div>
          <div className="wallet-grid">
            {receivingAddresses.map((entry) => (
              <div className="glass-panel wallet-card" key={entry.id}>
                <div className="glass-inner">
                  <div className="wallet-top">
                    <div className="wallet-dot" style={{ background: 'var(--cyan)' }} />
                    <div>
                      <div className="wallet-symbol">{entry.label}</div>
                      <div className="wallet-network">{entry.chain}</div>
                    </div>
                  </div>
                  <div className="wallet-address">{entry.address}</div>
                  <div className="panel-note" style={{ marginTop: 10 }}>
                    {networkNotes[entry.chain] || 'Send only on the listed network.'}
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <CopyButton value={entry.address} label="Copy address" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
