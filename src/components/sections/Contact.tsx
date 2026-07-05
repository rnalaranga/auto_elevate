'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { COMPANY } from '@/lib/constants';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="ae-container">

        <div className="ae-section-header">
          <motion.div className="ae-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Book Now</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            REQUEST A <span className="gold">QUOTE</span>
          </motion.h2>
        </div>

        <div className="ae-contact-grid">
          
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -40 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <h3 className="ae-contact-info-title">Contact Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div className="ae-contact-row">
                <div className="ae-contact-icon"><MapPin size={20} /></div>
                <div>
                  <h4 className="ae-contact-label">Studio Location</h4>
                  <p className="ae-contact-value">{COMPANY.address.split(',')[0]}<br/>{COMPANY.address.split(',').slice(1).join(',')}</p>
                </div>
              </div>
              <div className="ae-contact-row">
                <div className="ae-contact-icon"><Phone size={20} /></div>
                <div>
                  <h4 className="ae-contact-label">Direct Line</h4>
                  <p className="ae-contact-value">{COMPANY.phone}</p>
                </div>
              </div>
              <div className="ae-contact-row">
                <div className="ae-contact-icon"><Clock size={20} /></div>
                <div>
                  <h4 className="ae-contact-label">Hours of Operation</h4>
                  <p className="ae-contact-value">Mon - Fri: 8:00 AM - 6:00 PM<br/>Weekend by Appointment Only</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.5 }} className="ae-form-card ae-glass">
            <form onSubmit={e => e.preventDefault()}>
              <div className="ae-form-row">
                <div className="ae-field">
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" />
                </div>
                <div className="ae-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="ae-field">
                <label>Vehicle Make & Model</label>
                <input type="text" placeholder="e.g. Porsche 911 GT3" />
              </div>
              <div className="ae-field">
                <label>Services Needed</label>
                <select defaultValue="">
                  <option value="" disabled>Select a primary service</option>
                  <option value="ceramic">Ceramic Coating</option>
                  <option value="ppf">Paint Protection Film</option>
                  <option value="correction">Paint Correction</option>
                  <option value="interior">Interior Restoration</option>
                </select>
              </div>
              <button className="ae-submit-btn">Submit Request</button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
