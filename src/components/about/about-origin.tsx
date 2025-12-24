"use client"

import { RiCompass3Fill, RiFlashlightFill, RiScales3Fill } from "@remixicon/react"
import { useMessages } from "next-intl"

export function AboutOrigin() {
  const messages: any = useMessages()
  const origin = messages?.about?.origin

  if (!origin) return null

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Abstract Map Graphic Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" strokeWidth="0.5" />
         </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <h2 className="font-display text-4xl font-bold uppercase mb-8">
              {origin.title.split('&')[0]} <span className="text-[#C0392B]">&</span> <br />
              {origin.title.split('&')[1]}
            </h2>
            <div className="w-12 h-1 bg-[#C0392B] mb-8" />
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <RiCompass3Fill className="w-6 h-6 text-[#C0392B] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">
                    {origin.fromAcre.title}
                  </h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    {origin.fromAcre.description}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RiFlashlightFill className="w-6 h-6 text-[#C0392B] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">
                    {origin.ieee.title}
                  </h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    {origin.ieee.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <RiScales3Fill className="w-6 h-6 text-[#C0392B] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-2">
                    {origin.pillars.title}
                  </h4>
                  <p className="text-secondary text-sm leading-relaxed">
                    {origin.pillars.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
