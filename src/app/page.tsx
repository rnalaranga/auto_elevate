'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

// Loading screen — eager
import LoadingScreen from '@/components/sections/LoadingScreen';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InteractiveTransformation from '@/components/sections/InteractiveTransformation';

// Heavy sections — lazy loaded
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/sections/About'));
const Services = dynamic(() => import('@/components/sections/Services'));
const Calculator = dynamic(() => import('@/components/sections/Calculator'));
const WhyChooseUs = dynamic(() => import('@/components/sections/WhyChooseUs'));
const Process = dynamic(() => import('@/components/sections/Process'));
const ModelShowcase = dynamic(() => import('@/components/sections/ModelShowcase'), { ssr: false });
const Gallery = dynamic(() => import('@/components/sections/Gallery'));
const VideoShowcase = dynamic(() => import('@/components/sections/VideoShowcase'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const CTA = dynamic(() => import('@/components/sections/CTA'));
const Contact = dynamic(() => import('@/components/sections/Contact'));
const CustomCursor = dynamic(() => import('@/components/shared/CustomCursor'), { ssr: false });
const ScrollLight = dynamic(() => import('@/components/shared/ScrollLight'), { ssr: false });
const WaterScreenEffect = dynamic(() => import('@/components/shared/WaterScreenEffect'), { ssr: false });

import Brands from '@/components/sections/Brands';

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--bg-primary)]">
      {/* Premium cursor */}
      <CustomCursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      {/* App content — rendered behind loading, revealed after */}
      <div
        className="transition-opacity duration-700 relative z-10"
        style={{ opacity: isLoaded ? 1 : 0, pointerEvents: isLoaded ? 'all' : 'none' }}
      >
        <ScrollLight />
        <WaterScreenEffect />
        <Navbar />
        <Hero />
        <Brands />
        <About />
        <ModelShowcase />
        <Services />
        <WhyChooseUs />
        <Process />
        <InteractiveTransformation />
        <Gallery />
        <VideoShowcase />
        <Testimonials />
        <Calculator />
        <CTA />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
