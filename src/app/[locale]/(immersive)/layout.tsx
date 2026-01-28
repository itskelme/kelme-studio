import type { ReactNode } from 'react';

/**
 * Immersive Layout - Pages without Navbar and Footer
 * Used for: work project details, full-screen experiences
 */
export default function ImmersiveLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return <>{children}</>;
}
