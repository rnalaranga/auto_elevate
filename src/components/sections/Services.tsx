'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/constants';

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  
  // Show 5 services for the accordion layout
  const featured = SERVICES.slice(0, 5);

  const IMAGES = [
    '/images/service_ceramic.png', 
    '/images/service_ppf.png', 
    '/images/service_correction.png',
    '/images/gallery_4.png', 
    '/images/gallery_5.png', 
  ];

  return (
    <section id="services" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)', padding: '120px 0' }}>
      <div className="ae-container">

        <div className="ae-section-header" style={{ marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Our Expertise</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            SIGNATURE <span className="gold">SERVICES</span>
          </motion.h2>
        </div>

        {/* Modern Expanding Accordion Layout */}
        <div className="services-accordion">
          {featured.map((service, i) => {
            const isActive = hoveredIndex === i;
            
            return (
              <motion.div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                className="services-panel"
                animate={{ 
                  flex: isActive ? 5 : 1,
                  opacity: 1
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  flex: { type: 'spring', stiffness: 80, damping: 20 },
                  opacity: { duration: 0.8, delay: i * 0.1 },
                  y: { duration: 0.8, delay: i * 0.1 }
                }}
              >
                {/* Background Image */}
                <motion.img 
                  src={IMAGES[i]} 
                  alt={service.title} 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }} 
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    filter: isActive ? 'grayscale(0%) brightness(0.9)' : 'grayscale(80%) brightness(0.3)'
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Spotlight Effect */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle 600px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212,175,55,0.15), transparent 60%)',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'opacity 0.4s ease'
                  }}
                />

                {/* Gradient Overlay */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' : 'rgba(0,0,0,0.4)',
                    transition: 'background 0.5s ease',
                    zIndex: 2
                  }} 
                />

                {/* Content */}
                <div className="services-content">
                  <motion.div
                    animate={{ 
                      y: isActive ? 0 : 10,
                      opacity: isActive ? 1 : 0.7
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.2em' }}>0{i + 1}</span>
                      <div style={{ height: 1, width: 30, background: 'var(--gold)' }} />
                    </div>
                    
                    <h3 className="services-title" style={{ 
                      fontSize: isActive ? 'var(--title-size-active)' : 'var(--title-size-inactive)', 
                      fontWeight: 700, 
                      color: '#FFF', 
                      margin: 0,
                      whiteSpace: 'nowrap',
                      transition: 'font-size 0.4s ease'
                    }}>
                      {service.title}
                    </h3>
                  </motion.div>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ color: '#DDD', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px', maxWidth: '400px', whiteSpace: 'normal' }}>
                          {service.description}
                        </p>
                        
                        <div className="services-meta">
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 10, textTransform: 'uppercase', color: '#888', letterSpacing: '1px' }}>Duration</span>
                            <span style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>{service.duration}</span>
                          </div>
                          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 10, textTransform: 'uppercase', color: '#888', letterSpacing: '1px' }}>Protection</span>
                            <span style={{ fontSize: 13, color: '#FFF', fontWeight: 600 }}>{service.protection}</span>
                          </div>
                          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 10, textTransform: 'uppercase', color: '#888', letterSpacing: '1px' }}>Starting At</span>
                            <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>{service.price}</span>
                          </div>
                        </div>

                        <button className="ae-btn-primary" style={{ padding: '10px 24px', fontSize: 12 }}>
                          Book Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-accordion {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 700px;
          height: 85vh;
          gap: 12px;
          border-radius: 24px;
          overflow: hidden;
        }

        .services-panel {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          --title-size-active: 24px;
          --title-size-inactive: 16px;
        }

        .services-content {
          position: relative;
          z-index: 3;
          padding: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .services-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        @media (min-width: 1024px) {
          .services-accordion {
            flex-direction: row;
            height: 70vh;
            min-height: 500px;
            gap: 10px;
          }
          .services-panel {
            --title-size-active: 32px;
            --title-size-inactive: 20px;
          }
          .services-content {
            padding: 30px 20px;
          }
          .services-meta {
            gap: 20px;
            flex-wrap: nowrap;
          }
        }
      `}</style>
    </section>
  );
}
