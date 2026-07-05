'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DROP_COUNT = 40;

export default function WaterScreenEffect() {
  const [triggered, setTriggered] = useState(false);
  const [drops, setDrops] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150 && !triggered) {
        setTriggered(true);
        const newDrops = Array.from({ length: DROP_COUNT }).map((_, i) => ({
          id: i,
          x: Math.random() * 100, // vw
          y: Math.random() * 80, // vh
          size: Math.random() * 15 + 10, // 10px to 25px
          delay: Math.random() * 0.4, 
          duration: Math.random() * 2.5 + 2, // drip speed
        }));
        setDrops(newDrops);
      } else if (window.scrollY < 50 && triggered) {
        setTriggered(false); // Reset when scrolled back to top
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggered]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, overflow: 'hidden' }}>
      <AnimatePresence>
        {triggered && drops.map((drop) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0, scale: 0, top: `${drop.y}vh` }}
            animate={{ 
              opacity: [0, 0.8, 0.8, 0], 
              scale: [0, 1, 1, 0.6],
              top: [`${drop.y}vh`, `${drop.y}vh`, `${drop.y + 40 + Math.random() * 20}vh`] 
            }}
            transition={{ 
              duration: drop.duration, 
              delay: drop.delay,
              times: [0, 0.1, 0.7, 1], // Appear quickly, stick, then drip and fade
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              left: `${drop.x}vw`,
              width: drop.size,
              height: drop.size * 1.3,
              borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 100%)',
              boxShadow: 'inset 0 -2px 5px rgba(0, 0, 0, 0.3), inset 0 2px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(4px) brightness(1.2)',
              WebkitBackdropFilter: 'blur(4px) brightness(1.2)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
