'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="ae-cta-section">
      <motion.h2 className="ae-cta-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8 }}>
        ELEVATE YOUR STANDARD
      </motion.h2>
      <motion.p className="ae-cta-desc" initial={{ opacity: 0, y: 30 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.2 }}>
        Secure your allocation for our signature detailing services. Availability is strictly limited to ensure uncompromising quality for every vehicle.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <a href="#contact" className="ae-cta-btn">Request Consultation</a>
      </motion.div>
    </section>
  );
}
