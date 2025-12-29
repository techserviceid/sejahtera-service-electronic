import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [comments, setComments] = useState([]);

  // Load komentar/pesan dari localStorage
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setComments(storedComments);
  }, []);

  // Fungsi untuk menambahkan balasan (penyedia jasa)
  const handleReply = (id, replyText) => {
    const updatedComments = comments.map((c) =>
      c.id === id ? { ...c, reply: replyText } : c
    );
    setComments(updatedComments);
    localStorage.setItem('contact_messages', JSON.stringify(updatedComments));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Hubungi Kami
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siap membantu menjawab pertanyaan dan memberikan solusi terbaik untuk kebutuhan service elektronik Anda
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info Kontak */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi</h3>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a
                        href="mailto:irfanramadhan.dev@gmail.com"
                        className="hover:text-red-600 transition-colors"
                      >
                        irfanramadhan.dev@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <p className="text-gray-600">
                      <a
                        href="https://wa.me/6281392813981"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                      >
                        (+62) 813-9281-3981
                      </a>
                    </p>
                  </div>
                </div>

                {/* Alamat */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jl. Anggrek Grendeng, Purwokerto Utara<br />
                      Banyumas Kode Pos 53122
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Jam Operasional</h4>
                    <p className="text-gray-600">
                      Senin - Jumat: 09:00 - 18:00<br />
                      Sabtu: 09:00 - 15:00<br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.587191218228!2d109.2474767759003!3d-7.400064692609899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fa52aace8c5%3A0x750b91ce7a953f4c!2sSejahtera%20Service%20Electronic!5e0!3m2!1sid!2sid!4v1766484152334!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sejahtera Service Location"
                />
              </div>
            </div>
          </motion.div>

          {/* Ulasan */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Pelanggan</h3>

            {/* Daftar komentar/ulasan */}
            <div className="max-h-[600px] overflow-y-auto space-y-6">
              {comments.length === 0 && (
                <p className="text-gray-600 text-center">Belum ada ulasan.</p>
              )}
              {comments.map((c) => (
                <div key={c.id} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <p className="font-semibold text-gray-900">{c.name}</p>
                  <p className="text-gray-600 text-sm mb-2">{c.email}</p>
                  {c.subject && <p className="text-gray-800 font-semibold mb-1">{c.subject}</p>}
                  <p className="text-gray-800 mb-2">{c.message}</p>
                  {c.reply && (
                    <div className="mt-2 p-3 bg-red-50 border-l-4 border-red-600 rounded-lg">
                      <p className="text-red-600 font-semibold">Balasan:</p>
                      <p className="text-gray-800">{c.reply}</p>
                    </div>
                  )}
                  {/* Form balasan untuk penyedia jasa */}
                  {!c.reply && (
                    <div className="mt-2">
                      <textarea
                        placeholder="Tulis balasan..."
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-red-500 resize-none mb-2"
                        onBlur={(e) => handleReply(c.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
