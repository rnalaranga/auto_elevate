import type { Metadata } from 'next';
import './globals.css';
import './site.css';
import LenisProvider from '@/components/providers/LenisProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import Preloader from '@/components/ui/Preloader';

export const metadata: Metadata = {
  title: 'Auto Elevate | Ultra-Premium Automotive Detailing',
  description: 'The pinnacle of automotive detailing in Beverly Hills. Ceramic coating, paint protection film, paint correction, and luxury detailing services for the world\'s finest vehicles.',
  keywords: 'automotive detailing, ceramic coating, paint protection film, paint correction, luxury car detailing, Beverly Hills',
  openGraph: {
    title: 'Auto Elevate | Perfection Detailed',
    description: 'Where every vehicle becomes a masterpiece.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Raleway:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise antialiased transition-colors duration-300">
        <Preloader />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
