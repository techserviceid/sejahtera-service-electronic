# Sejahtera Service Electronic — Frontend Website

Website resmi Sejahtera Service Electronic, dibangun dengan **React** dan **Vite**. Menampilkan informasi layanan, konsultasi, FAQ, lokasi, dan sistem ulasan pelanggan yang datanya diambil dari backend Laravel API secara real-time.

## Arsitektur Singkat

Frontend ini **tidak menyimpan data apapun sendiri** — semua data ulasan pelanggan diambil dan dikirim ke backend Laravel lewat REST API. Lihat juga README backend untuk detail API-nya.

```
[React (project ini)]  <---- HTTP request (JSON) ---->  [Laravel API]  <---->  [MySQL]
localhost:3000                                           sejahtera-service-electronic-api.test
```

## Kebutuhan (Prerequisites)

- **Node.js** (versi 18 ke atas disarankan) — [nodejs.org](https://nodejs.org/)
- **npm** (otomatis terinstall bersama Node.js)
- **Backend Laravel API sudah jalan** (lihat README project backend) — website ini tidak akan bisa menampilkan/mengirim ulasan tanpa backend aktif

## Cara Install dari Awal

### 1. Clone project

```bash
git clone <url-repo-frontend-kamu> sejahtera-service-electronic
cd sejahtera-service-electronic
```

### 2. Install dependency

```bash
npm install
```

### 3. Buat file `.env`

Buat file baru bernama `.env` di root folder project ini (sejajar dengan `package.json`), isinya:

```
VITE_API_URL=http://sejahtera-service-electronic-api.test/api
```

> Ganti URL ini sesuai alamat backend Laravel API kamu. Kalau backend dijalankan lewat Laragon dengan virtual host, biasanya formatnya `http://<nama-folder-backend>.test/api`.

Cara buat lewat terminal (PowerShell):
```powershell
"VITE_API_URL=http://sejahtera-service-electronic-api.test/api" | Out-File -FilePath .env -Encoding utf8
```

### 4. Siapkan aset gambar (kalau belum ada)

Pastikan file-file berikut ada di folder `src/assets/`:
- `hero.png` — gambar ilustrasi di halaman utama
- `qris-payment.jpeg` — gambar QRIS untuk pembayaran

### 5. Jalankan development server

```bash
npm run dev
```

Setelah berhasil, buka browser ke alamat yang muncul di terminal, biasanya:
```
http://localhost:3000/sejahtera-service-electronic/
```

**Penting:** pastikan backend Laravel (lihat langkah 9 di README backend) sudah menyala duluan, kalau tidak, bagian ulasan di halaman Lokasi tidak akan menampilkan data apapun.

## Fitur Utama

| Fitur | Lokasi Komponen | Keterangan |
|---|---|---|
| Halaman utama & layanan | `Hero.jsx`, `Services.jsx` | Statis, tidak butuh backend |
| Konsultasi & pembayaran QRIS | `Consult.jsx` | Redirect ke WhatsApp, QRIS statis |
| FAQ | `FAQ.jsx` | Statis |
| Ulasan pelanggan (terhubung API) | `Location.jsx` | Fetch, kirim, balas, hapus ulasan lewat Laravel API |
| Login admin | `Location.jsx` (bagian bawah) | Autentikasi lewat token, tersimpan di `sessionStorage` |

## Cara Login sebagai Admin

1. Scroll ke bagian **Lokasi** di halaman utama.
2. Klik tombol **Admin** di pojok kanan atas kartu "Ulasan Pelanggan".
3. Masukkan email & password admin (sesuai yang diset di `.env` backend saat setup `AdminUserSeeder`).
4. Setelah login, kamu bisa membalas dan menghapus ulasan pelanggan.
5. Sesi admin tersimpan selama tab browser masih terbuka (`sessionStorage`) — otomatis logout kalau tab ditutup.

## Build untuk Production

```bash
npm run build
```

Hasil build akan ada di folder `dist/`, siap di-deploy ke hosting statis (Netlify, Vercel, GitHub Pages, dll). Jangan lupa ganti `VITE_API_URL` di `.env` production ke domain backend yang sudah live, bukan lagi `.test` lokal.

## Troubleshooting Umum

| Masalah | Penyebab | Solusi |
|---|---|---|
| Ulasan tidak muncul / kosong terus | Backend belum jalan, atau `VITE_API_URL` salah | Cek backend sudah nyala, cek isi `.env` |
| `CORS policy` error di console browser | Domain frontend belum diizinkan backend | Tambahkan `http://localhost:3000` di `config/cors.php` backend |
| Perubahan `.env` tidak berpengaruh | Vite hanya baca `.env` saat start | Stop server (`Ctrl+C`), jalankan ulang `npm run dev` |
| `'vite' is not recognized` | Dependency belum terinstall | Jalankan `npm install` dulu |
| Foto/video ulasan tidak muncul | URL media dari backend salah bentuk, atau `storage:link` belum dijalankan di backend | Cek langkah 8 di README backend |