import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    device: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      toast({
        title: '⚠️ Lengkapi Form',
        description: 'Mohon lengkapi semua field yang wajib diisi',
        variant: 'destructive'
      });
      return;
    }

    const message = `Halo, ada booking baru dari pelanggan:\n
    Nama: ${formData.name}\n
    Nomor WhatsApp: ${formData.phone}\n
    Email: ${formData.email || '-'}\n
    Layanan: ${formData.service}\n
    Device: ${formData.device || '-'}\n
    Tanggal: ${formData.date}\n
    Waktu: ${formData.time}\n
    Deskripsi: ${formData.message || '-'}`;

  // Nomor WhatsApp kamu (format internasional tanpa +)
  const waNumber = '6281392813981'; 

  // Encode URL agar aman
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

  // Buka WhatsApp agar kamu menerima pesan
  window.open(waUrl, '_blank');

    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      device: '',
      date: '',
      time: '',
      message: ''
    });
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            BOOKING
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Booking Sekarang
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Jadwalkan service electronic Anda dengan mudah
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Kenapa Booking Online?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Hemat Waktu</h4>
                    <p className="text-gray-600 text-sm">Tidak perlu antre, langsung datang sesuai jadwal</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Jadwal Fleksibel</h4>
                    <p className="text-gray-600 text-sm">Pilih waktu yang paling sesuai dengan jadwal Anda</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Konfirmasi Cepat</h4>
                    <p className="text-gray-600 text-sm">Langsung mendapat konfirmasi melalui WhatsApp</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Teknisi Siap</h4>
                    <p className="text-gray-600 text-sm">Teknisi kami sudah siap menangani device Anda</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Jam Operasional</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Senin - Jumat</span>
                  <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sabtu</span>
                  <span className="font-semibold text-gray-900">09:00 - 15:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Minggu</span>
                  <span className="font-semibold text-red-600">Tutup</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nomor WhatsApp <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Jenis Layanan <span className="text-red-600">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Pilih layanan</option>
                  <option value="smartphone">Perbaikan Kipas Angin</option>
                  <option value="laptop">Perbaikan Mesin Cuci</option>
                  <option value="tablet">Perbaikan Kompor</option>
                  <option value="monitor">Perbaikan Magic Com</option>
                  <option value="komputer">Perbaikan Set Top Box</option>
                  <option value="recovery">Perbaikan Setrika</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tipe Device
                </label>
                <input
                  type="text"
                  name="device"
                  value={formData.device}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Waktu <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi Kerusakan
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-6 text-lg"
              >
                Booking Sekarang
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Booking;