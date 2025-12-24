import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiAddLine, RiSubtractLine } from 'remixicon';

const faqs = [
  {
    question: "Why a monthly subscription instead of project-based?",
    answer: "Project-based work often punishes efficiency. Our subscription model aligns our incentives with yours: delivering high-quality work fast. It eliminates scope creep negotiations and allows us to iterate continuously on your product."
  },
  {
    question: "How fast is the turnaround time?",
    answer: "On average, requests are delivered in 48-72 hours. Complex tasks like full landing pages or complex logic might take longer, but we break them down into deliverable milestones so you see progress every few days."
  },
  {
    question: "What if I don't like the design?",
    answer: "We iterate until you are obsessed. Period. Our subscription includes unlimited revisions. We don't stop until the work is world-class."
  },
  {
    question: "What tech stack do you use?",
    answer: "We specialize in the modern web. For marketing sites, we use Webflow or Framer for speed and editability. For apps and complex platforms, we build with React, Next.js, and TypeScript tailored to your needs."
  },
  {
    question: "Is there a refund policy?",
    answer: "Due to the high-quality nature of the work, we do not issue refunds once work has commenced. However, you can pause or cancel your subscription at any time to avoid future charges."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-32 bg-background border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-4/12">
             <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-4">Common Questions</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold uppercase leading-none mb-6">
              Details & <br />
              <span className="text-white">Logistics.</span>
            </h3>
            <p className="text-secondary text-sm">
              Can't find what you're looking for? <br />
              <a href="mailto:hello@kelme.studio" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">Email us directly.</a>
            </p>
          </div>

          <div className="w-full md:w-8/12">
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-white/10">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full py-8 flex items-center justify-between text-left group hover:bg-white/5 transition-colors px-4 -mx-4"
                  >
                    <span className="text-xl md:text-2xl font-display uppercase font-bold text-white group-hover:text-gray-300 transition-colors">
                      {faq.question}
                    </span>
                    <span className="text-white/50 group-hover:text-white transition-colors">
                      {openIndex === index ? (
                        <RiSubtractLine className="w-6 h-6" />
                      ) : (
                        <RiAddLine className="w-6 h-6" />
                      )}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-8 text-secondary text-lg font-light leading-relaxed max-w-2xl">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;