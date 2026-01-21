import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, X, Lock, Unlock, Star, TrendingUp, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const Location = () => {
  const { toast } = useToast();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: '',
    rating: 0
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutPassword, setLogoutPassword] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hoveredRating, setHoveredRating] = useState(0);

  const ADMIN_PASSWORD_HASH = "dd07dce72257a331fc33b952a18c118a04d4f969c1d9e91def4d49ca13113332";

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('location_messages') || '[]');
    setComments(storedComments);
    
    // Cek apakah admin sudah login
    const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setIsAdmin(adminLoggedIn);
    setLoading(false);
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.name || !newComment.message) {
      return;
    }

    const comment = {
      id: Date.now(),
      name: newComment.name,
      email: newComment.email,
      message: newComment.message,
      rating: newComment.rating || 0,
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'numeric', 
        year: 'numeric' 
      }),
      reply: null,
      verified: false
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem('location_messages', JSON.stringify(updatedComments));
    
    setNewComment({ name: '', email: '', message: '', rating: 0 }); 
  };

  const handleReply = async (id) => {
    const replyText = replyTexts[id];
    
    if (!replyText || !replyText.trim()) {
      return;
    }

    const updatedComments = comments.map((c) =>
      c.id === id ? { ...c, reply: replyText.trim(), verified: true } : c
    );
    setComments(updatedComments);
    localStorage.setItem('location_messages', JSON.stringify(updatedComments));
    
    setReplyTexts(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleDeleteComment = async (id) => {
    const updatedComments = comments.filter((c) => c.id !== id);
    setComments(updatedComments);
    localStorage.setItem('location_messages', JSON.stringify(updatedComments));
    setDeleteConfirm(null);
  };

  const handleCancelComment = () => {
    setNewComment({ name: '', email: '', message: '', rating: 0 });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    
    const hashedInput = await hashPassword(adminPassword);
    
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAdmin(true);
      const sessionToken = await hashPassword(Date.now().toString());
      sessionStorage.setItem('admin_session', sessionToken);
      sessionStorage.setItem('admin_session_time', Date.now().toString());
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      setAdminPassword('');
    }
  };

  const handleAdminLogout = async (e) => {
    e.preventDefault();
    
    const hashedInput = await hashPassword(logoutPassword);
    
    if (hashedInput === ADMIN_PASSWORD_HASH) {
      setIsAdmin(false);
      sessionStorage.removeItem('admin_session');
      sessionStorage.removeItem('admin_session_time');
      setShowLogoutConfirm(false);
      setLogoutPassword('');
      setShowAdminLogin(false);
    } else {
      setLogoutPassword('');
    }
  };

  // Statistik
  const ratedComments = comments.filter(c => c.rating && c.rating > 0);

  const averageRating =
    ratedComments.length > 0
      ? (
          ratedComments.reduce((sum, c) => sum + c.rating, 0) /
          ratedComments.length
        ).toFixed(1)
      : "0.0";

  const verifiedCount = comments.filter(c => c.verified).length;

  return (
    <section id="location" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            LOKASI
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Area Layanan
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Datang langsung dengan jangkauan area yang jelas
          </p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold text-gray-900">{averageRating}</span>
              </div>
              <p className="text-sm text-gray-600">Rating Rata-rata</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-6 h-6 text-green-500" />
                <span className="text-3xl font-bold text-gray-900">{verifiedCount}</span>
              </div>
              <p className="text-sm text-gray-600">Ulasan Terverifikasi</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <span className="text-3xl font-bold text-gray-900">{comments.length}</span>
              </div>
              <p className="text-sm text-gray-600">Total Ulasan</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* KOLOM KIRI */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Informasi Kontak */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Informasi</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 via-red-600 to-rose-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
                    <MapPin className="w-5 h-5 text-white relative z-10" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      Jl. Anggrek Grendeng<br />
                      Purwokerto Utara Kode Pos 53122
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
                ></iframe>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 overflow-x-hidden"
          >
            {/* Form Ketik Ulasan */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ketik Ulasan</h3>
              <form onSubmit={handleSubmitComment} className="space-y-4">
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewComment((prev) => ({
                          ...prev,
                          rating: prev.rating === star ? 0 : star
                      }))
                    }
                        
                        className="transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= newComment.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
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
                    placeholder="Ketik di sini...."
                    required
                  ></textarea>
                </div>

                <Button
                  type="submit"
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
                  >
                    <X className="w-4 h-4" />
                    Batalkan
                  </button>
                )}
              </form>
            </div>

            {/* Ulasan Pelanggan */}
            <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Ulasan Pelanggan</h3>
                
                <button
                  onClick={() => setShowAdminLogin(!showAdminLogin)}
                  className={`text-sm flex items-center gap-1 transition-colors flex-shrink-0 ${
                    isAdmin 
                      ? 'text-green-600 hover:text-green-700 font-semibold' 
                      : 'text-gray-600 hover:text-red-600'
                  }`}
                >
                  {isAdmin ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Admin</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Admin</span>
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
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <form onSubmit={handleAdminLogin}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="space-y-2">
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Masukkan password"
                        required
                      />
                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        Login
                      </Button>
                    </div>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">
                    Hanya admin yang dapat membalas ulasan
                  </p>
                </div>
              )}

              {showAdminLogin && isAdmin && (
                <div className="mb-6 p-4 bg-green-50 rounded-xl border border-green-200 relative">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 p-1 rounded-full transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Unlock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-green-900">Mode Admin Aktif</p>
                      <p className="text-sm text-green-700">Anda dapat membalas & menghapus ulasan</p>
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

              {/* Modal Konfirmasi Logout */}
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
                    
                    <form onSubmit={handleAdminLogout}>
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
                            required
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
                          <button
                            type="submit"
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    </form>
                  </motion.div>
                </div>
              )}

              {/* Modal Konfirmasi Hapus */}
              {deleteConfirm !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900">Konfirmasi Hapus</h3>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      Yakin ingin menghapus ulasan ini?
                    </p>
                    
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(null)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteComment(deleteConfirm)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
                      >
                        Hapus
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              <div className="max-h-[500px] overflow-y-auto space-y-4">
                {loading && (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-red-600"></div>
                    <p className="text-gray-600 mt-3">Memuat ulasan...</p>
                  </div>
                )}
                
                {!loading && comments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">Belum ada ulasan</p>
                  </div>
                )}
                
                {!loading && comments.map((c) => (
                  <div key={c.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative">
                    {/* Header Section - Nama dan Tanggal */}
                    <div className="flex justify-between items-center mb-3">
                      
                      {/* Left Side - Nama dan Email */}
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-gray-900 text-lg">{c.name}</p>
                          {c.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold flex items-center gap-0.5">
                              <Award className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        {c.email && <p className="text-gray-500 text-sm mt-0.5">{c.email}</p>}
                      </div>
                      
                      {/* Right Side - Tanggal dan Tombol Hapus */}
                      <div className="flex items-center gap-2">
                        <p className="text-gray-400 text-sm whitespace-nowrap">
                          {c.date}
                        </p>
                        {isAdmin && (
                          <button
                            onClick={() => setDeleteConfirm(c.id)}
                            className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1 rounded-full transition-all flex-shrink-0"
                            title="Hapus ulasan"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Rating Section */}
                    {c.rating > 0 && (
                      <div className="flex gap-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-3 h-3 ${
                              star <= c.rating
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Message Section */}
                    <p className="text-gray-700 leading-relaxed">{c.message}</p>
                    
                    {/* Reply Section */}
                    {c.reply && (
                      <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 rounded-lg">
                        <p className="text-red-700 font-bold text-sm mb-2 flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Balasan dari Sejahtera Service:
                        </p>
                        <p className="text-gray-800">{c.reply}</p>
                      </div>
                    )}
                    
                    {/* Admin Reply Form */}
                    {!c.reply && isAdmin && (
                      <div className="mt-4 space-y-2">
                        <textarea
                          placeholder="Ketik balasan sebagai admin..."
                          rows="3"
                          value={replyTexts[c.id] || ''}
                          onChange={(e) => setReplyTexts(prev => ({
                            ...prev,
                            [c.id]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none text-sm"
                        ></textarea>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleReply(c.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Send className="w-4 h-4" />
                            Kirim Balasan
                          </button>
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

export default Location;