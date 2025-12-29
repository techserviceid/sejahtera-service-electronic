import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SS</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Sejahtera Service</h2>
              <p className="text-xs text-red-600">Service Electronic Terpercaya</p>
            </div>
          </motion.div>

          <nav className="hidden lg:flex items-center gap-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Beranda
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Layanan
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Galeri
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Booking
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Kontak
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-red-600" />
              <span>(+62) 813-9281-3981</span>
            </div>
            <Button onClick={() => scrollToSection('booking')} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
              Booking Sekarang
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-200 py-4"
          >
            <nav className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium">
                BERANDA
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium">
                LAYANAN
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium">
                GALERI
              </button>
              <button onClick={() => scrollToSection('booking')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium">
                BOOKING
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium">
                KONTAK
              </button>
              <div className="flex items-center gap-2 text-sm text-gray-600 pt-2">
                <Phone className="w-4 h-4 text-red-600" />
                <span>(+62) 813-9281-3981</span>
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;