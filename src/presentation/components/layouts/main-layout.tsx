"use client";

import { Navbar } from "@/presentation/components/organisms/layout/navbar";
import { Footer } from "@/presentation/components/organisms/layout/footer";
import { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * Layout principal que aplica navbar e footer em todas as páginas
 * 
 * Este layout pode ser importado em qualquer página que precise da estrutura
 * completa do site, incluindo navegação e rodapé
 */
export function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
