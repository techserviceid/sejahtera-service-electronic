import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-16 pb-8 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-full">
        {/* TOP */}
        <div className="flex flex-col items-center mb-12 max-w-md mx-auto">
          
          {/* BRAND */}
          <div className="flex flex-col items-center mb-8">
            {/* LOGO */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div 
                  className="absolute w-0 h-0 top-0"
                  style={{
                    borderLeft: '24px solid transparent',
                    borderRight: '24px solid transparent',
                    borderTop: '40px solid #dc2626',
                    filter: 'drop-shadow(0 2px 4px rgba(220, 38, 38, 0.2))'
                  }}
                />
                <span className="relative z-10 text-white font-bold text-lg tracking-wide" style={{ marginTop: '-18px' }}>
                  SS
                </span>
              </div>
              <div>
                <span className="text-2xl font-bold block">Sejahtera Service</span>
                <p className="text-sm text-center text-red-400">Solusi Kualitas Service</p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col items-center">

            <ul className="space-y-6">
              {/* EMAIL */}
              <li className="flex flex-col items-center gap-2 text-center">
                <Mail className="w-6 h-6 text-red-400 flex-shrink-0" />
                <a
                  href="mailto:irfanramadhan.dev@gmail.com"
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  irfanramadhan.dev@gmail.com
                </a>
              </li>

              {/* TELEPON */}
              <li className="flex flex-col items-center gap-2 text-center">
                <Phone className="w-6 h-6 text-red-400 flex-shrink-0" />
                <a
                  href="https://wa.me/6281392813981"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-green-400 transition-colors"
                >
                  0813-9281-3981
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center gap-4 text-center">
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