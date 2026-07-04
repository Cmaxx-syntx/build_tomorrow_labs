import Link from 'next/link';
import { receivingAddresses } from '../addresses';

export const metadata = {
  title: 'FAQ — Builder Support Fund',
  description: 'How to send, supported networks, what funds cover, and important warnings.',
};

const faqs = [
  {
    q: 'How do I send support?',
    a: 'Open the support page, choose an amount and a network, then copy the receiving address for that network and send from your own wallet or exchange. On Solana you can also open a compatible wallet directly from the support page. Other networks are copy-only.',
  },
  {
    q: 'What do funds cover?',
    a: 'Support goes toward essential setup costs only: registration, legal setup, and launch essentials. It is a focused, practical fundraiser — nothing more.',
  },
  {
    q: 'Is there a minimum?',
    a: 'Any amount of $1 or more helps. There is no maximum and no obligation.',
  },
  {
    q: 'Are contributions refundable?',
    a: 'No. Crypto transactions are irreversible, so contributions cannot be refunded. Please double-check the amount and network before sending.',
  },
  {
    q: 'Why do some networks have a wallet action and others are copy-only?',
    a: 'Solana has a direct wallet deep-link for convenience. Other networks do not have a one-click action here — copy the address and send from your own wallet or exchange. All listed networks are valid receiving addresses.',
  },
];

export default function FaqPage() {
  return (
    <main className="container">
      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <div className="eyebrow">FAQ</div>
          <h1 className="hero-gradient">How it works</h1>
          <p className="lead">Short, practical answers for sending support safely.</p>
        </div>
      </section>

      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <h2>Supported networks</h2>
          <p className="fund-text">
            Support is accepted on the following networks. See exact addresses on the{' '}
            <Link href="/addresses" className="panel-link">addresses page</Link>.
          </p>
          <div className="chip-row">
            {receivingAddresses.map((entry) => (
              <span className="supporter-chip" key={entry.id}>{entry.label}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <h2>Questions</h2>
          <div className="faq-list">
            {faqs.map((item) => (
              <div className="faq-item" key={item.q}>
                <div className="faq-q">{item.q}</div>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-panel glass-panel">
        <div className="glass-inner">
          <h2>Warnings</h2>
          <div className="notice">
            <ul>
              <li>Send only on the network listed for each address. The wrong network can cause permanent loss.</li>
              <li>Copy the full address every time and verify the first and last characters.</li>
              <li>Never send from a network or token type that isn&apos;t listed for that address.</li>
              <li>Transactions are irreversible. Only send what you intend to give.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
