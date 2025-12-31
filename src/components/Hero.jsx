import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Shield, Wrench } from 'lucide-react';
import { Button } from '../ui/button';

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
      className="relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800"
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
            className="text-white text-center lg:text-left flex flex-col items-center lg:items-start order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-xs sm:text-sm font-semibold">
                Layanan Service Elektronik Profesional
              </span>
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Service Electronic
              <span className="block text-red-100">
                Cepat & Terpercaya
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-lg text-red-50 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Teknisi berpengalaman siap menangani berbagai kerusakan elektronik Anda.
              Garansi service, spare part original, dan harga transparan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 w-full sm:w-auto">
              <Button
                onClick={() => scrollToSection('booking')}
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                Booking Sekarang
              </Button>

              <Button
                onClick={() => scrollToSection('contact')}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
              >
                Hubungi Kami
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md lg:max-w-none">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Garansi Service</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Proses Cepat</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Teknisi Ahli</span>
              </div>
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-red-200 flex-shrink-0" />
                <span className="text-xs sm:text-sm">Spare Part Original</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1700427296131-0cc4c4610fc6?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional technician repairing electronic devices"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent" />
            </div>

            {/* Stats Badge - Hidden on mobile to avoid layout issues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-xl p-4 sm:p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-xl sm:text-1xl font-bold text-gray-900">Tanggung Jawab</p>
                  <p className="text-xs sm:text-sm text-gray-600">Pelanggan Puas</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;