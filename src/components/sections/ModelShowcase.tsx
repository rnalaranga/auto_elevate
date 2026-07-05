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
          <motion.div
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            animate={{
              x: mousePosition.x * -40,
              y: mousePosition.y * -40,
              opacity: isInView ? 1 : 0
            }}
            transition={{
              x: { type: 'spring', stiffness: 50, damping: 20 },
              y: { type: 'spring', stiffness: 50, damping: 20 },
              opacity: { duration: 1 }
            }}
          >
            <img 
              src="/images/raize_studio.png" 
              alt="Toyota Raize Showcase"
              className="car-image"
            />
          </motion.div>
          
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
          className="hover-indicator"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
          transition={{ delay: 1 }}
          style={{ 
            position: 'absolute', 
            bottom: 60, 
            left: '50%', 
            transform: 'translateX(-50%)',
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
          min-height: 100vh;
          background: var(--bg-primary);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 80px 20px 40px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .model-header {
          position: relative;
          z-index: 10;
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 40px;
        }

        .model-header-title {
          font-family: var(--font-heading);
          font-size: clamp(28px, 8vw, 64px);
          color: #FFF;
          margin: 0;
          line-height: 1.1;
        }

        .model-header-desc {
          color: #888;
          margin-top: 12px;
          max-width: 400px;
          font-size: 14px;
          line-height: 1.5;
        }

        .car-container {
          position: relative;
          width: 100%;
          height: 45vh; /* Increased height to prevent clipping */
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          margin-bottom: 20px;
        }

        .car-image {
          width: 100%;
          max-width: 800px;
          height: 100%;
          object-fit: contain;
          mix-blend-mode: screen; 
          transform: scale(1.4);
          filter: contrast(1.2) brightness(0.9);
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 75%, transparent 100%);
          mask-image: radial-gradient(ellipse at 50% 50%, black 75%, transparent 100%);
        }

        .hover-indicator {
          display: none; /* Hide hover indicator on mobile completely */
        }

        .hotspots-container {
          position: relative;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr; /* 1 column on mobile to prevent squashing */
          gap: 16px;
          z-index: 5;
        }

        .hotspot {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          background: rgba(10,10,10,0.8);
          border-radius: 12px;
          padding: 16px;
        }

        /* Hide the connecting lines/dots on mobile since it's a grid */
        .hotspot-dot, .hotspot-line {
          display: none;
        }

        .hotspot-content {
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
          }
          
          .model-header {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            margin-bottom: 0;
          }

          .model-header-desc {
            font-size: 16px;
            max-width: 500px;
          }

          .car-container {
            position: absolute;
            inset: 0;
            height: auto;
            margin-bottom: 0;
            padding-top: 150px;
          }

          .car-image {
            width: 100%;
            transform: scale(1.6); /* Reduced from 1.9 to fit better */
          }

          .hover-indicator {
            display: flex;
          }

          .hotspots-container {
            position: absolute;
            inset: 0;
            display: block;
            pointer-events: none;
          }

          .hotspot {
            position: absolute;
            transform: scale(1);
            background: transparent;
            border: none;
            padding: 0;
            flex-direction: row;
            align-items: center;
            gap: 12px;
          }

          .hotspot-dot, .hotspot-line {
            display: block;
          }

          .hotspot-content {
            background: rgba(10,10,10,0.8);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(212,175,55,0.3);
            padding: 8px 12px;
            border-radius: 8px;
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
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
