"use client"

import { useMessages } from "next-intl"

export function AboutPhilosophy() {
  const messages: any = useMessages()
  const philosophy = messages?.about?.philosophy

  if (!philosophy) return null

  return (
    <section className="py-0 border-b border-white/10">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 min-h-[60vh] relative overflow-hidden group">
          <img 
            src="/images/about/diego-kelme-portrait-2.jpg" 
            alt="Diego Kelme" 
            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-12 left-12">
            <h2 className="font-display text-9xl font-bold text-white opacity-10 leading-none">DIEGO</h2>
            <h2 className="font-display text-9xl font-bold text-white opacity-10 leading-none ml-12">KELME</h2>
          </div>
        </div>
        
        <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-surface">
          <h3 className="text-[#C0392B] font-bold tracking-widest uppercase mb-6 text-sm">
            {philosophy.label}
          </h3>
          <h2 
            className="font-display text-4xl md:text-5xl font-bold uppercase mb-8"
            dangerouslySetInnerHTML={{ __html: philosophy.title.replace(/\n/g, '<br />') }}
          />
          <div className="space-y-6 text-secondary font-light">
            <p>{philosophy.text1}</p>
            <p dangerouslySetInnerHTML={{ __html: philosophy.text2 }} />
            <p>{philosophy.text3}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
