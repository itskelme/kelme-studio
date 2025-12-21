"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

interface MenuItemProps {
  icon?: string | React.ReactNode
  label: string
  href?: string
  className?: string
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, href = "#", className }) => {
  return (
    <a 
      href={href}
      className={`group flex items-center py-3 px-4 rounded-lg hover:bg-[#27D182]/10 transition-all duration-300 ${className}`}
    >
      <div className="menu-link__text-wrap flex items-center gap-4">
        {icon && (
          <div className="w-6 h-6 flex items-center justify-center text-[#27D182]">
            {typeof icon === 'string' ? (
              <img 
                src={icon} 
                alt="" 
                className="w-5 h-5 object-contain" 
                style={{ filter: "invert(44%) sepia(99%) saturate(505%) hue-rotate(116deg) brightness(95%) contrast(87%)" }} 
              />
            ) : (
              icon
            )}
          </div>
        )}
        <div className="text-[#F7F7F7] font-satoshi group-hover:text-[#27D182] transition-colors duration-300">{label}</div>
      </div>
      <div className="overflow-hidden ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="menu__link-arrow text-[#27D182]">
          <ChevronRight size={16} />
        </div>
      </div>
    </a>
  )
}

interface MenuSection {
  title: string
  items: string[] | { label: string, icon?: string | React.ReactNode }[]
}

interface MegaDropdownProps {
  isOpen: boolean
  sections: MenuSection[]
  onClose: () => void
}

export const MegaDropdown: React.FC<MegaDropdownProps> = ({ isOpen, sections, onClose }) => {
  if (!isOpen) return null

  return (
    <div 
      className="absolute top-full left-0 w-full bg-[#0F0E0D]/95 backdrop-blur-xl border-t border-[#27D182]/20 py-8"
      onClick={() => onClose()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index} className={`${index === 0 ? "lg:border-r lg:border-[#27D182]/20" : ""}`}>
              <h3 className="text-sm font-medium font-satoshi uppercase tracking-wider text-[#27D182] mb-4">
                {section.title}
              </h3>
              <div className="space-y-1">
                {Array.isArray(section.items) && section.items.map((item, idx) => {
                  // Handle both string items and object items
                  if (typeof item === 'string') {
                    return <MenuItem key={idx} label={item} />
                  } else {
                    return <MenuItem key={idx} label={item.label} icon={item.icon} />
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface NavItemProps {
  label: string
  sections?: MenuSection[]
  href?: string
  onClick?: () => void
  isActive?: boolean
}

export const NavItem: React.FC<NavItemProps> = ({ label, sections, href, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseEnter = () => {
    if (sections) {
      setIsHovered(true)
      if (onClick) onClick()
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  
  if (sections) {
    return (
      <div 
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button 
          className={`flex items-center space-x-1 py-2 font-satoshi uppercase text-sm font-medium
            ${isActive ? "text-[#27D182]" : "text-[#F7F7F7] hover:text-[#27D182]"} 
            transition-colors duration-300`}
          onClick={() => {
            setIsHovered(!isHovered)
            if (onClick) onClick()
          }}
        >
          <span>{label}</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isActive ? "transform rotate-180" : ""}`} 
            viewBox="0 0 16 16" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M4 6L8 10L12 6" 
              stroke="CurrentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    )
  }
  
  return (
    <a 
      href={href || "#"} 
      className={`py-2 font-satoshi uppercase text-sm font-medium
        ${isActive ? "text-[#27D182]" : "text-[#F7F7F7] hover:text-[#27D182]"} 
        transition-colors duration-300`}
    >
      {label}
    </a>
  )
}
