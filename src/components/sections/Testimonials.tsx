'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-primary)' }}>
      <div className="ae-container">
        
        <div className="ae-section-header">
          <motion.div className="ae-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Client Feedback</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            VERIFIED <span className="gold">EXCELLENCE</span>
          </motion.h2>
        </div>

        <div className="ae-testimonial-wrap ae-glass" style={{ borderRadius: 24 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="ae-stars">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="currentColor" style={{ color: '#D4AF37' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="ae-quote">"{TESTIMONIALS[active].quote}"</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="ae-reviewer-name">{TESTIMONIALS[active].name}</span>
                <span className="ae-reviewer-car">{TESTIMONIALS[active].title}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="ae-dots">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} className={`ae-dot${active === i ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
