import React from "react";

// Tailwind utility classes for navbar styling
export const navbarStyles = {
  // Navbar container styles based on scroll state
  container: (isScrolled: boolean) => `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-[#0F0E0D]/95 backdrop-blur-xl border-b border-[#CB8D0F]/20' 
      : 'bg-transparent border-b border-transparent'}
  `,
  
  // Inner content wrapper
  innerWrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  
  // Main flex container
  flexContainer: "flex items-center justify-between h-20",
  
  // Logo container
  logoContainer: "flex items-center space-x-3",
  logoImage: "h-8 w-8",
  logoText: "font-bold text-lg text-[#F7F7F7] font-satoshi uppercase tracking-wider",
  logoAccent: "font-light text-white",
  
  // Desktop navigation items
  desktopNav: "hidden lg:flex items-center space-x-8",
  
  // Right side elements
  rightSide: "flex items-center space-x-4",
  
  // Mobile menu button
  mobileMenuBtn: "lg:hidden text-[#F7F7F7] hover:text-[#27D182] transition-colors",
  mobileMenuIcon: "h-6 w-6",
  
  // Mobile menu overlay
  mobileOverlay: "fixed inset-0 z-40 lg:hidden",
  mobileBackdrop: "fixed inset-0 bg-black bg-opacity-70",
  
  // Mobile menu content
  mobileContent: "p-6 space-y-6 flex-grow overflow-y-auto",
  mobileSectionTitle: "text-lg text-[#CB8D0F] font-bold uppercase font-satoshi tracking-wider",
  mobileSection: "space-y-4",
  mobileCategoryTitle: "text-sm text-[#F7F7F7]/70 uppercase font-medium mb-2",
  mobileSectionList: "ml-2 space-y-3",
  mobileLink: "text-[#F7F7F7] hover:text-[#CB8D0F] font-satoshi text-base transition-colors duration-200",
  mobileLinkFlex: "flex items-center text-[#F7F7F7] hover:text-[#CB8D0F] font-satoshi text-base py-2 transition-colors duration-200",
  mobileDivider: "border-t border-[#CB8D0F]/20 pt-6",
  mobileNavLink: "block text-[#F7F7F7] hover:text-[#CB8D0F] font-satoshi text-xl font-medium py-2 transition-colors duration-200"
};
