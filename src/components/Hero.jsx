import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Wrench } from 'lucide-react';
import { Button } from '../ui/button';
import heroImage from '../assets/hero-9190b8d3-9190b8d3.png';

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
      className="relative pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800"
    >
      {/* Background blur */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white flex flex-col items-center order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-xs sm:text-sm font-semibold">
                Layanan Profesional
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-center">
              Service Electronic
              <span className="block text-red-100">
                Cepat & Terpercaya
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-red-50 mb-6 sm:mb-8 leading-relaxed max-w-xl text-center">
              Teknisi berpengalaman siap menangani kerusakan elektronik Anda
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center">
              <Button
                onClick={() => scrollToSection('booking')}
                size="lg"
                className="rounded-full bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 w-auto"
              >
                Booking
              </Button>

              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                className="rounded-full bg-white text-black hover:bg-gray-100 font-semibold px-8 py-6 w-auto"
              >
                Hubungi Kami
              </Button>
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

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2 pb-4 sm:pb-0"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage} 
                alt="Teknisi service elektronik"
                className="w-full h-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;