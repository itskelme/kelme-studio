"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Link } from "@/i18n/navigation";

// Generate realistic-looking traffic data with strong growth in last 3 months
const generateTrafficData = (seed: number = 42) => {
  const data = [];
  
  // Simple seeded random for consistent data
  let rand = seed;
  const seededRandom = () => {
    rand = (rand * 9301 + 49297) % 233280;
    return rand / 233280;
  };
  
  for (let i = 89; i >= 0; i--) {
    // Base traffic with growth curve
    const dayIndex = 89 - i;
    let baseTraffic = 50 + (dayIndex * 2); // Linear growth
    
    // Add exponential growth in last 30 days
    if (dayIndex > 60) {
      baseTraffic += Math.pow((dayIndex - 60) * 1.5, 1.8);
    }
    
    // Add some realistic variance using seeded random
    const variance = (seededRandom() - 0.5) * 40;
    const clicks = Math.max(10, Math.round(baseTraffic + variance));
    
    data.push({
      clicks,
      impressions: clicks * Math.floor(seededRandom() * 5 + 8)
    });
  }
  
  return data;
};

// Animated counter component
function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);
  
  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
}

// Typewriter for niche/city
function CyclingText({ words, className }: { words: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 300);
    }, 3000);
    
    return () => clearInterval(cycleInterval);
  }, [words.length]);
  
  return (
    <span 
      className={`inline-block transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
    >
      {words[currentIndex]}
    </span>
  );
}

export function SeoResults() {
  const t = useTranslations("seoResults");
  const graphRef = useRef(null);
  const isInView = useInView(graphRef, { once: true, margin: "-100px" });
  
  // Use useMemo with seeded random for consistent data between server/client
  const trafficData = useMemo(() => generateTrafficData(42), []);
  
  // Calculate totals - these are now deterministic
  const totalClicks = useMemo(() => trafficData.reduce((sum, d) => sum + d.clicks, 0), [trafficData]);
  const totalImpressions = useMemo(() => trafficData.reduce((sum, d) => sum + d.impressions, 0), [trafficData]);
  const avgCTR = "3.2"; // Fixed realistic CTR (max 3.5%)
  const avgPosition = "3.2"; // Fixed value to avoid hydration mismatch
  
  // Generate SVG path for the chart
  const chartWidth = 800;
  const chartHeight = 200;
  const maxClicks = Math.max(...trafficData.map(d => d.clicks));
  
  const getY = (clicks: number) => chartHeight - (clicks / maxClicks) * (chartHeight - 20) - 10;
  const getX = (index: number) => (index / (trafficData.length - 1)) * chartWidth;
  
  const linePath = trafficData
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.clicks)}`)
    .join(' ');
  
  const areaPath = `${linePath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;
  
  const niches = [
    t("niches.lawyers"),
    t("niches.dentists"),
    t("niches.realtors"),
    t("niches.restaurants"),
    t("niches.clinics")
  ];
  
  const cities = [
    t("cities.orlando"),
    t("cities.miami"),
    t("cities.tampa"),
    t("cities.jacksonville"),
    t("cities.austin")
  ];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 block">
            {t("sectionLabel")}
          </span>
          <h2 className="font-oswald text-5xl md:text-7xl font-bold uppercase tracking-tight text-white mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle.part1")}{" "}
            <span className="text-green-400 font-semibold">
              <CyclingText words={niches} />
            </span>{" "}
            {t("subtitle.part2")}{" "}
            <span className="text-blue-400 font-semibold">
              <CyclingText words={cities} />
            </span>
          </p>
        </motion.div>
        
        {/* Google Search Console Style Card */}
        <motion.div
          ref={graphRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Card Container */}
          <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {/* Card Header - GSC Style */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">{t("cardTitle")}</h3>
                  <p className="text-white/40 text-xs">{t("cardSubtitle")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span>{t("lastMonths")}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* MAIN CHART: Total Clicks */}
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{t("metrics.clicks")}</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl md:text-5xl font-bold text-blue-400">
                      <AnimatedNumber value={totalClicks} />
                    </p>
                    <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      +847%
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Main Clicks Chart */}
              <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full h-48 md:h-64"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Blue gradient for clicks */}
                  <linearGradient id="clicksAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                  </linearGradient>
                  
                  {/* Glow filter for the line */}
                  <filter id="blueGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={chartHeight * (i / 4)}
                    x2={chartWidth}
                    y2={chartHeight * (i / 4)}
                    stroke="rgba(255,255,255,0.05)"
                    strokeDasharray="4 4"
                  />
                ))}
                
                {/* Area under curve - Blue for clicks */}
                <motion.path
                  d={areaPath}
                  fill="url(#clicksAreaGradient)"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                
                {/* Main line - Blue for clicks */}
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#blueGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
                
                {/* End point dot */}
                <motion.circle
                  cx={chartWidth}
                  cy={getY(trafficData[trafficData.length - 1].clicks)}
                  r="6"
                  fill="#3b82f6"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 2 }}
                />
                
                {/* Pulsing ring on end point */}
                <motion.circle
                  cx={chartWidth}
                  cy={getY(trafficData[trafficData.length - 1].clicks)}
                  r="6"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={isInView ? { 
                    scale: [1, 2, 2],
                    opacity: [0.8, 0.4, 0]
                  } : {}}
                  transition={{ 
                    duration: 2,
                    delay: 2.2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-2">
                <span className="text-xs text-white/30">{t("months.month1")}</span>
                <span className="text-xs text-white/30">{t("months.month2")}</span>
                <span className="text-xs text-white/30">{t("months.month3")}</span>
              </div>
            </div>
            
            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-3 gap-4 px-6 py-6 border-t border-white/10">
              {/* Impressions */}
              <div className="relative">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{t("metrics.impressions")}</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl md:text-2xl font-bold text-purple-400">
                    <AnimatedNumber value={totalImpressions} />
                  </p>
                  <svg viewBox="0 0 40 16" className="w-10 h-4 md:w-12 md:h-5">
                    <defs>
                      <linearGradient id="impressionsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 14 L6 12 L12 13 L18 10 L24 7 L30 5 L40 2" 
                      fill="none" 
                      stroke="#a855f7" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M0 14 L6 12 L12 13 L18 10 L24 7 L30 5 L40 2 L40 16 L0 16 Z" 
                      fill="url(#impressionsGradient)"
                    />
                  </svg>
                </div>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +623%
                </p>
              </div>
              
              {/* CTR */}
              <div className="relative">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{t("metrics.ctr")}</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl md:text-2xl font-bold text-green-400">{avgCTR}%</p>
                  <svg viewBox="0 0 40 16" className="w-10 h-4 md:w-12 md:h-5">
                    <defs>
                      <linearGradient id="ctrGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 12 L8 10 L16 11 L24 8 L32 6 L40 4" 
                      fill="none" 
                      stroke="#22c55e" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M0 12 L8 10 L16 11 L24 8 L32 6 L40 4 L40 16 L0 16 Z" 
                      fill="url(#ctrGradient)"
                    />
                  </svg>
                </div>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  +2.1%
                </p>
              </div>
              
              {/* Position */}
              <div className="relative">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{t("metrics.position")}</p>
                <div className="flex items-end gap-2">
                  <p className="text-xl md:text-2xl font-bold text-orange-400">{avgPosition}</p>
                  <svg viewBox="0 0 40 16" className="w-10 h-4 md:w-12 md:h-5">
                    <defs>
                      <linearGradient id="positionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M0 3 L8 4 L16 3 L24 6 L32 10 L40 13" 
                      fill="none" 
                      stroke="#f97316" 
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path 
                      d="M0 3 L8 4 L16 3 L24 6 L32 10 L40 13 L40 16 L0 16 Z" 
                      fill="url(#positionGradient)"
                    />
                  </svg>
                </div>
                <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  -12.4
                </p>
              </div>
            </div>
            
            {/* Growth Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 2.5 }}
              className="absolute top-16 right-6 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-blue-400 font-bold text-sm">Total Clicks</span>
            </motion.div>
          </div>
          
          {/* CTA Below Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-white/60 mb-6">{t("ctaText")}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-gray-200 transition-all group"
            >
              {t("ctaButton")}
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
