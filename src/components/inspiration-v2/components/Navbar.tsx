import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenu3Line, RiCloseLine } from 'remixicon';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed Services anchor link, replaced/added About route
  const links = [
    { name: 'About', href: '/about', type: 'route' },
    { name: 'Work', href: '/work', type: 'route' },
    { name: 'Services', href: '/#services', type: 'anchor' },
    { name: 'Careers', href: '/careers', type: 'route' },
    { name: 'Insights', href: '/blog', type: 'route' },
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 mix-blend-difference text-white ${scrolled ? 'py-4' : 'py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link to="/" className="text-2xl font-display font-bold tracking-tighter uppercase z-50">
          Kelme<span className="opacity-50">.Studio</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map((link) => (
            link.type === 'route' ? (
               <Link 
                key={link.name} 
                to={link.href}
                className={`text-sm uppercase tracking-widest hover:text-gray-400 transition-colors ${location.pathname === link.href ? 'text-[#C0392B]' : ''}`}
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
          <Link 
            to="/contact"
            className="border border-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-none"
          >
            Start Project
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40 flex flex-col justify-center items-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link.type === 'route' ? (
                    <Link
                      to={link.href}
                      className="text-4xl font-display uppercase font-bold tracking-tighter hover:text-gray-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-4xl font-display uppercase font-bold tracking-tighter hover:text-gray-400 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  )}
                </motion.div>
              ))}
              <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.4 }}
              >
                <Link to="/contact" className="text-4xl font-display uppercase font-bold tracking-tighter text-[#C0392B]" onClick={() => setIsOpen(false)}>
                  Start Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;