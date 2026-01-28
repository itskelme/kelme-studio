import type { ReactNode } from 'react';
import { Navbar } from '@/presentation/components/organisms/page-layout/navbar';
import { Footer } from '@/presentation/components/organisms/page-layout/footer';

/**
 * Main Layout - Pages with Navbar and Footer
 * Used for: home, about, contact, work list, blog, careers, etc.
 */
export default function MainLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
