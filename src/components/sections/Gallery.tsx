'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const IMAGES = [
  { id: 1, src: '/images/gallery_1.png', ratio: '75%' },
  { id: 2, src: '/images/gallery_2.png', ratio: '133.33%' },
  { id: 3, src: '/images/gallery_3.png', ratio: '100%' },
  { id: 4, src: '/images/gallery_4.png', ratio: '100%' },
  { id: 5, src: '/images/gallery_5.png', ratio: '75%' },
  { id: 6, src: '/images/gallery_6.png', ratio: '133.33%' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="gallery" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="ae-container">

        <div className="ae-section-header">
          <motion.div className="ae-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Portfolio</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            RECENT <span className="gold">PROJECTS</span>
          </motion.h2>
        </div>

        <div className="ae-gallery-masonry">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.id}
              className="ae-gallery-item"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
              transition={{ duration: 0.8, delay: 0.3 + (i % 3) * 0.15 }}
            >
              <div style={{ paddingBottom: img.ratio, position: 'relative', width: '100%', background: 'var(--bg-tertiary)' }}>
                <img src={img.src} alt={`Project ${img.id}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="ae-gallery-overlay ae-glass">
                <span className="ae-gallery-label">Project {img.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
