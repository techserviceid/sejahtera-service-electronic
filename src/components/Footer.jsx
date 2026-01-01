import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* TOP */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-center lg:text-left">
          
          {/* BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center lg:items-start"
          >
            {/* LOGO */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4 w-full">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">SS</span>
              </div>
              <div>
                <span className="text-xl font-bold block">Sejahtera Service</span>
                <p className="text-xs text-red-400">Service Electronic Terpercaya</p>
              </div>
            </div>
          </motion.div>

          {/* CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center lg:items-start"
          >
            <span className="text-lg font-bold mb-4">Hubungi Kami</span>

            <ul className="space-y-6 w-full">
              {/* EMAIL */}
              <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 text-center sm:text-left">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-600">
                      <a
                        href="mailto:irfanramadhan.dev@gmail.com"
                        className="hover:text-red-600 transition-colors"
                      >
                        irfanramadhan.dev@gmail.com
                      </a>
                </p>
              </li>

              {/* TELEPON */}
              <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 text-center sm:text-left">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-gray-600">
                      <a
                        href="https://wa.me/6281392813981"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        0813-9281-3981
                      </a>
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2026 Sejahtera Service Electronic.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
