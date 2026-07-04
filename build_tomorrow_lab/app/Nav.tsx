import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/support', label: 'Support' },
  { href: '/addresses', label: 'Addresses' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
];

export default function Nav() {
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="site-brand">
          Builder Support Fund
        </Link>
        <nav className="site-nav-links" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
