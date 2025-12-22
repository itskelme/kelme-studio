"use client"

import Image from "next/image"
import { LanguageSelector } from "./language-selector"
import { GradientButton } from "@/components/ui/gradient-button"
import { useMessages } from 'next-intl'
import { Link } from '@/i18n/navigation'

// Usando ícones do Simple Icons
const socialIconMap: Record<string, { icon: string, url: string }> = {
  LinkedIn: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg", 
    url: "https://linkedin.com/in/kelmeofc" 
  },
  Instagram: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg", 
    url: "https://instagram.com/kelmeofc" 
  },
  X: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg", 
    url: "https://x.com/kelmeofc" 
  },
  YouTube: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg", 
    url: "https://youtube.com/@kelmeofc" 
  },
  // PT labels keep same urls
  LinkedInPT: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg", 
    url: "https://linkedin.com/in/kelmeofc" 
  },
  InstagramPT: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/instagram.svg", 
    url: "https://instagram.com/kelmeofc" 
  },
  XPT: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/x.svg", 
    url: "https://x.com/kelmeofc" 
  },
  YouTubePT: { 
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/youtube.svg", 
    url: "https://youtube.com/@kelmeofc" 
  }
}

export function Footer() {
  const messages: any = useMessages()
  const f = messages.footer
  return (
    <footer className="bg-[#0F0E0D]">
      {/* CTA Section */}
      <div className="py-32 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl md:text-7xl font-bold text-[#F7F7F7] mb-8 leading-tight">
            {f.cta.title.part1}{" "}
            <div className="bg-linear-to-r from-[#27D182]/10 to-transparent border-l-4 border-[#27D182] p-6 rounded-r-xl mb-6">{f.cta.title.highlight}</div>
            {f.cta.title.part2}
          </h2>
          <p className="text-xl text-[#F7F7F7]/60 mb-12 max-w-2xl mx-auto">{f.cta.subtitle}</p>
          <GradientButton className="px-12 py-4 tracking-wider hover:scale-105">{f.cta.button.toUpperCase()}</GradientButton>
        </div>
      </div>

      {/* Detailed Footer */}
      <div className="border-t border-[#F7F7F7]/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <Image src="/images/kelme-icon.svg" alt="Kelme Studio" width={28} height={28} />
                <LanguageSelector />
              </div>
              <p className="text-[#F7F7F7]/50 text-sm leading-relaxed">{f.brandDescription}</p>
            </div>

            {/* Explore Column */}
            <div>
              <h3 className="text-[#CB8D0F] font-semibold mb-8 uppercase tracking-wide text-sm">{f.exploreTitle}</h3>
              <ul className="space-y-5">
                {f.exploreLinks.map((name: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-[#F7F7F7]/60 hover:text-[#F7F7F7] transition-colors duration-300">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="text-[#CB8D0F] font-semibold mb-8 uppercase tracking-wide text-sm">{f.servicesTitle}</h3>
              <ul className="space-y-5">
                {f.serviceLinks.map((name: string, i: number) => (
                  <li key={i}>
                    <a href="#" className="text-[#F7F7F7]/60 hover:text-[#F7F7F7] transition-colors duration-300">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h3 className="text-[#CB8D0F] font-semibold mb-8 uppercase tracking-wide text-sm">{f.socialTitle}</h3>
              <ul className="space-y-5">
                {f.socialLinks.map((name: string, i: number) => {
                  // Substituir "Twitter" por "X" para exibição mantendo compatibilidade com as traduções
                  const displayName = name === "Twitter" ? "X" : name;
                  const mapKey = name === "Twitter" ? "X" : name;
                  const socialInfo = socialIconMap[mapKey];
                  
                  return (
                    <li key={i}>
                      <a
                        href={socialInfo?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-[#F7F7F7]/60 hover:text-[#F7F7F7] transition-colors duration-300"
                      >
                        {socialInfo?.icon && (
                          <img 
                            src={socialInfo.icon} 
                            alt={displayName} 
                            className="w-4 h-4 filter invert opacity-60" 
                            style={{ filter: "invert(1)" }}
                          />
                        )}
                        {displayName}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#F7F7F7]/5 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F7F7F7]/40 text-sm">{f.copyright}</p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-[#F7F7F7]/40 text-sm hover:text-[#F7F7F7]/80 transition-colors">
                {f.termsOfUse || "Terms of Use"}
              </Link>
              <Link href="/privacy-policy" className="text-[#F7F7F7]/40 text-sm hover:text-[#F7F7F7]/80 transition-colors">
                {f.privacyPolicy || "Privacy Policy"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
