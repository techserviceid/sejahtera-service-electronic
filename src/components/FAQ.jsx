import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, Shield, Wrench, CreditCard } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      category: 'Layanan',
      icon: Wrench,
      color: 'from-blue-500 to-blue-600',
      questions: [
        {
          question: 'Berapa lama waktu pengerjaan service?',
          answer: 'Waktu pengerjaan tergantung jenis kerusakan. Service ringan bisa selesai 1-2 hari, sedangkan kerusakan kompleks membutuhkan 3 hari. Kami akan menginformasikan estimasi waktu setelah pengecekan'
        },
        {
          question: 'Apakah bisa antar jemput barang?',
          answer: 'Ya, kami menyediakan layanan antar jemput atau service panggilan untuk area Purwokerto dan sekitarnya dengan biaya tambahan transportasi. Silakan hubungi kami untuk mengatur jadwal'
        },
        {
          question: 'Elektronik apa saja yang bisa diperbaiki?',
          answer: 'Kami menangani berbagai elektronik sesuai yang ada di halaman Layanan atau hubungi kami untuk elektronik lainnya'
        }
      ]
    },
    {
      category: 'Proses Service',
      icon: Clock,
      color: 'from-red-500 to-red-600',
      questions: [
        {
          question: 'Bagaimana alur proses service?',
          answer: [
                'Konsultasi atau datang langsung ke lokasi',
                'Pengecekan dan diagnosa',
                'Konfirmasi kerusakan dan estimasi biaya',
                'Lakukan perbaikan',
                'Pembayaran selesai'
                ]
        },
        {
          question: 'Apakah saya harus menunggu saat service?',
          answer: 'Tidak perlu! Anda bisa meninggalkan barang dan mengambilnya setelah selesai. Kami akan menghubungi Anda via WhatsApp ketika sudah selesai'
        },
        {
          question: 'Bagaimana jika spare part tidak tersedia?',
          answer: 'Kami akan mencarikan spare part seri persamaan. Biasanya 2-3 hari sampai. Anda akan dihubungi untuk konfirmasi harga dan estimasi waktu kedatangan spare part'
        }
      ]
    },
    {
      category: 'Garansi',
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      questions: [
        {
          question: 'Apakah ada garansi setelah service?',
          answer: 'Ya! Kami memberikan garansi 14 hari untuk setiap perbaikan yang bersifat kerusakan berat. Jika terjadi masalah yang sama dalam periode garansi, kami akan memperbaiki GRATIS'
        },
        {
          question: 'Apa yang tidak termasuk garansi?',
          answer: 'Garansi tidak berlaku untuk kerusakan akibat pemakaian tidak sesuai prosedur, kecelakaan, modifikasi sendiri, atau bencana alam. Garansi juga tidak berlaku jika segel garansi rusak'
        },
        {
          question: 'Bagaimana cara klaim garansi?',
          answer: 'Simpan struk atau nota service Anda. Jika ada masalah hubungi kami dan bawa barang beserta nota. Kami akan melakukan pengecekan dan perbaikan garansi tanpa biaya tambahan'
        }
      ]
    },
    {
      category: 'Pembayaran',
      icon: CreditCard,
      color: 'from-green-500 to-green-600',
      questions: [
        {
          question: 'Berapa biaya service?',
          answer: 'Biaya bervariasi tergantung jenis kerusakan dan spare part yang dibutuhkan. Kami akan memberikan estimasi biaya setelah pengecekan awal'
        },
        {
          question: 'Apakah ada biaya pengecekan?',
          answer: 'Pengecekan dan diagnosa GRATIS! Anda hanya membayar jika setuju melanjutkan perbaikan. Jika dibatalkan, tidak ada biaya sama sekali'
        },
        {
          question: 'Metode pembayaran apa saja yang diterima?',
          answer: 'Kami menerima pembayaran tunai, transfer bank (BRI), dan e-wallet (Dana). Pembayaran dilakukan setelah barang selesai diperbaiki dan berfungsi normal'
        }
      ]
    },
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan seputar layanan kami
          </p>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${category.color} p-6`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {category.category}
                    </h3>
                    
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="p-4">
                {category.questions.map((faq, questionIndex) => {
                  const index = `${categoryIndex}-${questionIndex}`;
                  const isActive = activeIndex === index;

                  return (
                    <motion.div
                      key={questionIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: questionIndex * 0.05 }}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full py-5 px-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg group"
                      >
                        <div className="flex items-start gap-3 text-left">
                          <HelpCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                          <span className="font-semibold text-gray-900 text-lg">
                            {faq.question}
                          </span>
                        </div>
                        <motion.div
                          animate={{ rotate: isActive ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-5 pl-16">
                              {Array.isArray(faq.answer) ? (
                                <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                                    {faq.answer.map((item, i) => (
                                    <li key={i} className="leading-relaxed">
                                        {item}
                                    </li>
                                    ))}
                                </ol>
                                ) : (
                                <p className="text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                                )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;