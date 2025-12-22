"use client"

import { Star, Quote, Trophy, Users } from "lucide-react"
import Image from "next/image"
import { useMessages } from 'next-intl'

function BrandLogo({ logo, name, color }: { logo: string; name: string; color: string }) {
  return (
    <div className="flex items-center justify-center w-[120px] h-[60px] group">
      <img
        src={logo || "/images/placeholder.svg"}
        alt={name}
        className="w-16 h-16 opacity-60 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
        style={{
          filter: "grayscale(1) brightness(0.8)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = `grayscale(0) brightness(1)`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "grayscale(1) brightness(0.8)"
        }}
      />
    </div>
  )
}

export function SocialProof() {
  const messages: any = useMessages()
  const tp = messages.socialProof.testimonials
  const ap = messages.socialProof.awards
  const pp = messages.socialProof.partners
  const iconMap: Record<string, React.ReactElement> = {
    trophy: <Trophy className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
  }
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#1A1918] to-[#0F0E0D]">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#27D182]/20 to-[#27D182]/10 backdrop-blur-sm border border-[#27D182]/20 mb-6">
              <Quote className="w-4 h-4 text-[#CB8D0F]" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-[#F7F7F7] mb-6 uppercase tracking-tight">
              {tp.titleLine1.toUpperCase()}
              <span className="block bg-gradient-to-r from-[#CB8D0F] to-[#E6A635] bg-clip-text text-transparent">
                {tp.titleLine2.toUpperCase()}
              </span>
            </h2>
            <p className="text-xl text-[#F7F7F7]/70 max-w-2xl mx-auto">{tp.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tp.list.map((testimonial: any, index: number) => (
              <div
                key={index}
                className="bg-[#F7F7F7]/5 backdrop-blur-sm border border-[#F7F7F7]/10 rounded-2xl p-8 hover:border-[#CB8D0F]/30 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#CB8D0F] text-[#CB8D0F]" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-[#F7F7F7]/90 mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/images/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[#F7F7F7] uppercase tracking-wide text-sm">{testimonial.name.toUpperCase()}</div>
                    <div className="text-[#F7F7F7]/70 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#F7F7F7] mb-4 uppercase tracking-tight">
              {ap.titleLine1.toUpperCase()}
              <span className="block bg-gradient-to-r from-[#CB8D0F] to-[#E6A635] bg-clip-text text-transparent">
                {ap.titleLine2.toUpperCase()}
              </span>
            </h3>
            <p className="text-lg text-[#F7F7F7]/70">{ap.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ap.list.map((award: any, index: number) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-[#CB8D0F]/10 to-[#CB8D0F]/5 backdrop-blur-sm border border-[#CB8D0F]/20 rounded-2xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#CB8D0F]/20 rounded-full mb-6">
                  <div className="text-[#CB8D0F]">{iconMap[award.iconKey]}</div>
                </div>
                <h4 className="text-xl font-bold text-[#F7F7F7] mb-2 uppercase tracking-wide">{award.title.toUpperCase()}</h4>
                <div className="text-[#CB8D0F] font-semibold mb-2">{award.year}</div>
                <div className="text-[#F7F7F7]/70 text-sm">{award.organization}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div>
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#F7F7F7] mb-4 uppercase tracking-tight">
              {pp.titleLine1.toUpperCase()}
              <span className="block bg-gradient-to-r from-[#CB8D0F] to-[#E6A635] bg-clip-text text-transparent">
                {pp.titleLine2.toUpperCase()}
              </span>
            </h3>
            <p className="text-lg text-[#F7F7F7]/70">{pp.subtitle}</p>
          </div>

          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-infinite">
              {/* First set of partners */}
              {pp.list.concat(pp.list).map((partner: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 px-8 py-4 mx-4 bg-[#F7F7F7]/5 backdrop-blur-sm border border-[#F7F7F7]/10 rounded-xl hover:border-[#CB8D0F]/30 transition-all duration-300 group whitespace-nowrap min-w-fit"
                >
                  <img
                    src={partner.logo || "/images/placeholder.svg"}
                    alt={partner.name}
                    className="w-8 h-8 opacity-60 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
                    style={{
                      filter: "grayscale(1) brightness(0.8)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.filter = `grayscale(0) brightness(1)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = "grayscale(1) brightness(0.8)"
                    }}
                  />
                  <span className="text-[#F7F7F7] font-semibold uppercase tracking-wide text-sm group-hover:text-[#CB8D0F] transition-colors duration-300">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
