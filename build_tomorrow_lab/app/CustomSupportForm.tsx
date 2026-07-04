'use client';

import { FormEvent, useState } from 'react';

type CustomSupportFormProps = {
  solAddress: string;
};

function isConfigured(address: string) {
  return Boolean(address && !address.includes('HERE') && !address.toLowerCase().includes('example'));
}

export default function CustomSupportForm({ solAddress }: CustomSupportFormProps) {
  const [amount, setAmount] = useState('25');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const usd = Number(amount);
    if (!Number.isFinite(usd) || usd < 1) {
      window.alert('Enter $1 or more.');
      return;
    }

    if (!isConfigured(solAddress)) {
      window.alert('This address is not configured yet. No payment was started.');
      return;
    }

    const params = new URLSearchParams({
      amount: String(usd),
      label: 'Builder Support Fund',
      message: `Support $${usd}`,
    });

    window.location.href = `solana:${solAddress}?${params.toString()}`;
  }

  return (
    <form className="custom-support" onSubmit={handleSubmit}>
      <div>
        <div className="eyebrow">No cap</div>
        <div className="custom-title">Choose any amount</div>
        <p>Cards are suggested starting points. Your support can be $1, $17, $250, or whatever fits.</p>
      </div>
      <label className="custom-input-wrap">
        <span>$</span>
        <input
          aria-label="Custom support amount"
          min="1"
          inputMode="numeric"
          step="1"
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>
      <button className="btn primary" type="submit">
        Send custom amount
      </button>
    </form>
  );
}
