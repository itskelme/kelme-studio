"use client"

import React, { useState } from "react"
import Image from "next/image"
import { RiArrowRightLine } from "@remixicon/react"

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
      className={`group flex items-center py-3 px-4 rounded-none hover:bg-white/10 transition-all duration-300 ${className}`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="w-5 h-5 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
            {typeof icon === 'string' ? (
              <img 
                src={icon} 
                alt="" 
                className="w-4 h-4 object-contain opacity-50 group-hover:opacity-100 transition-opacity" 
              />
            ) : (
              icon
            )}
          </div>
        )}
        <span className="text-white/70 text-sm uppercase tracking-wider font-bold group-hover:text-white transition-colors duration-300">{label}</span>
      </div>
      <div className="overflow-hidden ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <RiArrowRightLine className="w-4 h-4 text-white" />
      </div>
    </a>
  )
}

interface MenuItem {
  label: string
  icon?: string | React.ReactNode
  href?: string
}

interface MenuSection {
  title: string
  items: MenuItem[]
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
      className="absolute top-full left-0 w-full bg-black/40 backdrop-blur-xl border-t border-white/10 py-8"
      onClick={() => onClose()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <div key={index} className={`${index === 0 ? "lg:border-r lg:border-white/10" : ""}`}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-6">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <MenuItem 
                    key={idx} 
                    label={item.label} 
                    icon={item.icon}
                    href={item.href}
                  />
                ))}
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
          className={`flex items-center space-x-1 py-2 uppercase text-sm font-bold tracking-wider
            ${isActive ? "text-white" : "text-white/70 hover:text-white"} 
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
      className={`py-2 uppercase text-sm font-bold tracking-wider
        ${isActive ? "text-white" : "text-white/70 hover:text-white"} 
        transition-colors duration-300`}
    >
      {label}
    </a>
  )
}
