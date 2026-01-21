import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fan, WashingMachine, Flame, CookingPot, Tv, Zap, Bug, Gauge, Droplets, Volume2, X, ChevronRight } from 'lucide-react';

const Services = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const services = [
    {
      icon: Fan,
      title: 'Perbaikan Kipas Angin',
      description: 'Service kipas angin dengan segala merk',
      color: 'from-red-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1665298455913-dd43714f5ad1?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      icon: WashingMachine,
      title: 'Perbaikan Mesin Cuci',
      description: 'Service mesin cuci 1 tabung dan 2 tabung dengan spare part original',
      color: 'from-red-600 to-red-700',
      image: 'https://hisense.id/wp-content/uploads/2024/06/WSRB9013UB-productimg-2.jpg'
    },
    {
      icon: Flame,
      title: 'Perbaikan Kompor',
      description: 'Service kompor gas dan kompor tanam dengan hasil maksimal',
      color: 'from-red-700 to-red-800',
      image: 'https://images.tokopedia.net/img/cache/700/aphluv/1997/1/1/f418ae47b72548e28b0a2c2424cd54e5~.jpeg'
    },
    {
      icon: CookingPot,
      title: 'Perbaikan Magic Com',
      description: 'Service rice cooker atau magic com segala merk dengan garansi',
      color: 'from-red-500 to-red-600',
      image: 'https://arti-assets.sgp1.cdn.digitaloceanspaces.com/mamasukakitchenstore/products/462e1637-0f84-45ab-84d1-a7b90f130096.jpg'
    },
    {
      icon: Tv,
      title: 'Perbaikan Set Top Box',
      description: 'Service set top box TV digital dan receiver dengan teknisi ahli',
      color: 'from-red-600 to-red-700',
      image: 'https://assets.dianisa.com/media/2023/09/3-Set-Top-Box-Polytron-PDV-610T2.webp'
    },
    {
      icon: Zap,
      title: 'Perbaikan Setrika',
      description: 'Service setrika listrik dan uap dengan hasil seperti baru',
      color: 'from-red-700 to-red-800',
      image: 'https://images.philips.com/is/image/philipsconsumer/vrs_9a6ed449b747c990359a4b628a355a7112ec3b80?$pnglarge$&wid=1250'
    },
    {
      icon: Bug,
      title: 'Perbaikan Raket Nyamuk',
      description: 'Service raket nyamuk elektrik dengan penggantian komponen berkualitas',
      color: 'from-red-500 to-red-600',
      image: 'https://hitantinyamuk.id/mediafl/files/3/asset_product/raket/gif%20raket%20produk.gif'
    },
    {
      icon: Gauge,
      title: 'Perbaikan Regulator Gas',
      description: 'Service regulator gas dengan standar keamanan tinggi',
      color: 'from-red-600 to-red-700',
      image: 'https://huddersfieldgastrade.co.uk/wp-content/uploads/2019/02/81DOHVtMHXL._SL1500_.jpg'
    },
    {
      icon: Droplets,
      title: 'Perbaikan Pompa Air',
      description: 'Service pompa air rumah tangga dengan teknisi profesional',
      color: 'from-red-700 to-red-800',
      image: 'https://s3.ap-southeast-3.amazonaws.com/hartono-mh1/images/detailed/354/PBH235C.jpg'
    },
    {
      icon: Volume2,
      title: 'Perbaikan Speaker',
      description: 'Service speaker aktif dan sound system dengan kualitas audio terbaik',
      color: 'from-red-500 to-red-600',
      image: 'https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3BlYWtlcnxlbnwwfHwwfHx8MA%3D%3D'
    }
  ];

  const handleServiceClick = (e, serviceTitle) => {
    e.preventDefault();
    e.stopPropagation();
    
    const consultSection = document.getElementById('consult');
    
    if (consultSection) {
      // Scroll ke consult section
      consultSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      console.log('Scrolling to consult section with service:', serviceTitle);
    } else {
      console.error('Consult section not found!');
    }
  };

  return (
    <>
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              LAYANAN
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Service Electronic Berkualitas
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Menangani perbaikan dan maintenance dengan profesional dan berpengalaman
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ 
                  delay: index * 0.15,
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Section */}
                <div 
                  className="relative h-64 overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Icon Badge */}
                  <motion.div 
                    className={`absolute top-4 right-4 w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg`}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.15 + 0.3,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    animate={{
                      rotate: hoveredIndex === index ? 360 : 0,
                      scale: hoveredIndex === index ? 1.1 : 1,
                    }}
                  >
                    <service.icon className="w-7 h-7 text-red-600" />
                  </motion.div>
                </div>

                {/* Content Section */}
                <motion.div 
                  className="p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.15 + 0.4,
                    duration: 0.5
                  }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {service.description}
                  </p>

                  <button
                    onClick={(e) => handleServiceClick(e, service.title)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Buruan Service</span>
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 border-2 border-red-600 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal - Full Screen */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center cursor-pointer p-4"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              src={services[selectedImage].image}
              alt={services[selectedImage].title}
              className="max-w-full max-h-full object-contain cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Services;