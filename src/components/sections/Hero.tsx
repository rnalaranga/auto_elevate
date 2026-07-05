'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <section ref={sectionRef} id="hero" className="ae-hero">
      <div className="ae-hero-canvas" style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', backgroundColor: '#000' }}>
        <motion.div
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.img 
            src="/images/lc300.png" 
            alt="Toyota LC 300 Detail"
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              objectPosition: '70% center',
              mixBlendMode: 'screen',
              filter: 'contrast(1.3) brightness(0.8)',
              y 
            }}
            animate={{ scale: [1, 1.05, 1], y: [0, -15, 0] }}
            transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          />
        </motion.div>
      </div>
      <div className="ae-hero-vignette" />
      <div className="ae-hero-fade" />

      <div className="ae-hero-content">
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 16, marginBottom: 32 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="ae-eyebrow-text">Perfection Detailed</span>
          <div className="ae-eyebrow-line" style={{ width: '80px' }} />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
          {['UNRIVALED', 'PRECISION', 'REFINED'].map((word, i) => (
            <motion.span
              key={word}
              className={`ae-hero-word${i === 1 ? ' gold' : ''}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="ae-hero-subtitle"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Elevate your vehicle to masterpiece status. The world's finest ceramic coatings and paint correction for distinguished automobiles.
        </motion.p>

        <motion.div
          className="ae-hero-btns"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -30 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <a href="#contact" className="ae-btn-primary">Book Your Detail</a>
          <a href="#services" className="ae-btn-outline">Explore Services →</a>
        </motion.div>
      </div>

      <div className="ae-scroll-indicator">
        <span className="ae-scroll-text">Scroll</span>
        <motion.div
          className="ae-scroll-line"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  );
}
