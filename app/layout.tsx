import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from '@/components/AppContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ParticleGrid from '@/components/ParticleGrid';
import DoomEasterEgg from '@/components/DoomEasterEgg';
import SecurityLock from '@/components/SecurityLock';
import Breadcrumb from '@/components/Breadcrumb';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Aditya Bhatia',
    template: '%s | Aditya Bhatia',
  },
  description: '17. kanpur. cryptography researcher at IIT Kanpur, builder, co-founder of PaXus and ByteForge.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Aditya Bhatia',
    description: '17. kanpur. cryptography researcher at IIT Kanpur, builder, co-founder of PaXus and ByteForge.',
    url: 'https://adityabhatia.dev',
    siteName: 'Aditya Bhatia',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Aditya Bhatia',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased min-h-screen relative font-sans selection:bg-[var(--accent)] selection:text-[var(--bg)] overflow-x-hidden">
        <AppProvider>
          <SecurityLock />
          <ParticleGrid />
          <DoomEasterEgg />
          <Nav />
          <main className="relative z-10 max-w-[680px] mx-auto px-6 pt-24 pb-16">
            <Breadcrumb />
            {children}
          </main>
          <Footer />
          <Analytics />
        </AppProvider>
      </body>
    </html>
  );
}

