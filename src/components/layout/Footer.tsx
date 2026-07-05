import Link from 'next/link';
import { COMPANY, NAV_LINKS, SERVICES } from '@/lib/constants';
import { MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="ae-footer">
      <div className="ae-footer-grid">
        
        <div className="ae-footer-brand">
          <Link href="/" style={{ display: 'block', marginBottom: 16 }}>
            <img src="/images/logo.png" alt="Auto Elevate" style={{ height: 48, width: 'auto' }} />
          </Link>
          <p className="ae-footer-desc" style={{ marginBottom: 24 }}>
            {COMPANY.description}
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="#" style={{ color: 'var(--gray)', transition: 'color 0.2s', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--gray)'}>INSTAGRAM</a>
            <a href="#" style={{ color: 'var(--gray)', transition: 'color 0.2s', fontSize: 13, fontWeight: 700, letterSpacing: '0.1em' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--gray)'}>YOUTUBE</a>
            <a href="#" style={{ color: 'var(--gray)', transition: 'color 0.2s' }} onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--gold)'} onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--gray)'}><MapPin size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="ae-footer-col-title">Navigation</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_LINKS.map(link => (
              <Link key={link.label} href={link.href} className="ae-footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="ae-footer-col-title">Services</h4>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SERVICES.slice(0, 5).map(service => (
              <Link key={service.id} href={`#services`} className="ae-footer-link">
                {service.title}
              </Link>
            ))}
          </div>
        </div>

      </div>
      
      <div className="ae-footer-bottom">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', textAlign: 'center' }}>
          <p className="ae-footer-copy">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p style={{ fontSize: 11, color: 'var(--gray)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Designed and Developed by <span style={{ color: 'var(--gold)', fontWeight: 700 }}>RASHITHA NALARANGA</span>
          </p>
        </div>
        <p style={{ fontSize: 10, color: 'var(--gray)', letterSpacing: '0.1em' }}>
          {COMPANY.address} • {COMPANY.phone}
        </p>
      </div>
    </footer>
  );
}
