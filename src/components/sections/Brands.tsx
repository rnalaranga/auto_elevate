'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const BRANDS = [
  { name: '3M', src: '/images/brands/3m.png' },
  { name: 'Koch-Chemie', src: '/images/brands/koch.png' },
  { name: "Meguiar's", src: '/images/brands/meguiars.png' },
  { name: 'Würth', src: '/images/brands/wurth.png' },
  { name: 'Gtechniq', src: '/images/brands/gtechniq.png' }
];

export default function Brands() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)', padding: '100px 0', borderTop: '2px solid var(--border)', borderBottom: '2px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="ae-container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <motion.p 
            style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ duration: 0.6 }}
          >
            Premium Products & Partners
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '50px 80px', opacity: 0.85 }}>
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, filter: 'grayscale(100%)' }}
              animate={{ opacity: isInView ? 1 : 0, filter: 'grayscale(100%)' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ filter: 'grayscale(0%)', opacity: 1, scale: 1.08 }}
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img 
                src={brand.src} 
                alt={brand.name} 
                style={{ height: 60, width: 'auto', maxWidth: 220, objectFit: 'contain' }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
