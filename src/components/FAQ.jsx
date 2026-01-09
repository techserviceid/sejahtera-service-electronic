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
                'Booking atau datang langsung',
                'Pengecekan dan diagnosa',
                'Konfirmasi kerusakan dan estimasi biaya',
                'Lakukan perbaikan',
                'Pembayaran dan pengambilan'
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
                    <p className="text-white/80 text-sm">
                      {category.questions.length} pertanyaan
                    </p>
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-2">
            Masih Bingung?
          </h3>
          <p className="text-red-100 mb-6">
            Hubungi kami langsung untuk informasi lebih lanjut
          </p>
          <a
            href="https://wa.me/6281392813981"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-red-600 font-semibold px-8 py-4 rounded-xl hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Chat via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;