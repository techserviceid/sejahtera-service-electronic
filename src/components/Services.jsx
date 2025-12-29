import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { FaFan, FaWashingMachine, FaFire, FaBreadSlice, FaTv, FaIron } from 'react-icons/fa';

const Services = () => {
  const { toast } = useToast();
  const navigate = useNavigate(); // <-- pakai hook react-router

  const services = [
    {
      icon: FaFan,
      title: 'Perbaikan Kipas Angin',
      description: 'Tidak bisa menyala',
      features: ['Ganti Kapasitor', 'Ganti Dinamo', 'Perbaikan Switch ON/OFF', 'Cek Kelistrikan'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaWashingMachine,
      title: 'Perbaikan Mesin Cuci',
      description: 'Kelistrikan terputus sehingga mesin mati',
      features: ['Ganti Tombol', 'Perbaikan Dinamo Pengering', 'Perbaikan Dinamo Cuci'],
      color: 'from-red-600 to-red-700'
    },
    {
      icon: FaFire,
      title: 'Perbaikan Kompor',
      description: 'Api menyala kecil',
      features: ['Cleaning', 'Ganti Burner'],
      color: 'from-red-700 to-red-800'
    },
    {
      icon: FaBreadSlice,
      title: 'Perbaikan Magic Com',
      description: 'Tidak panas atau nasi cepat basi',
      features: ['Cek Kelistrikan', 'Ganti Power Supply', 'Ganti Elemen Pemanas'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FaTv,
      title: 'Perbaikan Set Top Box',
      description: 'Mati total',
      features: ['Ganti Kapasitor', 'Cek Kelistrikan', 'Ganti Resistor'],
      color: 'from-red-600 to-red-700'
    },
    {
      icon: FaIron,
      title: 'Perbaikan Setrika',
      description: 'Tidak panas atau mati total',
      features: ['Ganti dinamo', 'Ganti Kapasitor', 'Cek Kelistrikan'],
      color: 'from-red-700 to-red-800'
    }
  ];

  const handleServiceClick = (serviceTitle) => {
    // Mengarahkan ke halaman booking dengan opsional bisa kirim query param
    navigate('/booking', { state: { service: serviceTitle } });
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
            Layanan
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Service Electronic
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Menyediakan berbagai layanan perbaikan dan maintenance untuk semua jenis perangkat elektronik Anda
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

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

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