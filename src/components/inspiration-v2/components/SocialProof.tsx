import React from 'react';
import { motion } from 'framer-motion';
import { RiDoubleQuotesL, RiStarFill } from 'remixicon';

const testimonials = [
  {
    id: 1,
    quote: "Kelme Studio didn't just build a website; they architected a digital flagship. Our conversion rates doubled within the first month of launch. The authority we now command in our market is undeniable.",
    author: "Alex Rivera",
    role: "CMO, Nebula Fintech",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    metric: "+200% Conversions"
  },
  {
    id: 2,
    quote: "I've worked with top agencies in NYC and London. Diego's team operates at a different frequency. Faster, sharper, and obsessively detailed. They understand that design is a revenue function.",
    author: "Sarah Jenkins",
    role: "Founder, Velvet Fashion",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    metric: "3x ROAS"
  },
  {
    id: 3,
    quote: "The ROI was immediate. They simplified our complex ecosystem into a seamless user journey. A masterclass in execution that positioned us exactly where we needed to be: at the top.",
    author: "Marcus Chen",
    role: "Director, Quantum SaaS",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    metric: "Series B Secured"
  }
];

const SocialProof: React.FC = () => {
  return (
    <section className="py-32 bg-background border-b border-white/10 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C0392B] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C0392B] mb-4">
              Social Proof
            </h2>
            <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none text-white">
              Client <br />
              Obsession<span className="text-[#C0392B]">.</span>
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block max-w-xs text-right"
          >
            <p className="text-secondary text-sm leading-relaxed">
              We don't just collect logos. We collect success stories. 
              Here is what happens when you work with the best.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 p-8 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Metric Badge */}
              <div className="absolute top-0 right-0 bg-[#C0392B] text-white text-[10px] font-bold uppercase px-3 py-1 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.metric}
              </div>

              <div>
                <div className="flex gap-1 mb-6 text-[#C0392B]">
                  {[...Array(5)].map((_, i) => (
                    <RiStarFill key={i} className="w-4 h-4" />
                  ))}
                </div>
                
                <RiDoubleQuotesL className="text-white/20 w-8 h-8 mb-4" />
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                <div className="w-12 h-12 overflow-hidden bg-white/10">
                  <img 
                    src={item.image} 
                    alt={item.author} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase text-white tracking-wide">
                    {item.author}
                  </h4>
                  <p className="text-xs text-secondary uppercase tracking-wider">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;