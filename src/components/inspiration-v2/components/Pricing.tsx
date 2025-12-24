import React from 'react';
import { motion } from 'framer-motion';
import { RiCheckLine, RiArrowRightLine } from 'remixicon';

const plans = [
  {
    name: "Design",
    price: "$2,995",
    period: "/mo",
    description: "Perfect for startups needing ongoing design support without the overhead.",
    features: [
      "One request at a time",
      "Average 48h delivery",
      "Unlimited revisions",
      "UI/UX Design",
      "Graphic Design",
      "Pause or cancel anytime"
    ]
  },
  {
    name: "Design + Dev",
    price: "$4,995",
    period: "/mo",
    description: "Complete digital product acceleration. Design and Webflow development included.",
    features: [
      "One request at a time",
      "Average 48-72h delivery",
      "Unlimited revisions",
      "UI/UX + Branding",
      "Webflow Development",
      "Priority support",
      "Pause or cancel anytime"
    ],
    isPopular: true
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-32 border-b border-white/10 bg-black">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">Plans & Pricing</h2>
          <h3 className="font-display text-5xl md:text-7xl font-bold uppercase leading-none mb-6">
            Membership<span className="text-secondary">.</span>
          </h3>
          <p className="text-secondary text-lg">
            No contracts. No hidden fees. Pause or cancel anytime. 
            Just pure, high-velocity output.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative p-8 md:p-12 border ${
                plan.isPopular ? 'border-white bg-surface' : 'border-white/10 bg-black'
              } flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-white text-black text-xs font-bold uppercase px-3 py-1 tracking-widest rounded-none">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h4 className="text-2xl font-display uppercase font-bold mb-2">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl md:text-5xl font-bold">{plan.price}</span>
                  <span className="text-secondary">{plan.period}</span>
                </div>
                <p className="text-secondary text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="flex-grow mb-10">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <span className="flex-shrink-0 w-5 h-5 bg-white text-black flex items-center justify-center rounded-none">
                        <RiCheckLine className="w-3 h-3" />
                      </span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#footer"
                className={`w-full py-4 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all rounded-none ${
                  plan.isPopular 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'border border-white/20 hover:bg-white hover:text-black'
                }`}
              >
                Get Started <RiArrowRightLine className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
            <p className="text-secondary text-sm">
                Need a custom scope? <a href="mailto:hello@kelme.studio" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">Book a call</a>
            </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;