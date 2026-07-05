'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>('loading');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    const duration = 2000; // Faster loading
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 4); // easeOutQuart
      current = Math.floor(eased * 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(intervalRef.current!);
        setTimeout(() => setPhase('reveal'), 200);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 1500); // Wait for curtain animation
      }
    }, 16);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center pointer-events-none">
      
      {/* Left Curtain */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-1/2 bg-[var(--bg-primary)]"
        initial={{ x: 0 }}
        animate={{ x: phase === 'reveal' ? '-100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Right Curtain */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-[var(--bg-primary)]"
        initial={{ x: 0 }}
        animate={{ x: phase === 'reveal' ? '100%' : 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center Content (Fades out before curtains open) */}
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'reveal' ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.img 
          src="/images/logo.png" 
          alt="Auto Elevate" 
          style={{ height: 60, width: 'auto', marginBottom: 24 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Minimal Progress Line */}
        <div className="relative w-[200px] h-[1px] bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[var(--gold)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 text-[10px] tracking-[0.4em] text-[var(--gray)] uppercase font-semibold">
          {progress}%
        </div>
      </motion.div>
    </div>
  );
}
