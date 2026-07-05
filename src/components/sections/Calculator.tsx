'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Shield, Sparkles, CheckCircle2, Info } from 'lucide-react';

const SIZES = [
  { id: 'coupe', label: 'Coupe / Sedan', multiplier: 1.0, icon: Car },
  { id: 'mid-suv', label: 'Mid-Size SUV', multiplier: 1.2, icon: Car },
  { id: 'large-suv', label: 'Large SUV / Truck', multiplier: 1.4, icon: Car },
];

const PACKAGES = [
  { id: 'ceramic-silver', label: 'Silver Ceramic', subtitle: '1 Year Protection', basePrice: 45000, type: 'coating' },
  { id: 'ceramic-gold', label: 'Gold Ceramic', subtitle: '3 Years Protection', basePrice: 85000, type: 'coating' },
  { id: 'ceramic-platinum', label: 'Platinum Ceramic', subtitle: '5+ Years Protection', basePrice: 150000, type: 'coating' },
  { id: 'ppf-front', label: 'Front-End PPF', subtitle: 'High Impact Areas', basePrice: 250000, type: 'ppf' },
  { id: 'ppf-full', label: 'Full Body PPF', subtitle: 'Ultimate Protection', basePrice: 750000, type: 'ppf' },
  { id: 'paint-correction', label: 'Paint Correction', subtitle: 'Stage 2 Refinement', basePrice: 60000, type: 'correction' },
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
      let newSelection = [...prev];
      const pkg = PACKAGES.find(p => p.id === pkgId);
      if (!pkg) return prev;
      
      if (prev.includes(pkgId)) {
        return prev.filter(id => id !== pkgId);
      } else {
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

  const formatter = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 0
  });

  return (
    <section id="estimate" className="ae-section" style={{ position: 'relative', background: 'var(--bg-secondary)', padding: '120px 0', overflow: 'hidden' }}>
      
      {/* Background Enhancements */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(212,175,55,0.05), transparent 70%)', pointerEvents: 'none' }} />
      <div className="ae-grid-lines" style={{ opacity: 0.02, pointerEvents: 'none' }} />

      <div className="ae-container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div className="ae-section-header" style={{ marginBottom: 80 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">Transparent Pricing</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            BUILD YOUR <span className="gold">PACKAGE</span>
          </motion.h2>
        </div>

        <div className="calculator-layout">
          
          {/* Options Panel */}
          <div className="calc-options">
            
            {/* Step 1 */}
            <motion.div className="calc-step" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="step-header">
                <span className="step-number">01</span>
                <h3 className="step-title">Vehicle Size</h3>
              </div>
              <div className="size-selector">
                {SIZES.map(s => {
                  const isActive = size === s.id;
                  const Icon = s.icon;
                  return (
                    <div 
                      key={s.id} 
                      className={`size-badge ${isActive ? 'active' : ''}`}
                      onClick={() => setSize(s.id)}
                    >
                      <Icon size={24} className="size-icon" />
                      <span>{s.label}</span>
                      {isActive && <motion.div layoutId="size-active" className="size-active-bg" />}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div className="calc-step" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className="step-header">
                <span className="step-number">02</span>
                <h3 className="step-title">Select Treatments</h3>
              </div>
              <div className="services-grid">
                {PACKAGES.map(pkg => {
                  const isActive = selectedPackages.includes(pkg.id);
                  const price = pkg.basePrice * (SIZES.find(s => s.id === size)?.multiplier || 1);
                  return (
                    <motion.div 
                      key={pkg.id} 
                      className={`service-card ${isActive ? 'active' : ''}`}
                      onClick={() => togglePackage(pkg.id, pkg.type)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive && <div className="service-card-glow" />}
                      <div className="service-card-content">
                        <div className="service-card-top">
                          <div className={`service-check ${isActive ? 'active' : ''}`}>
                            <CheckCircle2 size={16} />
                          </div>
                          <span className="service-price">{formatter.format(price)}</span>
                        </div>
                        <div className="service-card-bottom">
                          <h4 className="service-name">{pkg.label}</h4>
                          <span className="service-sub">{pkg.subtitle}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

          </div>

          {/* Sticky Total HUD */}
          <div className="calc-summary">
            <motion.div 
              className="hud-panel"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="hud-glow" />
              
              <div className="hud-content">
                <div className="hud-header">
                  <Sparkles size={20} color="var(--gold)" />
                  <span>Estimated Investment</span>
                </div>
                
                <div className="hud-price-container">
                  <span className="hud-currency">LKR</span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={total}
                      initial={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="hud-amount"
                    >
                      {new Intl.NumberFormat('en-LK').format(total)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="hud-divider" />
                
                <ul className="hud-breakdown">
                  {selectedPackages.map(pkgId => {
                    const pkg = PACKAGES.find(p => p.id === pkgId);
                    if (!pkg) return null;
                    return (
                      <motion.li key={pkgId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="hud-item">
                        <span>{pkg.label}</span>
                        <CheckCircle2 size={14} color="var(--gold)" />
                      </motion.li>
                    );
                  })}
                </ul>

                <a href="#contact" className="ae-btn-primary hud-btn">
                  Book This Package
                </a>
                
                <p className="hud-disclaimer">
                  <Info size={12} />
                  Prices are estimates. Final quote depends on vehicle condition.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      <style>{`
        .calculator-layout {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        @media (min-width: 1024px) {
          .calculator-layout {
            flex-direction: row;
            align-items: flex-start;
          }
          .calc-options { flex: 1.5; }
          .calc-summary { flex: 1; position: sticky; top: 120px; }
        }

        .calc-step {
          margin-bottom: 60px;
        }

        .step-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 30px;
        }

        .step-number {
          font-family: var(--font-heading);
          font-size: 24px;
          color: transparent;
          -webkit-text-stroke: 1px var(--gold);
        }

        .step-title {
          font-family: var(--font-heading);
          font-size: 24px;
          color: #FFF;
          letter-spacing: 1px;
        }

        /* Size Selector */
        .size-selector {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: rgba(10,10,10,0.5);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 8px;
          border-radius: 20px;
        }

        @media (min-width: 768px) {
          .size-selector {
            flex-direction: row;
            border-radius: 100px;
          }
        }

        .size-badge {
          position: relative;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px;
          border-radius: 16px;
          cursor: pointer;
          color: var(--gray);
          font-weight: 600;
          font-size: 14px;
          transition: color 0.3s;
          z-index: 1;
        }

        @media (min-width: 768px) {
          .size-badge { border-radius: 100px; padding: 16px 24px; }
        }

        .size-badge.active {
          color: #000;
        }

        .size-icon {
          color: var(--gray);
          transition: color 0.3s;
        }

        .size-badge.active .size-icon {
          color: #000;
        }

        .size-active-bg {
          position: absolute;
          inset: 0;
          background: var(--gold);
          border-radius: 16px;
          z-index: -1;
          box-shadow: 0 10px 30px rgba(212,175,55,0.3);
        }

        @media (min-width: 768px) {
          .size-active-bg { border-radius: 100px; }
        }

        /* Services Grid */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .service-card {
          position: relative;
          background: rgba(15,15,15,0.8);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 24px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s;
        }

        .service-card:hover {
          background: rgba(25,25,25,0.9);
          border-color: rgba(255,255,255,0.1);
        }

        .service-card.active {
          border-color: var(--gold);
          background: rgba(212,175,55,0.05);
        }

        .service-card-glow {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 100px;
          height: 100px;
          background: var(--gold);
          filter: blur(50px);
          opacity: 0.3;
          pointer-events: none;
        }

        .service-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 24px;
        }

        .service-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .service-check {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: transparent;
          transition: all 0.3s;
        }

        .service-check.active {
          background: var(--gold);
          border-color: var(--gold);
          color: #000;
        }

        .service-price {
          font-family: monospace;
          font-size: 16px;
          color: var(--gold);
          font-weight: 600;
        }

        .service-card-bottom {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .service-name {
          font-size: 18px;
          font-weight: 700;
          color: #FFF;
        }

        .service-sub {
          font-size: 12px;
          color: var(--gray);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* HUD Panel */
        .hud-panel {
          position: relative;
          background: rgba(10,10,10,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 30px;
          padding: 40px;
          overflow: hidden;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }

        .hud-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 100%, rgba(212,175,55,0.15), transparent 70%);
          pointer-events: none;
        }

        .hud-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        .hud-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gray);
        }

        .hud-price-container {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-bottom: 30px;
        }

        .hud-currency {
          font-size: 20px;
          font-weight: 700;
          color: var(--gold);
          margin-top: 8px;
        }

        .hud-amount {
          font-family: var(--font-heading);
          font-size: clamp(48px, 6vw, 72px);
          font-weight: 900;
          color: #FFF;
          line-height: 1;
          letter-spacing: -2px;
        }

        .hud-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(212,175,55,0.5), transparent);
          margin-bottom: 30px;
        }

        .hud-breakdown {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hud-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #DDD;
        }

        .hud-btn {
          width: 100%;
          text-align: center;
          padding: 16px;
          font-size: 14px;
          margin-bottom: 20px;
          display: block;
        }

        .hud-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11px;
          color: var(--gray);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
