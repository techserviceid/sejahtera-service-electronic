import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = [
    {
      title: 'Perbaikan Kipas Angin',
      description: 'Ganti kapasitor dan dinamo',
      category: 'Kipas Angin'
    },
    {
      title: 'Perbaikan Mesin Cuci',
      description: 'Kelistrikan terputus sehingga mesin mati',
      category: 'Mesin Cuci'
    },
    {
      title: 'Perbaikan Kompor',
      description: 'Api menyala kecil',
      category: 'Kompor'
    },
    {
      title: 'Perbaikan Magic Com',
      description: 'Ganti Element Heater Pemanas',
      category: 'Magic Com'
    },
    {
      title: 'Perbaikan Set Top Box',
      description: 'Mati total',
      category: 'Televisi'
    },
    {
      title: 'Perbaikan Setrika',
      description: 'Setrika tidak panas',
      category: 'Setrika'
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            GALERI
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Menangani berbagai jenis perbaikan perangkat elektronik
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(index)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
            >
              <img alt={`${item.title} - professional electronics repair work`} className="w-full h-80 object-cover" src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full cursor-default"
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>
                <img alt={`${galleryItems[selectedImage].title} - enlarged view`} className="w-full h-auto rounded-2xl" src="https://images.unsplash.com/photo-1629741120780-10776e56a91b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <div className="bg-white rounded-b-2xl p-6">
                  <span className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {galleryItems[selectedImage].category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {galleryItems[selectedImage].title}
                  </h3>
                  <p className="text-gray-600">
                    {galleryItems[selectedImage].description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;