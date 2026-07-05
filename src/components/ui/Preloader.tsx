'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(true); // To control unmounting

  useEffect(() => {
    // Check if we already showed the preloader in this session
    const hasLoaded = sessionStorage.getItem('ae_preloader_shown');
    if (hasLoaded) {
      setShow(false);
      setIsLoading(false);
      return;
    }

    // Simulate loading progress
    const duration = 2500; // 2.5 seconds total
    const intervalTime = 20; // update every 20ms
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('ae_preloader_shown', 'true');
            // Allow exit animation to play before unmounting completely
            setTimeout(() => setShow(false), 1000); 
          }, 400); // short pause at 100%
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100vh' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}
        >
          {/* Logo Outline filling up */}
          <div style={{ position: 'relative', marginBottom: '40px', overflow: 'hidden' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(40px, 8vw, 80px)',
              letterSpacing: '0.1em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.2)',
              margin: 0,
              lineHeight: 1
            }}>
              AUTO ELEVATE
            </h1>
            
            <motion.h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(40px, 8vw, 80px)',
              letterSpacing: '0.1em',
              color: 'var(--gold)',
              margin: 0,
              position: 'absolute',
              top: 0,
              left: 0,
              lineHeight: 1,
              clipPath: `inset(${100 - progress}% 0 0 0)` // Fills from bottom to top
            }}>
              AUTO ELEVATE
            </motion.h1>
          </div>

          {/* Progress Number */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', background: 'var(--gold)', width: `${progress}%` }}
              />
            </div>
            <span style={{ 
              fontFamily: 'monospace', 
              fontSize: '14px', 
              color: 'var(--gold)',
              fontWeight: 'bold',
              minWidth: '45px'
            }}>
              {Math.floor(progress)}%
            </span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
