import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Database, Share2, Cookie, UserCheck, Mail, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const sections = [
  {
    icon: Database,
    color: 'from-red-600 to-red-700',
    title: 'Informasi yang Kami Kumpulkan',
    body:
      'Kami mengumpulkan informasi yang Anda berikan secara langsung, seperti nama, nomor telepon, dan detail kerusakan perangkat saat Anda menghubungi kami melalui WhatsApp atau mengisi formulir ulasan di situs ini. Kami tidak meminta atau menyimpan data kartu pembayaran — pembayaran QRIS diproses langsung melalui aplikasi e-wallet atau mobile banking pilihan Anda, bukan melalui server kami.'
  },
  {
    icon: ShieldCheck,
    color: 'from-blue-600 to-blue-700',
    title: 'Bagaimana Kami Menggunakan Informasi Anda',
    body:
      'Informasi yang Anda berikan digunakan semata-mata untuk keperluan diagnosa awal, komunikasi terkait proses service, serta menampilkan ulasan yang Anda tulis secara sukarela di halaman ini. Kami tidak menggunakan data Anda untuk tujuan pemasaran pihak ketiga tanpa izin.'
  },
  {
    icon: Share2,
    color: 'from-green-600 to-green-700',
    title: 'Berbagi Informasi',
    body:
      'Kami tidak menjual, menyewakan, atau memperdagangkan informasi pribadi Anda kepada pihak lain. Informasi hanya dibagikan bila diwajibkan oleh hukum, atau atas persetujuan eksplisit dari Anda.'
  },
  {
    icon: Cookie,
    color: 'from-purple-600 to-purple-700',
    title: 'Cookie & Teknologi Penyimpanan',
    body:
      'Situs ini dapat menggunakan penyimpanan lokal pada perangkat Anda (seperti local storage browser) untuk menyimpan preferensi tampilan atau data ulasan sementara. Data ini tersimpan di perangkat Anda sendiri dan tidak otomatis dikirim ke server kami.'
  },
  {
    icon: UserCheck,
    color: 'from-orange-600 to-orange-700',
    title: 'Hak Anda',
    body:
      'Anda berhak meminta kami untuk menghapus ulasan atau data yang pernah Anda kirimkan, dengan menghubungi kami melalui kontak di bawah. Kami akan menindaklanjuti permintaan tersebut secepat mungkin.'
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <Helmet>
        <title>Kebijakan Privasi - Sejahtera Service Electronic</title>
        <meta
          name="description"
          content="Kebijakan privasi Sejahtera Service Electronic mengenai bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-red-100 hover:text-white text-sm font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-5">
              <ShieldCheck className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              Kebijakan Privasi
            </h1>
            <p className="text-red-100 text-sm sm:text-base max-w-xl">
              Terakhir diperbarui: 15 Agustus 2026. Privasi Anda penting bagi kami — halaman ini
              menjelaskan bagaimana data Anda diperlakukan saat menggunakan layanan kami.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 max-w-4xl -mt-8 sm:-mt-10 relative z-10 pb-20">
        <div className="space-y-5">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2} />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                      {section.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            Ada pertanyaan tentang privasi Anda?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Hubungi kami kapan saja, kami siap membantu.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:sejahteraserviceid@gmail.com"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              sejahteraserviceid@gmail.com
            </a>
            <a
              href="tel:+6285258463046"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              0852-5846-3046
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;