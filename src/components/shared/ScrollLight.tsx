'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollLight() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 50, // Behind navbar (which is usually 1000)
            background: 'linear-gradient(to bottom, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.08) 30%, transparent 100%)',
            boxShadow: 'inset 0 200px 200px -200px rgba(212,175,55,0.3)',
          }}
        >
          {/* Spotlight beam */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '80vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40vw',
              maxWidth: '600px',
              background: 'radial-gradient(ellipse at top, rgba(212,175,55,0.4) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
