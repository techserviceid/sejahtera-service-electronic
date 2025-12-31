import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, X, Trash2, Lock, Unlock } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutPassword, setLogoutPassword] = useState('');
  const [replyTexts, setReplyTexts] = useState({});

  // Password admin (ganti sesuai keinginan)
  const ADMIN_PASSWORD = 'smartelectronic';

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    setComments(storedComments);
    
    // Cek apakah admin sudah login
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setIsAdmin(adminLoggedIn);
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.message) {
      toast({
        title: '⚠️ Form Tidak Lengkap',
        description: 'Mohon isi nama dan ulasan',
        variant: 'destructive'
      });
      return;
    }

    const comment = {
      id: Date.now(),
      name: newComment.name,
      email: newComment.email,
      message: newComment.message,
      date: new Date().toLocaleDateString('id-ID'),
      reply: null
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('contact_messages', JSON.stringify(updatedComments));

    setNewComment({ name: '', email: '', message: '' });
  };

  const handleReply = (id) => {
    const replyText = replyTexts[id];
    
    if (!replyText || !replyText.trim()) {
      return;
    }

    const updatedComments = comments.map((c) =>
      c.id === id ? { ...c, reply: replyText.trim() } : c
    );
    setComments(updatedComments);
    localStorage.setItem('contact_messages', JSON.stringify(updatedComments));

    // Clear reply text after sending
    setReplyTexts(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);
    localStorage.setItem('contact_messages', JSON.stringify(updatedComments));
  };

  const handleCancelComment = () => {
    setNewComment({ name: '', email: '', message: '' });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('admin_logged_in', 'true');
      setShowAdminLogin(false);
      setAdminPassword('');
    }
  };

  const handleAdminLogout = (e) => {
    e.preventDefault();
    
    if (logoutPassword === ADMIN_PASSWORD) {
      setIsAdmin(false);
      localStorage.removeItem('admin_logged_in');
      setShowLogoutConfirm(false);
      setLogoutPassword('');
      setShowAdminLogin(false);
    }
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
            KONTAK
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Ada Pertanyaan?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Siap menjawab dan memberikan solusi terbaik untuk kebutuhan service elektronik Anda
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href="mailto:irfanramadhan.dev@gmail.com" className="hover:text-red-600 transition-colors">
                        irfanramadhan.dev@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">WhatsApp</h4>
                    <p className="text-gray-600">
                      <a href="https://wa.me/6281392813981" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">
                        0813-9281-3981
                      </a>
                    </p>
                  </div>
                </div>

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

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative w-full h-[280px] sm:h-[320px] lg:h-[360px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.587191218228!2d109.2474767759003!3d-7.400064692609899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e655fa52aace8c5%3A0x750b91ce7a953f4c!2sSejahtera%20Service%20Electronic!5e0!3m2!1sid!2sid!4v1766484152334!5m2!1sid!2sid"
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sejahtera Service Location"
                ></iframe>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tulis Ulasan</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={newComment.name}
                    onChange={(e) => setNewComment({...newComment, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment({...newComment, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ulasan <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={newComment.message}
                    onChange={(e) => setNewComment({...newComment, message: e.target.value})}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tulis pengalaman Anda..."
                  ></textarea>
                </div>

                <Button
                  onClick={handleSubmitComment}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Kirim Ulasan
                </Button>

                {(newComment.name || newComment.email || newComment.message) && (
                  <button
                    type="button"
                    onClick={handleCancelComment}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                    title="Hapus semua isian"
                  >
                    <X className="w-4 h-4" />
                    Batalkan
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Ulasan Pelanggan</h3>
                
                <button
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className={`text-sm flex items-center gap-2 transition-colors ${
                    isAdmin 
                      ? 'text-green-600 hover:text-green-700 font-semibold' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {isAdmin ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      Admin ✓
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Admin
                    </>
                  )}
                </button>
              </div>

              {showAdminLogin && !isAdmin && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 relative">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition-all"
                    title="Tutup"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Masukkan password"
                    />
                    <Button
                      onClick={handleAdminLogin}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Login
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Hanya admin yang bisa membalas ulasan pelanggan
                  </p>
                </div>
              )}

              {showAdminLogin && isAdmin && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 relative">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition-all"
                    title="Tutup"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Unlock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Mode Admin Aktif</p>
                      <p className="text-sm text-green-700">Anda dapat membalas ulasan pelanggan</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}

              {/* Modal Konfirmasi Logout dengan Password */}
              {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Konfirmasi Logout</h3>
                      <button
                        onClick={() => {
                          setShowLogoutConfirm(false);
                          setLogoutPassword('');
                        }}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Masukkan password untuk logout dari mode admin
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          value={logoutPassword}
                          onChange={(e) => setLogoutPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="Masukkan password"
                          autoFocus
                        />
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowLogoutConfirm(false);
                            setLogoutPassword('');
                          }}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                        >
                          Batal
                        </button>
                        <Button
                          onClick={handleAdminLogout}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {comments.length === 0 && (
                  <p className="text-gray-600 text-center py-8">Belum ada ulasan</p>
                )}
                
                {comments.map((c) => (
                  <div key={c.id} className="bg-gray-50 p-5 rounded-xl border border-gray-200 relative">
                    <button
                      onClick={() => {
                        if (window.confirm('Hapus ulasan ini?')) {
                          handleDeleteComment(c.id);
                        }
                      }}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-full transition-all"
                      title="Hapus ulasan"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex justify-between items-start mb-2 pr-8">
                      <div>
                        <p className="font-bold text-gray-900">{c.name}</p>
                        {c.email && <p className="text-gray-500 text-sm">{c.email}</p>}
                      </div>
                      <p className="text-gray-400 text-xs">{c.date}</p>
                    </div>
                    
                    <p className="text-gray-800 mb-3">{c.message}</p>
                    
                    {c.reply && (
                      <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-600 rounded-lg">
                        <p className="text-red-600 font-semibold text-sm mb-1">Balasan dari Sejahtera Service:</p>
                        <p className="text-gray-800">{c.reply}</p>
                      </div>
                    )}
                    
                    {!c.reply && isAdmin && (
                      <div className="mt-3 space-y-2">
                        <textarea
                          placeholder="Tulis balasan sebagai admin..."
                          rows="3"
                          value={replyTexts[c.id] || ''}
                          onChange={(e) => setReplyTexts(prev => ({
                            ...prev,
                            [c.id]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                        ></textarea>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleReply(c.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 text-sm"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Kirim Balasan
                          </Button>
                          {replyTexts[c.id] && (
                            <button
                              onClick={() => setReplyTexts(prev => {
                                const updated = { ...prev };
                                delete updated[c.id];
                                return updated;
                              })}
                              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all text-sm"
                            >
                              Batal
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;