'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { STATS } from '@/lib/constants';
import { Award, Users, Clock, ThumbsUp } from 'lucide-react';

const STAT_ICONS = [Users, Clock, ThumbsUp, Award];

function AnimatedCounter({ target, suffix, isActive }: { target: number; suffix: string; isActive: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat(((target) * eased).toFixed(1)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isActive, target]);
  return <span className="ae-stat-number">{Number.isInteger(target) ? Math.round(count) : count.toFixed(1)}{suffix}</span>;
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const cards = [
    { title: 'Certified Experts', desc: 'Every technician is trained and certified by leading industry organizations. Your vehicle is always in expert hands.', icon: Award },
    { title: 'Premium Products', desc: 'We exclusively use professional-grade products from Gyeon, Gtechniq, STEK, and Modesta — the highest standard.', icon: ThumbsUp },
    { title: 'Precision Process', desc: 'Our 5-stage detailing process has been refined over thousands of vehicles. No shortcuts, no compromises.', icon: Clock },
    { title: 'White-Glove Service', desc: 'From consultation to delivery, every interaction reflects the luxury and care your vehicle deserves.', icon: Users },
  ];

  return (
    <section id="why-us" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="ae-container">

        <div className="ae-section-header">
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">The Difference</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            WHY CHOOSE <span className="gold">AUTO ELEVATE</span>
          </motion.h2>
        </div>

        {/* Stats */}
        <motion.div className="ae-stats-grid" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.3 }}>
          {STATS.map((stat, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div key={i} className="ae-stat-cell">
                <div className="ae-stat-icon"><Icon size={20} /></div>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} isActive={isInView} />
                <span className="ae-stat-label">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>

        {/* Cards */}
        <div className="ae-grid ae-grid-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div key={i} className="ae-card" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}>
                <div className="ae-card-body">
                  <div className="ae-icon-box"><Icon size={22} /></div>
                  <h3 className="ae-card-title">{card.title}</h3>
                  <p className="ae-card-text">{card.desc}</p>
                  <span className="ae-card-underline" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
