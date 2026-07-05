'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Droplet, Car, Search } from 'lucide-react';
import { useState } from 'react';

const STEPS = [
  { title: 'Inspection', desc: 'Comprehensive paint depth analysis and surface evaluation using professional lighting to determine the optimal correction approach for your specific vehicle.', icon: Search, image: '/images/gallery_1.png' },
  { title: 'Decontamination', desc: 'Chemical and mechanical removal of embedded iron particles, tar, and environmental fallout. We use clay bars and specialized solvents to make the paint perfectly smooth.', icon: Droplet, image: '/images/gallery_2.png' },
  { title: 'Correction', desc: 'Multi-stage machine polishing to permanently remove scratches, swirl marks, holograms, and oxidation. Restoring the clear coat to a mirror-like factory finish.', icon: Sparkles, image: '/images/service_correction.png' },
  { title: 'Protection', desc: 'Application of professional-grade ceramic coating, graphene coating, or paint protection film (PPF) in a controlled environment to lock in the perfection.', icon: ShieldCheck, image: '/images/service_ceramic.png' },
  { title: 'Final Detail', desc: 'Meticulous finishing touches on all glass, trim, wheels, and interior surfaces. A comprehensive final inspection ensures a flawless presentation upon delivery.', icon: Car, image: '/images/gallery_5.png' },
];

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section id="process" className="ae-section" style={{ 
      position: 'relative', 
      padding: '120px 0',
      background: 'var(--bg-secondary)',
      overflow: 'hidden'
    }}>
      
      <div className="ae-container" style={{ position: 'relative', zIndex: 3 }}>
        
        <div className="ae-section-header" style={{ marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Our Methodology</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            THE <span className="gold">5-STAGE</span> PROCESS
          </motion.h2>
        </div>

        {/* Expanding Accordion */}
        <div className="process-accordion-container">
          {STEPS.map((step, i) => {
            const isActive = hoveredIndex === i;
            const Icon = step.icon;
            
            return (
              <motion.div 
                key={i} 
                className="process-accordion-panel"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{ 
                  flex: isActive ? 4 : 1,
                }}
                transition={{ 
                  flex: { type: 'spring', stiffness: 80, damping: 20 },
                  y: { duration: 0.8, delay: i * 0.1 }
                }}
                style={{
                  boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.5)' : 'none'
                }}
              >
                {/* Background Image for Panel */}
                <motion.img 
                  src={step.image} 
                  alt={step.title} 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    zIndex: 0
                  }} 
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    filter: isActive ? 'grayscale(0%) brightness(0.6)' : 'grayscale(100%) brightness(0.2)'
                  }}
                  transition={{ duration: 0.6 }}
                />
                
                {/* Spotlight Effect */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle 600px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212,175,55,0.2), transparent 60%)',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: 'none',
                    zIndex: 1,
                    transition: 'opacity 0.4s ease'
                  }}
                />

                {/* Gradient Overlay for Text Readability */}
                <div 
                  style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: isActive ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.8) 100%)' : 'rgba(0,0,0,0.7)',
                    transition: 'background 0.5s ease',
                    zIndex: 2
                  }} 
                />
                
                {/* Collapsed State (Rotated Text) */}
                <div className={`process-collapsed-content ${isActive ? 'hidden' : 'visible'}`}>
                  <span className="collapsed-number">0{i + 1}</span>
                  <div className="collapsed-line" />
                  <span className="collapsed-title">{step.title}</span>
                </div>

                {/* Expanded State (Full Content) */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      className="process-expanded-content"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <div className="expanded-header">
                        <span className="expanded-number">0{i + 1}</span>
                        <div className="expanded-icon-wrap">
                          <Icon size={28} color="var(--gold)" />
                        </div>
                      </div>
                      
                      <div className="expanded-body">
                        <h3 className="expanded-title">{step.title}</h3>
                        <div className="expanded-divider" />
                        <p className="expanded-desc">{step.desc}</p>
                      </div>
                      
                      <div className="expanded-watermark">
                        0{i + 1}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .process-accordion-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-height: 700px;
          height: 85vh;
          gap: 12px;
          border-radius: 24px;
        }

        .process-accordion-panel {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          display: flex;
          transition: border-color 0.4s;
        }

        /* Collapsed State */
        .process-collapsed-content {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          transition: opacity 0.3s;
          padding: 16px;
          z-index: 5;
        }

        .process-collapsed-content.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .process-collapsed-content.visible {
          opacity: 1;
        }

        .collapsed-number {
          font-size: 20px;
          font-weight: 800;
          color: var(--gold);
        }

        .collapsed-line {
          width: 30px;
          height: 1px;
          background: rgba(255,255,255,0.2);
        }

        .collapsed-title {
          font-size: 16px;
          font-weight: 600;
          color: #FFF;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        /* Expanded State */
        .process-expanded-content {
          position: absolute;
          inset: 0;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          z-index: 5;
        }

        .expanded-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .expanded-number {
          font-size: 48px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(212,175,55,0.4);
          line-height: 1;
        }

        .expanded-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(212,175,55,0.1);
          border: 1px solid rgba(212,175,55,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .expanded-body {
          margin-top: auto;
          max-width: 400px;
        }

        .expanded-title {
          font-size: 28px;
          font-weight: 700;
          color: #FFF;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .expanded-divider {
          width: 40px;
          height: 3px;
          background: var(--gold);
          margin-bottom: 16px;
        }

        .expanded-desc {
          font-size: 14px;
          color: #DDD;
          line-height: 1.6;
        }

        .expanded-watermark {
          position: absolute;
          bottom: -10px;
          right: -10px;
          font-size: 140px;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          line-height: 1;
          pointer-events: none;
          z-index: -1;
        }

        @media (min-width: 768px) {
          .process-accordion-container {
            min-height: 600px;
          }
          .expanded-title { font-size: 36px; }
          .expanded-desc { font-size: 16px; }
        }

        @media (min-width: 1024px) {
          .process-accordion-container {
            flex-direction: row;
            height: 65vh;
            min-height: 500px;
          }
          
          .process-collapsed-content {
            flex-direction: column;
            gap: 20px;
          }
          
          .collapsed-title {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
            font-size: 18px;
            letter-spacing: 2px;
          }

          .collapsed-line {
            width: 1px;
            height: 40px;
          }
          
          .collapsed-number { font-size: 24px; }

          .process-expanded-content {
            padding: 50px;
          }
          
          .expanded-number { font-size: 64px; }
          .expanded-icon-wrap { width: 64px; height: 64px; }
          
          .expanded-title {
            font-size: 48px;
            margin-bottom: 16px;
          }
          
          .expanded-desc {
            font-size: 16px;
            line-height: 1.7;
          }
          
          .expanded-watermark {
            font-size: 240px;
            bottom: -20px;
          }
        }
      `}</style>
    </section>
  );
}
