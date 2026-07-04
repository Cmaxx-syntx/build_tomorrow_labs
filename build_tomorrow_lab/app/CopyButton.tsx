'use client';

import { useState } from 'react';

type CopyButtonProps = {
  value: string;
  label?: string;
  className?: string;
};

export default function CopyButton({ value, label = 'Copy', className = 'btn secondary' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API.
      const el = document.createElement('textarea');
      el.value = value;
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {copied ? 'Copied' : label}
    </button>
  );
}
