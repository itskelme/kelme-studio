import { EXTERNAL_LINKS } from "@/lib/constants/links";

export interface WorkDetail {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  heroImage: string;
  description: string;
  challenge: string;
  solution: string;
  services: string[];
  stack: string[];
  link?: string;
  images: {
    src: string;
    alt: string;
    colSpan?: 1 | 2; // 1 for half width, 2 for full width
  }[];
}

export const works: WorkDetail[] = [
  {
    id: "1",
    slug: "steez-drink",
    title: "Steez Drink",
    category: "E-Commerce",
    year: "2023",
    client: "Steez",
    heroImage: "/images/works/work_banner_steez-min.png",
    description: "A minimalist, high-impact e-commerce experience for a low-carb beverage brand, featuring age verification and a seamless payment flow.",
    challenge: "Steez needed a digital presence that matched their bold, urban aesthetic while navigating the regulatory requirements of selling alcoholic beverages. The challenge was to create a friction-free age verification process that didn't feel intrusive, and a shopping experience that felt as fluid as the drink itself.",
    solution: "We engineered a headless e-commerce solution using Next.js and Shopify. The design utilizes deep blacks and vibrant typography to pop the product cans. We implemented a custom age-gate that remembers the user's choice without nagging, and a one-page checkout flow that dramatically increased conversion rates compared to standard templates.",
    services: ["UI/UX Design", "Full Stack Development", "E-commerce Strategy"],
    stack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Vercel"],
    link: EXTERNAL_LINKS.STEEZ_DRINK,
    images: [
       { src: "/images/works/work_banner_steez-min.png", alt: "Steez Homepage", colSpan: 2 },
       // Placeholders for now, will start with hero reused
    ]
  },
  {
    id: "2",
    slug: "turbinou-insta",
    title: "TurbinouInsta",
    category: "Web App",
    year: "2022",
    client: "TurbinouInsta",
    heroImage: "/images/works/work_banner_turbinouinsta-min.png",
    description: "A comprehensive platform for Instagram influence marketing, featuring an integrated payment gateway and granular metrics dashboard.",
    challenge: "The client needed a robust platform to manage thousands of micro-transactions for social media engagement. Scalability and security were paramount, as was a dashboard that could visualize complex data in a simple, actionable way for users.",
    solution: "We built a secure, scalable web application with a real-time dashboard. The system handles automated order processing, payment verification, and service delivery tracking. The UI was designed to be clean and utilitarian, prioritizing data visibility and ease of account management.",
    services: ["Web App Development", "Database Architecture", "Payment Integration"],
    stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
    // No link as requested
    images: [
        { src: "/images/works/work_banner_turbinouinsta-min.png", alt: "Dashboard View", colSpan: 2 }
    ]
  },
  {
    id: "3",
    slug: "pppi",
    title: "PPPI",
    category: "Branding & Corporate",
    year: "2024",
    client: "PPPI",
    heroImage: "/images/works/work_banner_pppi-min.png",
    description: "An institutional website for a trademark registration firm, featuring an automated online consultation system.",
    challenge: "Trademark law can feel archaic and bureaucratic. PPPI wanted to position themselves as a modern, accessible partner for digital-native businesses. They needed a way to automate the initial consultation intake to free up their legal team.",
    solution: "We created a refined, professional, yet modern identity. The website features a step-by-step interactive consultation form that qualifies leads before they reach a human. The design inspires trust through typography and structure, moving away from the dusty law firm aesthetic.",
    services: ["Brand Identity", "Web Design", "WordPress Development"],
    stack: ["WordPress", "PHP", "Custom Theme", "GSAP"],
    link: EXTERNAL_LINKS.PPPI,
    images: [
        { src: "/images/works/work_banner_pppi-min.png", alt: "PPPI Homepage", colSpan: 2 }
    ]
  },
  {
    id: "4",
    slug: "flikta",
    title: "Flikta",
    category: "SaaS",
    year: "2024",
    client: "Flikta",
    heroImage: "/images/works/work_banner_flikta-min.png",
    description: "An AI-powered platform for managing influencer campaigns with real-time ROI tracking.",
    challenge: "Marketing agencies struggle to track the real ROI of influencer campaigns across multiple platforms. Flikta needed a complex data aggregation engine overlaid with a simple, marketer-friendly UI.",
    solution: "We designed a dark-mode, data-rich dashboard that aggregates metrics from API integrations. The interface uses data visualization best practices to make complex trends obvious at a glance. AI algorithms suggest optimizations in real-time.",
    services: ["SaaS Product Design", "Frontend Implementation", "Data Visualization"],
    stack: ["Next.js", "Recharts", "OpenAI API", "Tailwind CSS"],
    link: EXTERNAL_LINKS.FLIKTA,
    images: [
        { src: "/images/works/work_banner_flikta-min.png", alt: "Flikta Analytics", colSpan: 2 }
    ]
  },
  {
    id: "5",
    slug: "ponte-americas",
    title: "Ponte Américas",
    category: "Landing Page",
    year: "2025",
    client: "Ponte Américas",
    heroImage: "/images/works/work_banner_ponteamericas-min.png",
    description: "A modern, high-conversion landing page for a logistics company connecting North and South America.",
    challenge: "Logistics websites are notoriously outdated. Ponte Américas wanted to show they are different: fast, technological, and reliable. The goal was to generate leads for international shipping contracts.",
    solution: "We built a high-performance landing page with scroll-triggered animations that tell the story of a seamless logistics chain. Usage of map visualizations and clean iconography communicates their reach without needing walls of text.",
    services: ["Landing Page Design", "Copywriting", "Development"],
    stack: ["Next.js", "Framer Motion", "React Hook Form"],
    link: EXTERNAL_LINKS.PONTE_AMERICAS,
    images: [
        { src: "/images/works/work_banner_ponteamericas-min.png", alt: "Hero Section", colSpan: 2 }
    ]
  },
  {
    id: "6",
    slug: "pandami",
    title: "Pandami",
    category: "AI SaaS",
    year: "2025",
    client: "Pandami",
    heroImage: "/images/works/work_banner_pandami-min.png",
    description: "An AI-powered visagism platform recommending styling based on facial feature analysis.",
    challenge: "Beauty tech requires a unique blend of scientific precision and aesthetic appeal. The app needed to feel magical—taking a photo and getting instant, personalized, high-fashion advice.",
    solution: "We created a mobile-first web app that feels like a native application. The scan interface is intuitive, and the results page presents recommendations with high-quality imagery and clear explanations. The branding balances tech-minimalism with beauty-industry elegance.",
    services: ["Product Strategy", "UI/UX Design", "Full Stack Development"],
    stack: ["Next.js", "TensorFlow.js", "PWA", "Tailwind CSS"],
    link: EXTERNAL_LINKS.PANDAMI,
    images: [
        { src: "/images/works/work_banner_pandami-min.png", alt: "Scanning Interface", colSpan: 2 }
    ]
  }
];
