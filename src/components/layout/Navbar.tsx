'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`ae-navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="ae-nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/images/logo.png" alt="Auto Elevate" style={{ height: 70, width: 'auto' }} className="dark:invert-0 light:invert" />
      </Link>
      
      <div className="ae-nav-links">
        {NAV_LINKS.map(link => (
          <Link key={link.label} href={link.href} className="ae-nav-link">
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {mounted && (
          <button 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            className="hover:bg-white/10"
          >
            {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <Link href="#contact" className="ae-nav-cta">
          Book Detail
        </Link>
      </div>
    </nav>
  );
}
