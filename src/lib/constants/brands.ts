export const BRAND_LOGOS = [
  {
    name: "Flikta",
    path: "/images/brands/flikta-logomark.png",
    alt: "Flikta logo"
  },
  {
    name: "Google",
    path: "/images/brands/google-logomark.png",
    alt: "Google logo"
  },
  {
    name: "Gusto",
    path: "/images/brands/gusto-logomark.png",
    alt: "Gusto logo"
  },
  {
    name: "iFood",
    path: "/images/brands/ifood-logomark.png",
    alt: "iFood logo"
  },
  {
    name: "IHOP",
    path: "/images/brands/ihop-logomark.png",
    alt: "IHOP logo"
  },
  {
    name: "Impulsionegram",
    path: "/images/brands/impulsionegram-logomark.png",
    alt: "Impulsionegram logo"
  },
  {
    name: "Majority",
    path: "/images/brands/majority-logomark.png",
    alt: "Majority logo"
  },
  {
    name: "Ponte Americas",
    path: "/images/brands/ponte-americas-logomark.png",
    alt: "Ponte Americas logo"
  },
  {
    name: "RD Station",
    path: "/images/brands/rd-station-logomark.png",
    alt: "RD Station logo"
  },
  {
    name: "Steez",
    path: "/images/brands/steez-logomark.png",
    alt: "Steez logo"
  }
] as const

export type BrandLogo = typeof BRAND_LOGOS[number]
