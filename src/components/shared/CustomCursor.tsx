'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 700 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 700 });
  const ringSX = useSpring(ringX, { damping: 20, stiffness: 200 });
  const ringSY = useSpring(ringY, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const observer = new MutationObserver(() => {
      const els = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select');
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn);
        el.addEventListener('mouseleave', handleHoverOut);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial set for existing elements
    const els = document.querySelectorAll('a, button, [data-cursor="hover"], input, textarea, select');
    els.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverIn);
      el.addEventListener('mouseleave', handleHoverOut);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [cursorX, cursorY, ringX, ringY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed z-[99999] h-2 w-2 rounded-full bg-[#D4AF37]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 10px #D4AF37, 0 0 25px rgba(212,175,55,0.6)',
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.1 } }}
      />

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[99998] rounded-full border border-[rgba(212,175,55,0.6)]"
        style={{
          x: ringSX,
          y: ringSY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 60 : isClicking ? 20 : 40,
          height: isHovering ? 60 : isClicking ? 20 : 40,
          backgroundColor: isHovering ? 'rgba(212,175,55,0.1)' : 'transparent',
          opacity: isVisible ? 1 : 0,
          rotate: isClicking ? 45 : 0,
          boxShadow: isHovering ? '0 0 20px rgba(212,175,55,0.3)' : 'none',
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          rotate: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </>
  );
}
