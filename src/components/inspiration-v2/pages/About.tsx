import React from 'react';
import { motion } from 'framer-motion';
import { RiArrowRightLine, RiFlashlightFill, RiLinksFill, RiCompass3Fill, RiScales3Fill } from 'remixicon';
import { Link } from 'react-router-dom';

const ventures = [
  {
    name: "Zarpy",
    role: "Partner & Tech Lead",
    description: "Revolutionizing logistics and mobility. We don't just move things; we engineer the flow of commerce.",
    color: "#E67E22"
  },
  {
    name: "PPPI",
    role: "Strategic Partner",
    description: "High-level industrial solutions. Complex engineering meets digital efficiency.",
    color: "#2980B9"
  },
  {
    name: "Pandami",
    role: "Co-Founder",
    description: "A digital ecosystem built for scale. From MVP to market dominance.",
    color: "#27AE60"
  }
];

const About: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      
      {/* SECTION 1: THE HOOK (Jon Benson Style - Aggressive Value Prop) */}
      <section className="relative pt-40 pb-20 md:pt-60 md:pb-40 px-6 border-b border-white/10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C0392B] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-display text-6xl md:text-8xl font-bold uppercase leading-[0.9] mb-12">
              I don't sell <br />
              <span className="text-secondary line-through decoration-[#C0392B] decoration-4">pretty websites.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="md:w-1/2">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-200">
                  People don't buy from me because I know code. They buy from me because I engineer <span className="text-white font-bold border-b border-[#C0392B]">reality-bending sales funnels</span>.
                </p>
              </div>
              <div className="md:w-1/2 text-secondary text-sm md:text-base leading-relaxed space-y-6">
                <p>
                  If you are looking for a "yes man" to build a template, close this tab.
                </p>
                <p>
                  My clients partner with me because they know one thing: <strong>I double revenue.</strong>
                </p>
                <p>
                  I deliver digital products so dopaminergic, with copy so visceral and design so aggressive, that it doesn't just attract leads—it fascinates them. It converts violently. From complex nutraceuticals to high-load SaaS applications, I build engines for scalability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE PHILOSOPHY - IMAGE & TEXT SPLIT */}
      <section className="py-0 border-b border-white/10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 min-h-[60vh] relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
              alt="Diego Kelme" 
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-12 left-12">
              <h2 className="font-display text-9xl font-bold text-white opacity-10 leading-none">DIEGO</h2>
              <h2 className="font-display text-9xl font-bold text-white opacity-10 leading-none ml-12">KELME</h2>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 md:p-24 flex flex-col justify-center bg-surface">
            <h3 className="text-[#C0392B] font-bold tracking-widest uppercase mb-6 text-sm">The Philosophy</h3>
            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase mb-8">
              Code is Cheap. <br />
              <span className="text-secondary">Psychology is Expensive.</span>
            </h2>
            <div className="space-y-6 text-secondary font-light">
              <p>
                Most agencies focus on the tool. I focus on the mind.
              </p>
              <p>
                Every pixel I place and every line of code I write serves a singular purpose: <strong>Scaling the Offer.</strong>
              </p>
              <p>
                I operate at the intersection of IEEE-standard engineering precision and raw human emotion. Whether it's a high-ticket funnel or a mobile app, the goal is to trigger a biological response in the user. We don't want them to just browse; we want them to feel a compulsion to act.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SKIN IN THE GAME (Ventures) */}
      <section className="py-32 border-b border-white/10 relative">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 flex items-center gap-2">
              <RiLinksFill className="text-[#C0392B]" /> Skin in the Game
            </h2>
            <h3 className="font-display text-5xl md:text-6xl font-bold uppercase leading-none max-w-3xl">
              I don't just build for clients. <br />
              <span className="text-secondary">I build businesses.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ventures.map((venture, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group border-t border-white/20 pt-8 hover:border-[#C0392B] transition-colors duration-500"
              >
                <div className="flex justify-between items-baseline mb-6">
                  <h4 className="text-3xl font-display font-bold uppercase">{venture.name}</h4>
                  <span className="text-[10px] uppercase tracking-widest border border-white/20 px-2 py-1 rounded-none text-secondary">
                    {venture.role}
                  </span>
                </div>
                <p className="text-secondary text-sm leading-relaxed mb-8">
                  {venture.description}
                </p>
                <div 
                  className="w-full h-1 bg-white/10 group-hover:bg-white transition-colors duration-500"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                >
                  <div className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: venture.color }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: THE ORIGIN (Personal Details) */}
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
                Origin <span className="text-[#C0392B]">&</span> <br />
                Foundations
              </h2>
              <div className="w-12 h-1 bg-[#C0392B] mb-8" />
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <RiCompass3Fill className="w-6 h-6 text-[#C0392B] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-2">From Acre to Floripa</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      Born in Acre, forged in resilience. I moved to Florianópolis, Brazil's Silicon Island, to immerse myself in the heart of technology. This journey from the deep Amazon to a tech capital defines my approach: grounded, resilient, yet relentlessly futuristic.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <RiFlashlightFill className="w-6 h-6 text-[#C0392B] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-2">IEEE Standards</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      I support and adhere to IEEE (Institute of Electrical and Electronics Engineers) standards. My work isn't just "creative"; it's engineered. It's built on protocols that ensure stability, security, and scalability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <RiScales3Fill className="w-6 h-6 text-[#C0392B] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-2">The Unseen Pillars</h4>
                    <p className="text-secondary text-sm leading-relaxed">
                      My leadership is quietly guided by the principles of the Order of DeMolay—loyalty, comradeship, and fidelity. Spiritually, I find balance in Spiritism, which keeps my ego in check and my empathy for the end-user high. I build for people, not just for metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="py-40 bg-surface border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-8xl font-bold uppercase leading-none mb-12"
          >
            Ready to <span className="text-[#C0392B]">Dominate?</span>
          </motion.h2>
          
          <Link 
            to="/contact"
            className="inline-flex items-center gap-4 bg-white text-black px-12 py-6 text-lg uppercase tracking-widest font-bold hover:bg-[#C0392B] hover:text-white transition-all duration-300"
          >
            Start The Project <RiArrowRightLine />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default About;