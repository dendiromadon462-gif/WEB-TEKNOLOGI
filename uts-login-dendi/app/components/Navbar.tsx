'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({
  isLoggedIn,
  right,
}: {
  isLoggedIn: boolean;
  right?: React.ReactNode; // tombol Logout (dibuat di server)
}) {
  const pathname = usePathname();
  const links = isLoggedIn ? [...LINKS, { href: '/dashboard', label: 'Dashboard' }] : LINKS;
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header>
      <nav
        aria-label="Navigasi utama"
        className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-gradient-to-r from-uia-blue to-uia-deep px-5 py-4 text-white shadow-lg"
      >
        <Link
          href="/"
          aria-label="Universitas Islam As-Syafi'iyah - beranda"
          className="rounded-2xl bg-white px-4 py-2 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Image
            src="/logo-uia.png"
            alt="Logo Universitas Islam As-Syafi'iyah"
            width={960}
            height={292}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <div className="flex flex-wrap items-center gap-1 text-sm font-semibold">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? 'page' : undefined}
              className={`rounded-full border px-4 py-2 transition ${
                isActive(l.href)
                  ? 'border-sky-300/80'
                  : 'border-transparent hover:bg-white/10'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {right}
        </div>
      </nav>
    </header>
  );
}
