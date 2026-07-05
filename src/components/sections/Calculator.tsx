'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

const SIZES = [
  { id: 'coupe', label: 'Coupe / Sedan', multiplier: 1.0, icon: Car },
  { id: 'mid-suv', label: 'Mid-Size SUV', multiplier: 1.2, icon: Car },
  { id: 'large-suv', label: 'Large SUV / Truck', multiplier: 1.4, icon: Car },
];

const PACKAGES = [
  { id: 'ceramic-silver', label: 'Silver Ceramic (1 Year)', basePrice: 45000, type: 'coating' },
  { id: 'ceramic-gold', label: 'Gold Ceramic (3 Years)', basePrice: 85000, type: 'coating' },
  { id: 'ceramic-platinum', label: 'Platinum Ceramic (5+ Years)', basePrice: 150000, type: 'coating' },
  { id: 'ppf-front', label: 'Front-End PPF', basePrice: 250000, type: 'ppf' },
  { id: 'ppf-full', label: 'Full Body PPF', basePrice: 750000, type: 'ppf' },
  { id: 'paint-correction', label: 'Stage 2 Paint Correction', basePrice: 60000, type: 'correction' },
];

export default function Calculator() {
  const [size, setSize] = useState('coupe');
  const [selectedPackages, setSelectedPackages] = useState<string[]>(['ceramic-gold']);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sizeData = SIZES.find(s => s.id === size);
    const multiplier = sizeData ? sizeData.multiplier : 1;
    
    let newTotal = 0;
    selectedPackages.forEach(pkgId => {
      const pkg = PACKAGES.find(p => p.id === pkgId);
      if (pkg) {
        newTotal += pkg.basePrice * multiplier;
      }
    });
    
    setTotal(newTotal);
  }, [size, selectedPackages]);

  const togglePackage = (pkgId: string, type: string) => {
    setSelectedPackages(prev => {
      // If it's a coating or ppf, selecting a new one should deselect the other of the same type
      // But they can have coating + ppf + correction together.
      let newSelection = [...prev];
      
      const pkg = PACKAGES.find(p => p.id === pkgId);
      if (!pkg) return prev;
      
      if (prev.includes(pkgId)) {
        return prev.filter(id => id !== pkgId);
      } else {
        // Remove other packages of the same exclusive category (e.g. can't have Silver and Gold ceramic together)
        if (type === 'coating' || type === 'ppf') {
          newSelection = newSelection.filter(id => {
            const p = PACKAGES.find(x => x.id === id);
            return p?.type !== type;
          });
        }
        newSelection.push(pkgId);
        return newSelection;
      }
    });
  };

  // Format currency
  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0
  });

  return (
    <section id="estimate" className="ae-section" style={{ background: 'var(--bg-primary)', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="ae-container">
        
        <div className="ae-section-header" style={{ marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Transparent Pricing</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            BUILD YOUR <span className="gold">PACKAGE</span>
          </motion.h2>
        </div>

        <div className="calculator-grid">
          
          {/* Left Side: Selections */}
          <div className="calc-left">
            
            <div className="calc-group">
              <h3 className="calc-group-title">1. Select Vehicle Size</h3>
              <div className="size-grid">
                {SIZES.map(s => {
                  const isActive = size === s.id;
                  const Icon = s.icon;
                  return (
                    <div 
                      key={s.id} 
                      className={`size-card ${isActive ? 'active' : ''}`}
                      onClick={() => setSize(s.id)}
                    >
                      <Icon size={32} color={isActive ? 'var(--black)' : 'var(--gold)'} />
                      <span className="size-label">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="calc-group">
              <h3 className="calc-group-title">2. Select Services</h3>
              <div className="services-list">
                {PACKAGES.map(pkg => {
                  const isActive = selectedPackages.includes(pkg.id);
                  return (
                    <div 
                      key={pkg.id} 
                      className={`service-toggle ${isActive ? 'active' : ''}`}
                      onClick={() => togglePackage(pkg.id, pkg.type)}
                    >
                      <div className="service-toggle-left">
                        <div className={`checkbox ${isActive ? 'active' : ''}`}>
                          {isActive && <CheckCircle2 size={14} color="var(--black)" strokeWidth={3} />}
                        </div>
                        <span className="service-label">{pkg.label}</span>
                      </div>
                      <span className="service-price">
                        {formatter.format(pkg.basePrice * (SIZES.find(s => s.id === size)?.multiplier || 1))}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Side: Total */}
          <div className="calc-right">
            <div className="total-card ae-glass">
              <div className="total-header">
                <h3>Estimated Total</h3>
                <p>Prices are estimates and may vary based on vehicle condition.</p>
              </div>
              
              <div className="total-display">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={total}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="total-number"
                  >
                    {formatter.format(total)}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="total-footer">
                <a href="#contact" className="ae-btn-primary" style={{ width: '100%', marginTop: '30px' }}>Request Final Quote</a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .calculator-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (min-width: 1024px) {
          .calculator-grid {
            grid-template-columns: 1.5fr 1fr;
            gap: 60px;
          }
        }

        .calc-group {
          margin-bottom: 40px;
        }

        .calc-group-title {
          font-family: var(--font-heading);
          font-size: clamp(20px, 4vw, 24px);
          color: #FFF;
          margin-bottom: 24px;
          letter-spacing: 1px;
        }

        .size-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .size-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s;
          text-align: center;
        }

        .size-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(212,175,55,0.3);
        }

        .size-card.active {
          background: var(--gold);
          border-color: var(--gold);
        }

        .size-label {
          font-size: 13px;
          font-weight: 600;
          color: #FFF;
          letter-spacing: 0.5px;
        }

        .size-card.active .size-label {
          color: #000;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-toggle {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.3s;
        }

        @media (min-width: 768px) {
          .service-toggle {
            padding: 20px 24px;
          }
        }

        .service-toggle:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(212,175,55,0.3);
        }

        .service-toggle.active {
          border-color: var(--gold);
          background: rgba(212,175,55,0.05);
        }

        .service-toggle-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .service-toggle-left { gap: 16px; }
        }

        .checkbox {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          border: 2px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        @media (min-width: 768px) {
          .checkbox {
            width: 24px;
            height: 24px;
          }
        }

        .checkbox.active {
          background: var(--gold);
          border-color: var(--gold);
        }

        .service-label {
          font-size: clamp(14px, 3vw, 16px);
          font-weight: 600;
          color: #FFF;
        }

        .service-price {
          font-family: monospace;
          font-size: clamp(14px, 3vw, 16px);
          color: var(--gold);
          text-align: right;
        }

        /* Total Card */
        .total-card {
          position: sticky;
          top: 120px;
          border-radius: 24px;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .total-card {
            padding: 40px;
          }
        }

        .total-header h3 {
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--gold);
          margin-bottom: 8px;
        }

        .total-header p {
          font-size: 13px;
          color: #888;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .total-display {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .total-number {
          font-family: var(--font-heading);
          font-size: clamp(32px, 8vw, 56px);
          color: #FFF;
          font-weight: 900;
          letter-spacing: -1px;
        }

        @media (max-width: 768px) {
          .size-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
