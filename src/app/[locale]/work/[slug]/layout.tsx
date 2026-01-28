import type { ReactNode } from 'react';

/**
 * Layout for work project detail pages
 * Provides a full-screen immersive experience by hiding navbar/footer
 * Uses CSS to hide parent layout elements - clean separation of concerns
 */
export default function WorkProjectLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <>
      <style>{`
        .navbar-main,
        #footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
