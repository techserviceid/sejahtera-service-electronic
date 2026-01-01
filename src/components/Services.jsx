import React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../ui/use-toast';
import { Fan, WashingMachine, Flame, CookingPot, Tv, Zap } from 'lucide-react';

const Services = () => {
  const { toast } = useToast();

  const services = [
    {
      icon: Fan,
      title: 'Perbaikan Kipas Angin',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: WashingMachine,
      title: 'Perbaikan Mesin Cuci',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Flame,
      title: 'Perbaikan Kompor',
      color: 'from-red-700 to-red-800'
    },
    {
      icon: CookingPot,
      title: 'Perbaikan Magic Com',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Tv,
      title: 'Perbaikan Set Top Box',
      color: 'from-red-600 to-red-700'
    },
    {
      icon: Zap,
      title: 'Perbaikan Setrika',
      color: 'from-red-700 to-red-800'
    }
  ];

  const handleServiceClick = (serviceTitle) => {
    // Scroll smooth ke section booking
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            LAYANAN
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Service Electronic
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Melayani perbaikan dan maintenance pada perangkat elektronik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                {service.title}
              </h3>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleServiceClick(service.title)}
                  className="text-red-600 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all"
                >
                  <span>Booking Layanan</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;