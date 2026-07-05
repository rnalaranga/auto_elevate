'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function InteractiveTransformation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // percentages
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <section className="ae-section" style={{ background: 'var(--bg-primary)', padding: '120px 0', overflow: 'hidden' }}>
      <div className="ae-container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <motion.div className="ae-eyebrow" initial={{ opacity: 0, y: 20 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }} transition={{ duration: 0.8 }}>
            <div className="ae-eyebrow-line reverse" />
            <span className="ae-eyebrow-text">Interactive Reveal</span>
            <div className="ae-eyebrow-line" />
          </motion.div>
          <motion.h2 className="ae-title" style={{ fontSize: 'clamp(32px, 8vw, 64px)', wordBreak: 'break-word', lineHeight: 1.2 }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 0.8, delay: 0.2 }}>
            CERAMIC <br className="mobile-only" /><span className="gold">TRANSFORMATION</span>
          </motion.h2>
          <motion.p style={{ color: 'var(--gray)', marginTop: 24, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase' }} initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }} transition={{ delay: 0.6 }}>
            Hover to reveal the Auto Elevate finish
          </motion.p>
        </div>

        {/* Interactive Flashlight Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 1, delay: 0.4 }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'relative',
            width: '100%',
            height: '70vh',
            maxHeight: '800px',
            minHeight: '500px',
            borderRadius: '24px',
            overflow: 'hidden',
            cursor: 'crosshair',
            boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
          }}
        >
          {/* BOTTOM LAYER: "Before" State (Grayscale, low contrast) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <img 
              src="/images/hilux_front.png" 
              alt="Vehicle Before" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: 'grayscale(100%) contrast(0.8) brightness(0.6) blur(1px)'
              }} 
            />
            {/* Dust overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(50, 45, 40, 0.4)', mixBlendMode: 'multiply' }} />
          </div>

          {/* TOP LAYER: "After" State (Revealed by mask) */}
          <motion.div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              zIndex: 2,
              // The magic CSS mask that creates the flashlight effect
              WebkitMaskImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent ${isHovered ? '25%' : '0%'})`,
              maskImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, black 0%, transparent ${isHovered ? '25%' : '0%'})`
            }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          >
            <img 
              src="/images/hilux_front.png" 
              alt="Vehicle After" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: 'contrast(1.4) brightness(1.25) saturate(1.4)' // Extra pop for the reveal (Super Shiny)
              }} 
            />
          </motion.div>

          {/* Golden Ring following the mouse */}
          <motion.div
            style={{
              position: 'absolute',
              zIndex: 3,
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              x: '-50%',
              y: '-50%',
              width: isHovered ? '50vh' : '0px',
              height: isHovered ? '50vh' : '0px',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.4)',
              boxShadow: 'inset 0 0 60px rgba(212,175,55,0.2), 0 0 40px rgba(212,175,55,0.4)',
              pointerEvents: 'none',
              opacity: isHovered ? 1 : 0
            }}
            transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
          />

          {/* Instructional Overlay (Fades out on hover) */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 60%)'
            }}
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              padding: '24px 48px',
              borderRadius: '100px',
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--text-primary)'
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)' }} />
              </div>
              <span style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Explore the Finish</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
