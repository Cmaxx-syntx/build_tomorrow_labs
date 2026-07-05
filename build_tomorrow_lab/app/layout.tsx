import './globals.css';
import Nav from './Nav';
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: 'Builder Support Fund',
  description:
    'An independent fundraiser for essential setup costs — registration, legal setup, and launch essentials. Crypto-enabled, with public receiving addresses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <footer className="site-footer">
          <div className="site-footer-inner">
            <span>Builder Support Fund</span>
            <span className="site-footer-note">
              An independent, direct public fundraiser. Always verify the network before sending.
            </span>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
