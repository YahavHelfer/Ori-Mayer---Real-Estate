// frontend/src/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  const isActive = (pathname: string) => router.pathname === pathname;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // סדר הקישורים להצגה ויזואלית מימין לשמאל ב-RTL
  const navLinksInOrder = [
    { href: '/', label: 'בית' },
    { href: '/sales', label: 'למכירה' },
    { href: '/rentals', label: 'להשכרה' },
    { href: '/sold', label: 'נכסים שנמכרו' },
    { href: '/contact', label: 'צור קשר' },
    { href: '/testimonials', label: 'המלצות' },
    { href: '/about', label: 'אודות' },
    { href: '/media', label: 'בתקשורת' },
    { href: '/community-support', label: 'ליווי קהילות' },
    { href: '/reservist-support', label: 'ליווי מילואימניקים' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-custom-black text-gold-text px-4 py-1 shadow-lg sticky top-0 z-40">
      <div dir="ltr" className="container mx-auto flex flex-row items-center gap-4">
        <div className="flex-shrink-0">
          <Link href="/" className="block">
            <Image
              src="/images/Logo.png"
              alt='אורי מאיר נדל"ן - לוגו'
              width={80}
              height={32}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        <div className="ml-auto flex items-center justify-end">
          <ul dir="rtl" className="hidden md:flex items-center gap-2 md:gap-3 lg:gap-4">
            {navLinksInOrder.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`hover:text-custom-gold transition-colors px-1 sm:px-2 py-1 rounded-md text-xs sm:text-sm md:text-sm lg:text-base
                              ${
                                isActive(link.href)
                                  ? 'text-custom-gold font-semibold border-b-2 border-custom-gold'
                                  : 'text-gold-text'
                              }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              aria-label="פתח תפריט"
              className="text-gold-text hover:text-custom-gold focus:outline-none"
            >
              {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-custom-black absolute left-0 right-0 shadow-lg z-40 py-2" dir="rtl">
          <ul className="flex flex-col items-stretch">
            {navLinksInOrder.map((link) => (
              <li key={link.href} className="w-full">
                <Link
                  href={link.href}
                  className={`block w-full py-3 px-4 text-right hover:bg-gray-700 hover:text-custom-gold transition-colors
                              ${isActive(link.href) ? 'text-custom-gold font-semibold' : 'text-gold-text'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
