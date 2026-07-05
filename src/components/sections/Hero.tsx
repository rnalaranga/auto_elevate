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
      <div className="ae-hero-canvas">
        <motion.video 
          autoPlay 
          loop 
          muted 
          playsInline
          src="/videos/hero_cinematic.mp4" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center', y }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        />
      </div>
      <div className="ae-hero-vignette" />
      <div className="ae-hero-fade" />

      <div className="ae-hero-content">
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="ae-eyebrow-line" />
          <span className="ae-eyebrow-text">Perfection Detailed</span>
          <div className="ae-eyebrow-line reverse" />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          {['UNRIVALED', 'PRECISION', 'REFINED'].map((word, i) => (
            <motion.span
              key={word}
              className={`ae-hero-word${i === 1 ? ' gold' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="ae-hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Elevate your vehicle to masterpiece status. The world's finest ceramic coatings and paint correction for distinguished automobiles.
        </motion.p>

        <motion.div
          className="ae-hero-btns"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
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
