'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={sectionRef} className="ae-video-section">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }} transition={{ duration: 1 }}>
        {!isPlaying ? (
          <div className="ae-video-thumb" onClick={() => setIsPlaying(true)}>
            <img src="/images/video_thumb.png" alt="Auto Elevate Video" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            
            <div className="ae-video-play">
              <div className="ae-play-btn">
                <Play fill="#000" size={32} />
              </div>
            </div>
          </div>
        ) : (
          <div className="ae-video-thumb" style={{ background: 'var(--bg-primary)' }}>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
              title="Auto Elevate Showcase" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
