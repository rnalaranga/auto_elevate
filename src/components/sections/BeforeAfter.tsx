'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const PAIRS = [
  { label: 'Paint Correction', before: 'Swirl marks, water spots, oxidation', after: 'Mirror-perfect, flawless gloss', beforeImg: '/images/before_paint.png', afterImg: '/images/after_paint.png' },
  { label: 'Interior Detailing', before: 'Stained leather, dusty surfaces', after: 'Showroom-condition interior', beforeImg: '/images/before_interior.png', afterImg: '/images/after_interior.png' },
];

const seed = (s: number) => { const x = Math.sin(s + 1) * 10000; return x - Math.floor(x); };

function Slider({ pair }: { pair: typeof PAIRS[0] }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  const update = useCallback((x: number) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  }, []);

  return (
    <div ref={ref} className="ae-slider-wrap"
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={e => dragging && update(e.clientX)}
      onTouchMove={e => update(e.touches[0].clientX)}
    >
      {/* Before */}
      <div className="ae-slider-before" style={{ background: 'var(--bg-tertiary)' }}>
        <img src={pair.beforeImg} alt="Before" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span className="ae-slider-badge before">{pair.before}</span>
      </div>
      {/* After */}
      <div className="ae-slider-after" style={{ clipPath: `polygon(0 0, ${pos}% 0, ${pos}% 100%, 0 100%)`, background: 'var(--bg-primary)' }}>
        <img src={pair.afterImg} alt="After" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <span className="ae-slider-badge after">{pair.after}</span>
      </div>
      {/* Divider */}
      <div className="ae-slider-divider" style={{ left: `${pos}%` }}>
        <div className="ae-slider-handle">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10h8M3 7l-3 3 3 3M17 7l3 3-3 3" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* Label */}
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.8)', border: '1px solid var(--text-primary)', borderRadius: 100, padding: '6px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', whiteSpace: 'nowrap' }}>
        {pair.label}
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [active, setActive] = useState(0);

  return (
    <section id="before-after" ref={sectionRef} className="ae-section" style={{ background: 'var(--bg-primary)' }}>
      <div className="ae-container">

        <div className="ae-section-header">
          <motion.div className="ae-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line" />
            <span className="ae-eyebrow-text">The Transformation</span>
            <div className="ae-eyebrow-line reverse" />
          </motion.div>
          <motion.h2 className="ae-title" initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            BEFORE & <span className="gold">AFTER</span>
          </motion.h2>
          <p style={{ marginTop: 16, color: 'var(--text-primary)', fontSize: 14 }}>Drag the slider to reveal the transformation</p>
        </div>

        <div className="ae-slider-tabs">
          {PAIRS.map((p, i) => (
            <button key={i} className={`ae-slider-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>{p.label}</button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.97 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Slider pair={PAIRS[active]} />
        </motion.div>

      </div>
    </section>
  );
}
