import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import heroImage from '../assets/hero-9190b8d3.png';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 lg:min-h-screen lg:flex lg:items-center lg:pt-0 lg:pb-0 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800"
    >
      {/* Background blur */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-full">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white flex flex-col items-center order-2 lg:order-1 lg:col-span-3"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-2 sm:mb-6"
            >
              <span className="text-xs sm:text-sm font-semibold">
                Layanan Perbaikan
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-center">
              Sejahtera Service
              <span className="block text-red-100">
                Electronic
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-red-50 mb-4 sm:mb-5 leading-relaxed max-w-xl text-center">
              Teknisi kami siap menangani kerusakan elektronik Anda<br />
              Silakan tekan tombol di bawah
            </p>

            {/* TOMBOL BUTTON - UPDATED */}
            <div className="relative flex flex-col items-center gap-2 mb-5 sm:mb-6">
              {/* Ripple rings - Animated circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full animate-ping"></div>
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full animate-pulse absolute"></div>
              </div>
              
              {/* Main Button */}
              <Button
                onClick={() => scrollToSection('booking')}
                className="
                  rounded-full 
                  bg-white 
                  hover:bg-gray-50
                  w-14 h-14 sm:w-16 sm:h-16 lg:w-18 lg:h-18
                  p-0 
                  flex items-center justify-center
                  shadow-2xl
                  hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]
                  transition-all
                  duration-300
                  hover:scale-110
                  border-4 border-white/50
                  relative
                  z-10
                  group
                "
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="w-9 h-9 sm:w-11 sm:h-11 text-red-600 group-hover:rotate-180 transition-transform duration-500"
                >
                  <path d="M12 2v10" />
                  <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
                </svg>
              </Button>
              
              {/* Label */}
              <span className="text-white text-xs sm:text-sm font-semibold bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 z-10">
                Mulai Service
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
              <div className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-5 h-5 text-red-200" />
                <span className="text-sm">Garansi Service</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Clock className="w-5 h-5 text-red-200" />
                <span className="text-sm">Proses Cepat</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Shield className="w-5 h-5 text-red-200" />
                <span className="text-sm">Teknisi Ahli</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Wrench className="w-5 h-5 text-red-200" />
                <span className="text-sm">Spare Part Original</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE - ANIMATED ROTATION */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 mb-0 lg:mb-0 lg:col-span-2"
          >
            <div className="relative w-full max-w-full lg:max-w-lg xl:max-w-xl mx-auto">
              <motion.img
                src={heroImage} 
                alt="Teknisi service elektronik"
                className="w-full h-auto object-contain max-w-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;