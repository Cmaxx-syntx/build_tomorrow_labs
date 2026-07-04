'use client';

import { useState } from 'react';
import { ethers } from 'ethers';

type Connected = { kind: 'EVM' | 'Solana'; address: string };

export default function ConnectWallet() {
  const [connected, setConnected] = useState<Connected | null>(null);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState('');

  async function connectEvm() {
    setError('');
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      setError('No EVM wallet found. Install MetaMask or another browser wallet extension.');
      return;
    }
    try {
      const accounts: string[] = await ethereum.request({ method: 'eth_requestAccounts' });
      const address = ethers.getAddress(accounts[0]);
      setConnected({ kind: 'EVM', address });
      setPicking(false);
    } catch {
      setError('Connection request was rejected or failed.');
    }
  }

  async function connectSolana() {
    setError('');
    const solana = (window as any).solana;
    if (!solana || !solana.isPhantom) {
      setError('No Solana wallet found. Install Phantom or another Solana browser wallet.');
      return;
    }
    try {
      const resp = await solana.connect();
      setConnected({ kind: 'Solana', address: resp.publicKey.toString() });
      setPicking(false);
    } catch {
      setError('Connection request was rejected or failed.');
    }
  }

  function disconnect() {
    // Injected wallets don't expose a real revoke call; this only clears local UI state.
    setConnected(null);
  }

  if (connected) {
    const short = `${connected.address.slice(0, 6)}…${connected.address.slice(-4)}`;
    return (
      <div className="glass-panel wallet-card">
        <div className="glass-inner">
          <div className="wallet-top">
            <div className="wallet-dot" style={{ background: 'var(--cyan)' }} />
            <div>
              <div className="wallet-symbol">{connected.kind} wallet connected</div>
              <div className="wallet-network">{short}</div>
            </div>
          </div>
          <div className="panel-note" style={{ marginTop: 10 }}>
            This is a display-only connection to confirm your own address. It does not sign or send
            anything — use the address and buttons in Step 3 to actually send your support.
          </div>
          <div className="payment-actions" style={{ marginTop: 12 }}>
            <button type="button" className="btn secondary" onClick={disconnect}>
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel wallet-card">
      <div className="glass-inner">
        {picking ? (
          <div className="payment-actions">
            <button type="button" className="btn primary" onClick={connectEvm}>
              MetaMask / EVM wallet
            </button>
            <button type="button" className="btn primary" onClick={connectSolana}>
              Phantom / Solana wallet
            </button>
            <button type="button" className="btn secondary" onClick={() => setPicking(false)}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="payment-actions">
            <button type="button" className="btn secondary" onClick={() => setPicking(true)}>
              Connect wallet
            </button>
          </div>
        )}
        {error ? (
          <div className="panel-note" style={{ marginTop: 10 }}>
            {error}
          </div>
        ) : null}
      </div>
    </div>
  );
}
