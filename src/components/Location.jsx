import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, X, Lock, Unlock, Star, TrendingUp, Award, Upload, PlayCircle } from 'lucide-react';
import { Button } from '../ui/button';

const MAX_MEDIA_FILES = 4;
const MAX_IMAGE_SIZE_MB = 100;
const MAX_VIDEO_SIZE_MB = 1000;

// Base URL API Laravel, diambil dari .env (lihat file .env.example)
const API_URL = import.meta.env.VITE_API_URL || 'https://sejahtera-service-electronic-api.up.railway.app/api';
// APP_URL dipakai untuk menyusun URL lengkap file media (foto/video) yang disimpan di server
const APP_URL = API_URL.replace(/\/api\/?$/, '');

const Location = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    message: '',
    rating: 0,
    media: []
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [replyTexts, setReplyTexts] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [lightboxMedia, setLightboxMedia] = useState(null);

  // Ambil token admin yang tersimpan di sessionStorage (kalau ada)
  const getToken = () => sessionStorage.getItem('admin_token');

  // Ambil daftar ulasan dari API (halaman 1) + cek sesi admin saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/reviews?page=1`);
        if (!res.ok) throw new Error('Gagal memuat ulasan');
        const result = await res.json();
        setComments(result.data || []);
        setHasMore(result.pagination?.has_more || false);
        setPage(1);
      } catch (err) {
        console.error('Gagal memuat ulasan:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    const token = getToken();
    if (token) {
      fetch(`${API_URL}/admin/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (res.ok) {
            setIsAdmin(true);
          } else {
            sessionStorage.removeItem('admin_token');
          }
        })
        .catch(() => sessionStorage.removeItem('admin_token'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ambil halaman berikutnya lalu tambahkan (append) ke daftar ulasan yang sudah ada
  const loadMoreReviews = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await fetch(`${API_URL}/reviews?page=${nextPage}`);
      if (!res.ok) throw new Error('Gagal memuat ulasan tambahan');
      const result = await res.json();
      setComments((prev) => [...prev, ...(result.data || [])]);
      setHasMore(result.pagination?.has_more || false);
      setPage(nextPage);
    } catch (err) {
      console.error('Gagal memuat ulasan tambahan:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (newComment.media.length + files.length > MAX_MEDIA_FILES) {
      console.warn(`Maksimal ${MAX_MEDIA_FILES} lampiran per ulasan.`);
      e.target.value = '';
      return;
    }

    const newMedia = [];

    for (const file of files) {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (!isImage && !isVideo) {
        console.warn(`${file.name} bukan file foto atau video.`);
        continue;
      }

      const maxSizeMB = isImage ? MAX_IMAGE_SIZE_MB : MAX_VIDEO_SIZE_MB;
      if (file.size > maxSizeMB * 1024 * 1024) {
        console.warn(`${file.name} melebihi batas ${maxSizeMB}MB.`);
        continue;
      }

      // Simpan File asli (untuk dikirim ke server) + URL preview lokal (untuk ditampilkan)
      newMedia.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type: isImage ? 'image' : 'video',
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name
      });
    }

    setNewComment((prev) => ({ ...prev, media: [...prev.media, ...newMedia] }));
    e.target.value = '';
  };

  const handleRemoveMedia = (id) => {
    setNewComment((prev) => {
      const target = prev.media.find((m) => m.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return { ...prev, media: prev.media.filter((m) => m.id !== id) };
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.name || !newComment.message) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', newComment.name);
      formData.append('message', newComment.message);
      formData.append('rating', newComment.rating || 0);
      newComment.media.forEach((m) => {
        formData.append('media[]', m.file);
      });

      const res = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || 'Gagal mengirim ulasan');
      }

      const result = await res.json();
      setComments((prev) => [result.data, ...prev]);
      newComment.media.forEach((m) => m.previewUrl && URL.revokeObjectURL(m.previewUrl));
      setNewComment({ name: '', message: '', rating: 0, media: [] });
    } catch (err) {
      console.error('Gagal mengirim ulasan:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (id) => {
    const replyText = replyTexts[id];
    if (!replyText || !replyText.trim()) return;

    try {
      const res = await fetch(`${API_URL}/reviews/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ reply: replyText.trim() })
      });

      if (!res.ok) throw new Error('Gagal mengirim balasan');

      const result = await res.json();
      setComments((prev) => prev.map((c) => (c.id === id ? result.data : c)));
      setReplyTexts((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    } catch (err) {
      console.error('Gagal mengirim balasan:', err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });

      if (!res.ok) throw new Error('Gagal menghapus ulasan');

      setComments((prev) => prev.filter((c) => c.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Gagal menghapus ulasan:', err);
    }
  };

  const handleCancelComment = () => {
    newComment.media.forEach((m) => m.previewUrl && URL.revokeObjectURL(m.previewUrl));
    setNewComment({ name: '', message: '', rating: 0, media: [] });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      if (!res.ok) throw new Error('Email atau password salah');

      const result = await res.json();
      sessionStorage.setItem('admin_token', result.token);
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminEmail('');
      setAdminPassword('');
    } catch (err) {
      console.error('Login gagal:', err);
      setAdminPassword('');
    }
  };

  const handleAdminLogout = async () => {
    try {
      await fetch(`${API_URL}/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
    } catch (err) {
      // Diamkan saja jika gagal — tetap logout lokal di bawah
    } finally {
      sessionStorage.removeItem('admin_token');
      setIsAdmin(false);
      setShowLogoutConfirm(false);
      setShowAdminLogin(false);
    }
  };

  // Statistik
  const ratedComments = comments.filter((c) => c.rating && c.rating > 0);

  const averageRating =
    ratedComments.length > 0
      ? (ratedComments.reduce((sum, c) => sum + Number(c.rating), 0) / ratedComments.length).toFixed(1)
      : '0.0';

  const verifiedCount = comments.filter((c) => c.verified).length;

  // Helper: susun URL lengkap file media dari path relatif yang dikirim backend
  const mediaSrc = (m) => (m.url?.startsWith('http') ? m.url : `${APP_URL}${m.url}`);

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
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Area Layanan</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Datang langsung dengan jangkauan area yang jelas
          </p>

          {/* Statistics Cards */}
          <div className="mt-8">
            <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <Award className="w-9 h-9 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">{verifiedCount}</p>
                  <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></div>
                    Verified
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">Ulasan Terverifikasi</h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border border-yellow-200/50 hover:shadow-2xl transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mb-4 ring-4 ring-yellow-200/50 group-hover:scale-110 transition-transform">
                    <Star className="w-9 h-9 text-white fill-white" strokeWidth={2} />
                  </div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</p>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const rating = parseFloat(averageRating);
                      const isFull = star <= Math.floor(rating);
                      const isHalf = !isFull && star === Math.ceil(rating) && rating % 1 >= 0.3;
                      return (
                        <div key={star} className="relative w-4 h-4">
                          <Star className="absolute w-4 h-4 text-gray-300 fill-gray-300" />
                          {(isFull || isHalf) && (
                            <div className="absolute overflow-hidden" style={{ width: isFull ? '100%' : '50%' }}>
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">Rating Rata-rata</h3>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-9 h-9 text-white" strokeWidth={2.5} />
                  </div>
                  <p className="text-5xl font-bold text-gray-900 mb-2">{comments.length}</p>
                  <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                    <TrendingUp className="w-3 h-3" />
                    Active
                  </div>
                  <h3 className="text-base font-bold text-gray-800 mb-1">Total Ulasan</h3>
                </div>
              </motion.div>
            </div>

            <div className="md:hidden max-w-md mx-auto">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-yellow-200/50 hover:shadow-xl transition-all col-span-2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg mb-3">
                      <Star className="w-6 h-6 text-white fill-white" strokeWidth={2} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{averageRating}</p>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const rating = parseFloat(averageRating);
                        const isFull = star <= Math.floor(rating);
                        const isHalf = !isFull && star === Math.ceil(rating) && rating % 1 >= 0.3;
                        return (
                          <div key={star} className="relative w-4 h-4">
                            <Star className="absolute w-4 h-4 text-gray-300 fill-gray-300" />
                            {(isFull || isHalf) && (
                              <div className="absolute overflow-hidden" style={{ width: isFull ? '100%' : '50%' }}>
                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-xs text-gray-600 font-semibold leading-tight">
                      Rating<br />Rata-rata
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <Award className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{verifiedCount}</p>
                    <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold mb-4">
                      <div className="bg-green-600 rounded-full animate-pulse"></div>
                      Verified
                    </div>
                    <p className="text-xs text-gray-600 font-semibold leading-tight">
                      Ulasan<br />Terverifikasi
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 shadow-lg">
                      <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{comments.length}</p>
                    <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold mb-4">
                      Active
                    </div>
                    <p className="text-xs text-gray-600 font-semibold leading-tight">
                      Total<br />Ulasan
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
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
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
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
                        onClick={() =>
                          setNewComment((prev) => ({
                            ...prev,
                            rating: prev.rating === star ? 0 : star
                          }))
                        }
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newComment.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
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
                    onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    placeholder="Ketik di sini...."
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Foto/Video <span className="text-gray-400 font-normal">(Opsional)</span>
                  </label>

                  <input
                    type="file"
                    id="review-media-upload"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileSelect}
                    disabled={newComment.media.length >= MAX_MEDIA_FILES}
                    className="hidden"
                  />
                  <label
                    htmlFor="review-media-upload"
                    className={`flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed rounded-lg transition-all text-sm font-medium ${
                      newComment.media.length >= MAX_MEDIA_FILES
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 text-gray-600 hover:border-red-400 hover:text-red-600 cursor-pointer'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Tambah Foto/Video
                  </label>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Maks {MAX_MEDIA_FILES} file • Foto max {MAX_IMAGE_SIZE_MB}MB • Video max {MAX_VIDEO_SIZE_MB}MB
                  </p>

                  {newComment.media.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {newComment.media.map((m) => (
                        <div
                          key={m.id}
                          className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100"
                        >
                          {m.type === 'image' ? (
                            <img src={m.previewUrl} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <video src={m.previewUrl} className="w-full h-full object-cover" muted />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                                <PlayCircle className="w-6 h-6 text-white" />
                              </div>
                            </>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveMedia(m.id)}
                            className="absolute top-1 right-1 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                            title="Hapus lampiran"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 disabled:opacity-60"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Mengirim...' : 'Kirim Ulasan'}
                </Button>

                {(newComment.name || newComment.message || newComment.media.length > 0) && (
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
                    isAdmin ? 'text-green-600 hover:text-green-700 font-semibold' : 'text-gray-600 hover:text-red-600'
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      className="w-full px-4 py-2 mb-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Email admin"
                      required
                    />
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="space-y-2">
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Masukkan password"
                        required
                      />
                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                        Login
                      </Button>
                    </div>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">Hanya admin yang dapat membalas ulasan</p>
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
                        onClick={() => setShowLogoutConfirm(false)}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <p className="text-gray-600 mb-6">Yakin ingin keluar dari mode admin?</p>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleAdminLogout}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </div>
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

                    <p className="text-gray-600 mb-6">Yakin ingin menghapus ulasan ini?</p>

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

              {/* Lightbox Media */}
              {lightboxMedia && (
                <div
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
                  onClick={() => setLightboxMedia(null)}
                >
                  <button
                    onClick={() => setLightboxMedia(null)}
                    className="absolute top-4 right-4 text-white hover:bg-white/10 p-2 rounded-full transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full">
                    {lightboxMedia.type === 'image' ? (
                      <img
                        src={mediaSrc(lightboxMedia)}
                        alt={lightboxMedia.name}
                        className="max-w-full max-h-[85vh] mx-auto rounded-lg object-contain"
                      />
                    ) : (
                      <video
                        src={mediaSrc(lightboxMedia)}
                        controls
                        autoPlay
                        className="max-w-full max-h-[85vh] mx-auto rounded-lg"
                      />
                    )}
                  </div>
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

                {!loading &&
                  comments.map((c) => (
                    <div
                      key={c.id}
                      className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative"
                    >
                      <div className="flex justify-between items-center mb-3">
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
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-gray-400 text-sm whitespace-nowrap">
                            {new Date(c.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric'
                            })}
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

                      {c.rating > 0 && (
                        <div className="flex gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3 h-3 ${
                                star <= c.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      <p className="text-gray-700 leading-relaxed">{c.message}</p>

                      {c.media && c.media.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-3">
                          {c.media.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setLightboxMedia(m)}
                              className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity"
                            >
                              {m.type === 'image' ? (
                                <img src={mediaSrc(m)} alt={m.name} className="w-full h-full object-cover" />
                              ) : (
                                <>
                                  <video src={mediaSrc(m)} className="w-full h-full object-cover" muted />
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <PlayCircle className="w-8 h-8 text-white" />
                                  </div>
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                      )}

                      {c.reply && (
                        <div className="mt-4 p-4 bg-gradient-to-br from-red-50 to-orange-50 border-l-4 border-red-600 rounded-lg">
                          <p className="text-red-700 font-bold text-sm mb-2 flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Balasan dari Sejahtera Service:
                          </p>
                          <p className="text-gray-800">{c.reply}</p>
                        </div>
                      )}

                      {!c.reply && isAdmin && (
                        <div className="mt-4 space-y-2">
                          <textarea
                            placeholder="Ketik balasan sebagai admin..."
                            rows="3"
                            value={replyTexts[c.id] || ''}
                            onChange={(e) =>
                              setReplyTexts((prev) => ({
                                ...prev,
                                [c.id]: e.target.value
                              }))
                            }
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
                                onClick={() =>
                                  setReplyTexts((prev) => {
                                    const updated = { ...prev };
                                    delete updated[c.id];
                                    return updated;
                                  })
                                }
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

              {!loading && hasMore && (
                <button
                  type="button"
                  onClick={loadMoreReviews}
                  disabled={loadingMore}
                  className="w-full mt-4 py-3 rounded-lg border-2 border-red-200 text-red-600 font-semibold hover:bg-red-50 transition-all text-sm disabled:opacity-60"
                >
                  {loadingMore ? 'Memuat...' : 'Muat Ulasan Lainnya'}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;