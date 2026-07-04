'use client';

import { useState } from 'react';
import CopyButton from '../CopyButton';
import { receivingAddresses, networkNotes, getAddress } from '../addresses';

const amountChips = [10, 25, 50, 100, 250];

function isConfigured(address: string) {
  return Boolean(address && !address.includes('HERE') && !address.toLowerCase().includes('example'));
}

export default function SupportConsole() {
  const [amount, setAmount] = useState('25');
  const [chain, setChain] = useState('SOL');

  const selected = getAddress(chain);
  const note = networkNotes[chain] || 'Send only on the listed network.';
  const hasWalletAction = chain === 'SOL';

  function openSolanaWallet() {
    const usd = Number(amount);
    if (!Number.isFinite(usd) || usd < 1) {
      window.alert('Enter $1 or more.');
      return;
    }
    if (!selected || !isConfigured(selected.address)) {
      window.alert('This address is not configured yet. No payment was started.');
      return;
    }
    const params = new URLSearchParams({
      amount: String(usd),
      label: 'Builder Support Fund',
      message: `Support $${usd}`,
    });
    window.location.href = `solana:${selected.address}?${params.toString()}`;
  }

  return (
    <div className="glass-panel section-panel">
      <div className="glass-inner">
        <div className="section-head">
          <div>
            <div className="eyebrow">Step 1</div>
            <h2>Choose an amount</h2>
            <p>Any amount helps. Pick a suggestion or enter your own.</p>
          </div>
        </div>

        <div className="amount-grid">
          {amountChips.map((chip) => (
            <button
              type="button"
              key={chip}
              className={`amount-chip${Number(amount) === chip ? ' active' : ''}`}
              onClick={() => setAmount(String(chip))}
            >
              ${chip}
            </button>
          ))}
          <label className="custom-amount">
            <span>$</span>
            <input
              aria-label="Custom amount"
              min="1"
              inputMode="numeric"
              step="1"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>
        </div>

        <div className="section-head" style={{ marginTop: 28 }}>
          <div>
            <div className="eyebrow">Step 2</div>
            <h2>Choose a network</h2>
            <p>Pick the network you&apos;ll send from. Send only on the network you select.</p>
          </div>
        </div>

        <div className="network-select">
          {receivingAddresses.map((entry) => (
            <button
              type="button"
              key={entry.id}
              className={`network-pill${chain === entry.chain ? ' active' : ''}`}
              onClick={() => setChain(entry.chain)}
            >
              <span className="network-dot" />
              {entry.label}
            </button>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: 28 }}>
          <div>
            <div className="eyebrow">Step 3</div>
            <h2>Copy the address &amp; send</h2>
            <p>{note}</p>
          </div>
        </div>

        {selected ? (
          <div className="glass-panel wallet-card">
            <div className="glass-inner">
              <div className="wallet-top">
                <div className="wallet-dot" style={{ background: 'var(--cyan)' }} />
                <div>
                  <div className="wallet-symbol">{selected.label}</div>
                  <div className="wallet-network">{selected.chain}</div>
                </div>
              </div>
              <div className="wallet-address">{selected.address}</div>
              <div className="payment-actions" style={{ marginTop: 16 }}>
                <CopyButton value={selected.address} label="Copy address" className="btn primary" />
                {hasWalletAction ? (
                  <button type="button" className="btn secondary" onClick={openSolanaWallet}>
                    Open in Solana wallet (${Number(amount) || 0})
                  </button>
                ) : null}
              </div>
              {!hasWalletAction ? (
                <div className="panel-note" style={{ marginTop: 10 }}>
                  Copy the address and send from your own wallet or exchange.
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="panel-note">No address is configured for this network yet.</div>
        )}

        <div className="notice" style={{ marginTop: 20 }}>
          <strong>Before you send</strong>
          <ul>
            <li>Send only on the <strong>{selected?.label || 'selected'}</strong> network. Sending on the wrong network can cause permanent loss.</li>
            <li>Copy the full address and double-check the first and last characters.</li>
            <li>Crypto transactions are irreversible. There are no refunds.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
