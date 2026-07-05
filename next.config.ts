import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Transpile Three.js ecosystem
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  // Use Turbopack (Next.js 16 default)
  turbopack: {},
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;
