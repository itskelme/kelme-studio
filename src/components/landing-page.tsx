'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export function LandingPage() {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  // --- 1. PRELOADER ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 15) + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 60);
  }, []);

  useEffect(() => {
    if (loadingProgress === 100 && preloaderRef.current) {
      const timer = setTimeout(() => {
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsLoaded(true);
            initAnimations();
          },
        });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loadingProgress]);

  // --- 2. NEURAL NETWORK CANVAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let particles: Particle[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const resize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 40 : 80;
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animateCanvas = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 - dist / 1000})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animateCanvas);
    };

    window.addEventListener('resize', resize);
    resize();
    animateCanvas();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 3. TEXT SCRAMBLE EFFECT ---
  const scrambleText = (element: HTMLElement) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
    let iteration = 0;
    const originalText = element.dataset.value;
    if (!originalText) return;

    // Use a custom property to store interval ID if needed, but for now local variable
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      element.innerText = originalText
        .split("")
        .map((letter, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join("");

      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  // --- 4. GSAP & ANIMATIONS INIT ---
  const initAnimations = () => {
    // Nav Drop
    gsap.to("#nav", { opacity: 1, y: 0, duration: 1, ease: "power3.out" });

    // Hero Fade In
    gsap.to(".hero-fade", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Trigger Scramble on Hero Text
    document.querySelectorAll<HTMLElement>('.scramble-text').forEach(el => scrambleText(el));

    // Reveal Paragraphs
    gsap.utils.toArray<HTMLElement>('.reveal-text').forEach(text => {
      gsap.from(text, {
        scrollTrigger: { trigger: text, start: "top 85%" },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Counter Animation
    gsap.utils.toArray<HTMLElement>('.counter').forEach(counter => {
      gsap.to(counter, {
        scrollTrigger: { trigger: counter, start: "top 85%" },
        innerText: counter.getAttribute('data-target'),
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out"
      });
    });
  };

  // --- 5. MAGNETIC BUTTONS & CURSOR ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;
      const coordDisplay = document.getElementById('mouse-coords');

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }

      if (coordDisplay) {
        coordDisplay.innerText = `MOUSE_COORDS: [${posX},${posY}]`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const magneticBtns = document.querySelectorAll<HTMLElement>('.magnetic-btn');
    magneticBtns.forEach(btn => {
      const mouseMoveBtn = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        if (cursorOutlineRef.current) {
          gsap.to(cursorOutlineRef.current, { scale: 1.8, duration: 0.3 });
          cursorOutlineRef.current.style.borderColor = '#fff';
        }
      };

      const mouseLeaveBtn = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        if (cursorOutlineRef.current) {
          gsap.to(cursorOutlineRef.current, { scale: 1, duration: 0.3 });
          cursorOutlineRef.current.style.borderColor = 'rgba(255,255,255,0.3)';
        }
      };

      btn.addEventListener('mousemove', mouseMoveBtn);
      btn.addEventListener('mouseleave', mouseLeaveBtn);

      // Cleanup for specific elements if needed, but mainly global cleanup below
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isLoaded]); // Run after load to ensure elements exist

  return (
    <>
      {/* Preloader */}
      <div id="preloader" ref={preloaderRef}>
        <div className="font-mono text-xs text-gray-500 mb-4 glitch-effect">INITIALIZING KELME PROTOCOL...</div>
        <div className="w-64 h-[1px] bg-gray-900">
          <div className="loader-line" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className="font-mono text-xs text-gray-700 mt-2">{loadingProgress}%</div>
      </div>

      {/* Cursor Elements */}
      <div className="cursor-dot hidden md:block" ref={cursorDotRef}></div>
      <div className="cursor-outline hidden md:block" ref={cursorOutlineRef}></div>

      {/* Background Neural Network */}
      <canvas id="neuralCanvas" ref={canvasRef} className="fixed top-0 left-0 -z-10"></canvas>

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 glass-nav px-6 py-5 flex justify-between items-center opacity-0 transform -translate-y-4" id="nav">
        <Link href="#" className="group flex items-center gap-2 text-xl font-bold tracking-tighter uppercase text-white hover:text-gray-300 transition-colors">
          <span className="w-3 h-3 bg-white rounded-full group-hover:bg-harpia-gold transition-colors duration-300"></span>
          Kelme<span className="text-gray-600 group-hover:text-white transition-colors duration-300">.Studio</span>
        </Link>
        <div className="hidden md:flex space-x-10 text-xs font-bold tracking-[0.2em] uppercase">
          <Link href="#manifesto" className="hover:text-harpia-gold transition-colors magnetic-btn inline-block">Manifesto</Link>
          <Link href="#capabilities" className="hover:text-harpia-gold transition-colors magnetic-btn inline-block">Arsenal</Link>
          <Link href="#work" className="hover:text-harpia-gold transition-colors magnetic-btn inline-block">Conquests</Link>
          <Link href="#contact" className="px-6 py-2 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 magnetic-btn inline-block">Initiate</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20">
        <div className="z-10 text-center max-w-5xl">
          <div className="flex justify-center gap-4 mb-6 opacity-0 hero-fade">
            <span className="mono-tag border border-gray-800 px-2 py-1 rounded bg-black/50 backdrop-blur-sm">SYSTEM: ONLINE</span>
            <span className="mono-tag border border-gray-800 px-2 py-1 rounded bg-black/50 backdrop-blur-sm text-harpia-gold">ALTITUDE IS EARNED</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-none text-white mb-8 mix-blend-exclusion">
            <span className="block scramble-text" data-value="MARKET">MARKET</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-gray-100 to-gray-600 scramble-text" data-value="DOMINANCE">DOMINANCE</span>
          </h1>
          
          <p className="hero-fade text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed opacity-0 font-mono">
            Most agencies rent you an audience. We help you <span className="text-white font-semibold">own</span> one. Kelme Studio builds the proprietary tech and elite strategy that turns your customers into your sales force.
          </p>

          <div className="hero-fade mt-12 opacity-0">
            <Link href="#contact" className="magnetic-btn group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-transparent border border-white hover:bg-white hover:text-black focus:outline-none ring-offset-2 focus:ring-2">
              <span className="mr-2 uppercase tracking-widest text-xs">Execute Strategy</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 flex-col space-y-2 font-mono text-[10px] text-gray-600 hidden md:flex">
          <span id="scroll-velocity">SCROLL_VELOCITY: 0</span>
          <span id="mouse-coords">MOUSE_COORDS: [0,0]</span>
        </div>
      </header>

      {/* Manifesto Section */}
      <section id="manifesto" className="py-32 px-6 md:px-12 max-w-8xl mx-auto border-t border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="mono-tag text-harpia-gold block mb-4">01 // THE CODE</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
              Legacy over <br/>Trends. <br/>Revenue over <span className="italic text-gray-500">Likes</span>.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-8 text-lg md:text-xl text-gray-400 font-light leading-relaxed border-l border-gray-900 pl-8 md:pl-16">
            <p className="reveal-text">
              Common brands worry about the transaction of the day. <strong className="text-white">Iconic brands</strong> write a legacy. They weave themselves into the daily fabric of their customers' lives.
            </p>
            <p className="reveal-text">
              We don't just &quot;do marketing.&quot; We build digital ecosystems. Through elite agency services and our suite of automated <strong className="text-white">Micro-SaaS</strong> products, we grant you the unfair advantage.
            </p>
            <p className="reveal-text italic text-white/80">
              &quot;If you want to compete on price, go elsewhere. If you want to compete on value, welcome home.&quot;
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12">
              <div className="group">
                <div className="text-3xl font-bold text-white counter" data-target="98">0</div>
                <div className="mono-tag mt-2 group-hover:text-harpia-gold transition-colors">Lighthouse Score</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-white counter" data-target="340">0</div>
                <div className="mono-tag mt-2 group-hover:text-harpia-gold transition-colors">% ROI Increase</div>
              </div>
              <div className="group">
                <div className="text-3xl font-bold text-white counter" data-target="12">0</div>
                <div className="mono-tag mt-2 group-hover:text-harpia-gold transition-colors">Micro-SaaS Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities (Bento Grid) */}
      <section id="capabilities" className="py-32 px-6 bg-harpia-dark relative border-t border-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="mono-tag text-harpia-gold">02 // THE ARSENAL</span>
              <h2 className="text-4xl font-bold mt-2 text-white">Capabilities</h2>
            </div>
            <p className="hidden md:block text-gray-500 font-mono text-xs">/ SYSTEM_MODULES_ACTIVE</p>
          </div>

          {/* Expanded Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
            
            {/* Card 1: Proprietary Infrastructure */}
            <div className="md:col-span-2 md:row-span-2 bg-harpia-black border border-gray-800 relative group overflow-hidden hover:border-gray-500 transition-all duration-500 rounded-sm">
              <div className="absolute inset-0 grid-bg opacity-20"></div>
              
              {/* Fake Terminal Header */}
              <div className="bg-gray-900/80 border-b border-gray-800 p-3 flex gap-2 items-center">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                <div className="ml-auto font-mono text-[10px] text-gray-500">bash — 80x24</div>
              </div>

              <div className="p-8 relative z-10 h-full flex flex-col">
                <h3 className="text-3xl font-bold mb-4 text-white">Proprietary Infrastructure</h3>
                <p className="text-gray-400 mb-6 max-w-md text-sm">
                  We don't just build websites; we deploy <strong className="text-white">Micro-SaaS frameworks</strong>. Scalable, automated, and designed to engage customers while you sleep.
                </p>
                
                {/* Code Block Visual */}
                <div className="mt-auto bg-black/50 border border-gray-800 p-4 rounded font-mono text-xs text-green-400 leading-relaxed overflow-hidden">
                  <p className="opacity-50 mb-2"># Initializing Stack...</p>
                  <div className="flex flex-col gap-1">
                    <span>&gt; npm install @kelme/core</span>
                    <span>&gt; deploying to edge... <span className="text-white">DONE (0.2s)</span></span>
                    <span>&gt; optimizing assets... <span className="text-white">100%</span></span>
                    <span className="animate-pulse">&gt; _</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Strategic Dominance */}
            <div className="md:col-span-1 md:row-span-1 bg-harpia-black border border-gray-800 relative group overflow-hidden hover:border-harpia-gold/30 transition-all duration-500 rounded-sm flex flex-col justify-between p-6">
              <div className="absolute top-4 right-4">
                <div className="w-20 h-20 border border-gray-800 rounded-full flex items-center justify-center relative">
                  <div className="w-12 h-12 border border-gray-800 rounded-full"></div>
                  <div className="w-1/2 h-[1px] bg-harpia-gold absolute top-1/2 left-1/2 origin-left animate-[spin_4s_linear_infinite] opacity-50"></div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Strategy</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Targeting market gaps with military precision.</p>
              </div>
              <div className="mt-4 font-mono text-[10px] text-harpia-gold">STATUS: HUNTING</div>
            </div>

            {/* Card 3: Visual Authority */}
            <div className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-gray-900 to-black border border-gray-800 relative group overflow-hidden hover:border-white/20 transition-all duration-500 rounded-sm p-6">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-white mb-2">Design</h3>
                <p className="text-xs text-gray-400 leading-relaxed">Visuals that signal alpha status and command trust.</p>
                <div className="flex gap-2 mt-4">
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-600"></div>
                  <div className="w-6 h-6 rounded-full bg-harpia-gray border border-gray-600"></div>
                  <div className="w-6 h-6 rounded-full bg-harpia-gold border border-gray-600"></div>
                </div>
              </div>
            </div>

            {/* Card 4: Performance */}
            <div className="md:col-span-1 md:row-span-1 bg-harpia-black border border-gray-800 relative group overflow-hidden hover:border-green-500/30 transition-all duration-500 rounded-sm p-6 flex flex-col justify-center items-center text-center">
              <div className="text-5xl font-mono font-bold text-white mb-2">99</div>
              <div className="text-[10px] font-mono text-green-400 uppercase tracking-widest mb-1">Lighthouse Score</div>
              <p className="text-[10px] text-gray-500">Performance Optimized</p>
            </div>

             {/* Card 5: Automated Workflows */}
             <div className="md:col-span-3 lg:col-span-3 bg-harpia-black border border-gray-800 relative group overflow-hidden hover:border-gray-600 transition-all duration-500 rounded-sm p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="absolute inset-0 grid-bg opacity-10"></div>
              <div className="flex-1 relative z-10">
                <h3 className="text-xl font-bold text-white mb-2">Micro-SaaS Factory</h3>
                <p className="text-sm text-gray-400 max-w-lg">
                  We automate the repetitive. From lead generation bots to custom CRM integrations, we build the tools that let you scale without adding headcount.
                </p>
              </div>
              
              {/* Visual Node Flow */}
              <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-10 h-10 border border-gray-700 bg-gray-900 flex items-center justify-center rounded text-xs font-mono">IN</div>
                <div className="w-8 h-[1px] bg-gray-700"></div>
                <div className="w-10 h-10 border border-harpia-gold bg-gray-900 flex items-center justify-center rounded text-xs font-mono text-harpia-gold">PROC</div>
                <div className="w-8 h-[1px] bg-gray-700"></div>
                <div className="w-10 h-10 border border-gray-700 bg-gray-900 flex items-center justify-center rounded text-xs font-mono">OUT</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-32">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <span className="mono-tag text-harpia-gold">03 // PROOF OF WORK</span>
          <h2 className="text-6xl font-bold mt-2 text-white">Conquests</h2>
        </div>

        {/* Project 1 */}
        <div className="group relative w-full h-[70vh] overflow-hidden border-y border-gray-800">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
            <div className="mono-tag mb-2 text-blue-400">FINTECH / SAAS</div>
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-6">Nova Pay</h3>
            <p className="text-gray-300 text-lg mb-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              Redesigned the user acquisition flow for a Series B fintech. Reduced CAC by 35% and secured dominant market share in LATAM region.
            </p>
            <Link href="#" className="inline-block border-b border-white pb-1 text-white hover:text-gray-300 magnetic-btn">View Case Study</Link>
          </div>
        </div>

        {/* Project 2 */}
        <div className="group relative w-full h-[70vh] overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2670&auto=format&fit=crop')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 p-8 md:p-12 w-full md:w-2/3 text-right">
            <div className="mono-tag mb-2 text-purple-400">ECOMMERCE / BRANDING</div>
            <h3 className="text-5xl md:text-7xl font-bold text-white mb-6">Aura Skin</h3>
            <p className="text-gray-300 text-lg mb-8 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              A Shopify Plus headless implementation. 99/100 Speed score. Outranked major competitors in Q1.
            </p>
            <Link href="#" className="inline-block border-b border-white pb-1 text-white hover:text-gray-300 magnetic-btn">View Case Study</Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-12 bg-white text-black overflow-hidden border-y border-white">
        <div className="marquee whitespace-nowrap flex gap-20 animate-marquee font-mono text-sm font-bold uppercase tracking-widest">
          <span>Legacy</span><span>Authority</span><span>Micro-SaaS</span><span>Proprietary Tech</span><span>Dominance</span>
          <span>Legacy</span><span>Authority</span><span>Micro-SaaS</span><span>Proprietary Tech</span><span>Dominance</span>
          <span>Legacy</span><span>Authority</span><span>Micro-SaaS</span><span>Proprietary Tech</span><span>Dominance</span>
        </div>
      </div>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 max-w-5xl mx-auto text-center">
        <span className="mono-tag text-harpia-gold animate-pulse">04 // INITIATE PROTOCOL</span>
        <h2 className="text-5xl md:text-7xl font-bold mt-4 mb-12 text-white">Seize the Market?</h2>
        
        <form className="max-w-xl mx-auto text-left space-y-8 font-mono bg-gray-900/30 backdrop-blur-md p-8 md:p-12 border border-gray-800 relative overflow-hidden rounded-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-harpia-gold to-transparent"></div>
          
          <div className="group">
            <label className="block text-xs text-gray-500 mb-2">&gt; ENTER_EMAIL_ADDRESS</label>
            <input type="email" className="w-full bg-black/50 border-b border-gray-700 p-3 text-white focus:outline-none focus:border-white transition-colors font-sans placeholder-gray-700" placeholder="ceo@company.com" />
          </div>
          
          <div className="group">
            <label className="block text-xs text-gray-500 mb-2">&gt; SELECT_OBJECTIVE</label>
            <select className="w-full bg-black/50 border-b border-gray-700 p-3 text-white focus:outline-none focus:border-white transition-colors font-sans cursor-pointer">
              <option>Total Market Dominance</option>
              <option>Deploy Micro-SaaS</option>
              <option>Aggressive Rebrand</option>
              <option>Strategic Consulting</option>
            </select>
          </div>

          <button type="button" className="w-full bg-white text-black py-4 font-bold uppercase hover:bg-gray-200 transition-colors relative overflow-hidden group magnetic-btn">
            <span className="relative z-10">INITIATE DOMINANCE</span>
            <div className="absolute inset-0 bg-harpia-gold transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></div>
          </button>
        </form>
      </section>

      <footer className="py-8 text-center text-gray-700 text-xs font-mono border-t border-gray-900">
        <p>KELME.STUDIO © 2025. ALL RIGHTS RESERVED. // FLORIANÓPOLIS, SC</p>
      </footer>
    </>
  );
}
