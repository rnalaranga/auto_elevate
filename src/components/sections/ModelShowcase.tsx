'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Target } from 'lucide-react';

export default function ModelShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      id="3d-showcase" 
      ref={sectionRef}
      className="ae-section model-showcase-section" 
      onMouseMove={handleMouseMove}
    >
      
      {/* Background Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="ae-container" style={{ position: 'relative', zIndex: 10, height: '100%', pointerEvents: 'none' }}>
        
        {/* Top Header - Centered */}
        <div className="model-header text-center flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="model-header-title"
          >
            INTERACTIVE <span style={{ color: 'var(--gold)' }}>SHOWCASE</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="model-header-desc"
          >
            Hover over the vehicle to inspect. Experience the depth of our ceramic coatings and paint correction from every angle.
          </motion.p>
        </div>

        {/* Interactive 2D Car Image with Parallax */}
        <div className="car-container">
          <motion.img 
            src="/images/raize_studio.png" 
            alt="Toyota Raize Showcase"
            className="car-image"
            animate={{
              x: mousePosition.x * -40,
              y: mousePosition.y * -40,
              scale: isInView ? 1 : 0.95,
              opacity: isInView ? 1 : 0
            }}
            transition={{
              x: { type: 'spring', stiffness: 50, damping: 20 },
              y: { type: 'spring', stiffness: 50, damping: 20 },
              scale: { duration: 1.5, ease: "easeOut" },
              opacity: { duration: 1 }
            }}
          />
          
          {/* Floor Reflection Gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2
          }} />
        </div>

        {/* Floating Hint */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ delay: 1 }}
          style={{ 
            position: 'absolute', 
            bottom: 60, 
            left: '50%', 
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(20,20,20,0.6)',
            backdropFilter: 'blur(10px)',
            padding: '12px 24px',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.1)',
            pointerEvents: 'none',
            zIndex: 20
          }}
        >
          <Target size={20} color="var(--gold)" />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFF' }}>
            Hover to Inspect Details
          </span>
        </motion.div>

        {/* HUD Hotspots */}
        <div className="hotspots-container">
          
          {/* Top Left: Exterior */}
          <motion.div className="hotspot top-left" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}>
            <div className="hotspot-dot" />
            <div className="hotspot-line left" />
            <div className="hotspot-content">
              <span className="hotspot-title">Exterior Detail</span>
              <span className="hotspot-desc">Deep Cleansing & Prep</span>
            </div>
          </motion.div>

          {/* Bottom Left: Interior */}
          <motion.div className="hotspot bottom-left" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.0 }}>
            <div className="hotspot-dot" />
            <div className="hotspot-line left" />
            <div className="hotspot-content">
              <span className="hotspot-title">Interior Detail</span>
              <span className="hotspot-desc">Leather & Trim Restoration</span>
            </div>
          </motion.div>

          {/* Top Right: Paint Correction */}
          <motion.div className="hotspot top-right" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.9 }}>
            <div className="hotspot-content">
              <span className="hotspot-title">Paint Correction</span>
              <span className="hotspot-desc">Swirl & Scratch Removal</span>
            </div>
            <div className="hotspot-line right" />
            <div className="hotspot-dot" />
          </motion.div>

          {/* Bottom Right: Ceramic */}
          <motion.div className="hotspot bottom-right" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 1.1 }}>
            <div className="hotspot-content">
              <span className="hotspot-title">Ceramic Coating</span>
              <span className="hotspot-desc">9H Hardness Protection</span>
            </div>
            <div className="hotspot-line right" />
            <div className="hotspot-dot" />
          </motion.div>

        </div>

      </div>

      <style>{`
        .model-showcase-section {
          position: relative;
          height: 80vh;
          min-height: 600px;
          background: var(--bg-primary);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .car-container {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          padding-top: 80px; /* Push car down so it doesn't hit the centered text */
        }

        .car-image {
          width: 100%;
          max-width: 1600px;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: lighten;
          transform: scale(1.35); /* Made even bigger */
        }

        .model-header {
          position: absolute;
          top: 40px;
          left: 0;
          right: 0;
          z-index: 10;
        }

        .model-header-title {
          font-family: var(--font-heading);
          font-size: clamp(28px, 6vw, 64px);
          color: #FFF;
          margin: 0;
          line-height: 1.1;
        }

        .model-header-desc {
          color: #888;
          margin-top: 12px;
          max-width: 400px;
          font-size: 13px;
          line-height: 1.5;
          position: relative;
          z-index: 20;
        }

        /* Hotspots Container */
        .hotspots-container {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
        }

        .hotspot {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 8px;
          transform: scale(0.85);
        }

        .hotspot.top-left { top: 20%; left: 0%; }
        .hotspot.bottom-left { bottom: 20%; left: 0%; }
        .hotspot.top-right { top: 25%; right: 0%; }
        .hotspot.bottom-right { bottom: 25%; right: 0%; }

        .hotspot-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
          box-shadow: 0 0 15px var(--gold);
          position: relative;
          flex-shrink: 0;
        }

        .hotspot-dot::after {
          content: '';
          position: absolute;
          inset: -6px;
          border: 1px solid rgba(212,175,55,0.5);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .hotspot-line {
          height: 1px;
          width: 24px;
          flex-shrink: 0;
        }
        .hotspot-line.left { background: linear-gradient(90deg, rgba(212,175,55,0.5), transparent); }
        .hotspot-line.right { background: linear-gradient(270deg, rgba(212,175,55,0.5), transparent); }

        .hotspot-content {
          background: rgba(10,10,10,0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(212,175,55,0.3);
          padding: 8px 12px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }

        .hotspot-title {
          font-size: 11px;
          font-weight: 700;
          color: var(--gold);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 2px;
          white-space: nowrap;
        }

        .hotspot-desc {
          font-size: 11px;
          color: #AAA;
          white-space: nowrap;
        }

        @media (min-width: 768px) {
          .model-showcase-section {
            height: 100vh;
            min-height: 800px;
          }
          
          .model-header {
            top: 60px;
          }

          .model-header-desc {
            font-size: 16px;
            max-width: 500px;
          }

          .hotspot {
            transform: scale(1);
          }

          .hotspot.top-left { top: 25%; left: 5%; }
          .hotspot.bottom-left { bottom: 25%; left: 5%; }
          .hotspot.top-right { top: 30%; right: 5%; }
          .hotspot.bottom-right { bottom: 30%; right: 5%; }

          .hotspot-line { width: 80px; }
          .hotspot-title { font-size: 12px; }
          .hotspot-desc { font-size: 12px; }
          .hotspot-dot { width: 12px; height: 12px; }
          .hotspot-dot::after { inset: -8px; }
          
          .car-image {
            width: 100%;
          }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
