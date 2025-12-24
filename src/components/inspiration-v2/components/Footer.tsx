import React from 'react';
import { motion } from 'framer-motion';
import { 
  RiArrowRightUpLine, 
  RiInstagramLine, 
  RiLinkedinFill, 
  RiTwitterXLine, 
  RiWhatsappLine,
  RiMailLine
} from 'remixicon';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer id="footer" className="bg-black pt-32 pb-8 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-32"
        >
          {/* Main CTA Section */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.h2 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.9] mb-8">
                Have an idea? <br />
                <span className="text-secondary">Let's build it.</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-secondary max-w-sm mb-12">
                We help ambitious brands define their digital future. 
                Open for new partnerships for Q4 2024.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-xs">
               <a 
                href="mailto:hello@kelme.studio" 
                className="group flex items-center justify-between border border-white/20 px-6 py-4 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest font-bold">Email Us</span>
                <RiMailLine className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-between border border-white/20 px-6 py-4 bg-white/5 hover:bg-[#25D366] hover:border-[#25D366] hover:text-black transition-all duration-300"
              >
                <span className="text-sm uppercase tracking-widest font-bold">WhatsApp</span>
                <RiWhatsappLine className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Sitemap</h4>
              <ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
                <li><Link to="/" className="hover:text-white transition-colors block w-max">Home</Link></li>
                <li><a href="/#work" className="hover:text-white transition-colors block w-max">Work</a></li>
                <li><a href="/#services" className="hover:text-white transition-colors block w-max">Services</a></li>
                <li><a href="/#pricing" className="hover:text-white transition-colors block w-max">Pricing</a></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Resources</h4>
              <ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
                <li><Link to="/blog" className="hover:text-white transition-colors block w-max flex items-center gap-2">Insights <span className="text-[10px] bg-white text-black px-1 leading-none py-0.5">NEW</span></Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors block w-max">Careers</Link></li>
                <li><a href="/#faq" className="hover:text-white transition-colors block w-max">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors block w-max">Brand Assets</a></li>
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white mb-6">Socials</h4>
              <ul className="space-y-4 text-secondary text-sm uppercase tracking-wider">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 w-max"><RiInstagramLine className="w-4 h-4" /> Instagram</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 w-max"><RiTwitterXLine className="w-4 h-4" /> Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 w-max"><RiLinkedinFill className="w-4 h-4" /> LinkedIn</a></li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Massive Brand Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/10 pt-20 mb-8"
        >
           <h1 className="text-[12vw] leading-[0.8] font-display font-bold uppercase text-center tracking-tighter mix-blend-difference select-none pointer-events-none text-white opacity-20 lg:opacity-100">
             Kelme Studio
           </h1>
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] md:text-xs uppercase tracking-widest text-secondary">
          <div className="flex gap-6 mb-4 md:mb-0">
             <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex gap-1">
            <span>&copy; {new Date().getFullYear()} Kelme Studio.</span>
            <span className="hidden md:inline"> - </span>
            <span className="text-white">Designed in the Dark.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;