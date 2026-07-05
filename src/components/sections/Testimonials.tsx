'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/constants';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="testimonials" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div className="ae-container">
        
        <div className="ae-section-header" style={{ marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Client Stories</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            REAL <span className="gold">RESULTS</span>
          </motion.h2>
        </div>

        <div className="test-grid">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={i}
              className="test-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="test-quote-icon">
                <Quote size={40} strokeWidth={1} />
              </div>
              
              <p className="test-quote-text">
                "{testimonial.quote}"
              </p>
              
              <div className="test-footer">
                <div className="test-stars">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="test-name">{testimonial.name}</h4>
                <span className="test-car">{testimonial.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        .test-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }

        @media (min-width: 768px) {
          .test-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .test-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        .test-card {
          background: rgba(20, 20, 20, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          padding: 40px 30px;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.4s;
        }

        .test-card:hover {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(212, 175, 55, 0.2);
          transform: translateY(-5px);
        }

        .test-quote-icon {
          color: rgba(212, 175, 55, 0.15);
          margin-bottom: 24px;
        }

        .test-quote-text {
          font-size: 15px;
          line-height: 1.8;
          color: #DDD;
          margin-bottom: 40px;
          flex: 1;
        }

        .test-footer {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .test-stars {
          display: flex;
          gap: 4px;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .test-name {
          font-family: var(--font-heading);
          font-size: 16px;
          color: #FFF;
          letter-spacing: 0.5px;
        }

        .test-car {
          font-size: 12px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
      `}</style>
    </section>
  );
}
