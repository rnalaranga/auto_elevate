'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ABOUT_STATS = [
  { value: '4,800+', label: 'Vehicles Perfected' },
  { value: '7 Yrs', label: 'Of Excellence' },
  { value: '99.8%', label: 'Client Satisfaction' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Track scroll specifically for the parallax effects in this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  return (
    <section id="about" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden', paddingTop: 140 }}>
      {/* Background accent */}
      <div style={{ position: 'absolute', right: 0, top: 0, width: '100%', height: '100%', opacity: 0.15, background: 'radial-gradient(circle at 70% 30%, rgba(212,175,55,0.2) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div className="ae-container">
        
        <div style={{ marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" style={{ justifyContent: 'flex-start' }} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Our Story</span>
          </motion.div>
        </div>

        <div className="ae-grid ae-grid-2" style={{ alignItems: 'center', gap: 80 }}>
          
          {/* Left - Premium Multi-layered Image Collage */}
          <div style={{ position: 'relative', height: 700, width: '100%' }}>
            
            {/* Background Image (Large, slow scroll down) */}
            <motion.div 
              style={{ position: 'absolute', right: '5%', top: '0%', width: '80%', height: '75%', borderRadius: 20, overflow: 'hidden', y: useTransform(scrollYProgress, [0, 1], [-40, 80]) }}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }}
            >
              <img src="/images/about_main.png" alt="Auto Elevate Detailing Facility" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.8), transparent)' }} />
            </motion.div>

            {/* Foreground Image (Smaller, floating left, fast scroll up) */}
            <motion.div 
              style={{ position: 'absolute', left: '0%', bottom: '15%', width: '55%', height: '45%', borderRadius: 16, overflow: 'hidden', border: '1px solid var(--text-primary)', boxShadow: '0 30px 60px rgba(0,0,0,0.9)', y: useTransform(scrollYProgress, [0, 1], [60, -60]) }}
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }}
            >
              <img src="/images/gallery_1.png" alt="Polishing Action" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Floating Glass Badge */}
            <motion.div 
              className="ae-glass" 
              style={{ position: 'absolute', bottom: '0%', right: '10%', padding: '24px 32px', borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.6 }}
            >
              <motion.div style={{ width: 40, height: 40, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)', border: '1px solid rgba(212,175,55,0.5)', marginBottom: 12 }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} />
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: 'var(--gold)', marginBottom: 4, lineHeight: 1 }}>Since 2018</p>
              <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>Redefining Excellence</p>
            </motion.div>
          </div>

          {/* Right - Text Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <motion.h2 className="ae-title" style={{ textAlign: 'left', fontSize: 'clamp(48px, 5.5vw, 64px)', lineHeight: 1.1 }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
              NOT JUST <br />
              <span className="gold">DETAILING.</span><br />
              AN OBSESSION.
            </motion.h2>

            <motion.p style={{ color: 'var(--text-primary)', fontSize: 16, lineHeight: 1.8, maxWidth: 500 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
              Auto Elevate was founded by a team of obsessive perfectionists who believed the world's finest cars deserve the world's finest care. Every product we use, every technique we employ, and every standard we hold ourselves to reflects that belief.
            </motion.p>
            
            <motion.p style={{ color: 'var(--text-primary)', fontSize: 16, lineHeight: 1.8, maxWidth: 500 }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }}>
              We've worked on everything from daily drivers to priceless hypercars. Each vehicle receives the same uncompromising attention to detail and white-glove service.
            </motion.p>

            <motion.div style={{ display: 'flex', gap: 32, marginTop: 24, paddingTop: 32, borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}>
              {ABOUT_STATS.map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8, borderLeft: i > 0 ? '1px solid rgba(212,175,55,0.2)' : 'none', paddingLeft: i > 0 ? 24 : 0 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 32, color: 'var(--gold)', lineHeight: 1 }}>{stat.value}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gray)' }}>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
