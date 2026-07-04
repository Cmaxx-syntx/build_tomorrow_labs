'use client';

type SupportButtonProps = {
  amount: number;
  solAddress: string;
  label?: string;
};

function isConfigured(address: string) {
  return Boolean(address && !address.includes('HERE') && !address.toLowerCase().includes('example'));
}

export default function SupportButton({ amount, solAddress, label }: SupportButtonProps) {
  function handleClick() {
    if (!Number.isFinite(amount) || amount < 1) {
      window.alert('Enter $1 or more.');
      return;
    }

    if (!isConfigured(solAddress)) {
      window.alert('This address is not configured yet. No payment was started.');
      return;
    }

    const params = new URLSearchParams({
      amount: String(amount),
      label: 'Builder Support Fund',
      message: `Support $${amount}`,
    });

    window.location.href = `solana:${solAddress}?${params.toString()}`;
  }

  return (
    <button className="btn secondary" type="button" onClick={handleClick}>
      {label || `Send $${amount}+`}
    </button>
  );
}
