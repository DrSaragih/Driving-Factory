# Santa’s Toy Factory
Game browser bertema pabrik mainan Natal. Grafis vektor digambar langsung di Canvas, responsif tanpa aset gambar eksternal.

## Jalankan
Node.js 20.19+ atau 22.12+ diperlukan.

```sh
npm ci
npm run dev
```

Build: `npm run build`. Preview build: `npm run preview`.

## Mekanik
- 60 detik, 3 nyawa, 3 jalur.
- Hadiah +10; bintang +50; kotak rusak mengurangi nyawa.
- Kamera: kepala saat deteksi pertama menjadi posisi tengah. Geser kepala ke kiri/kanan untuk pindah jalur. Pastikan pencahayaan cukup.
- Alternatif: tombol panah / A dan D / sentuh separuh kiri atau kanan arena.
- Space / Escape untuk jeda; tab tidak aktif otomatis menjeda.
- Hasil akhir, main ulang, suara opsional, rekor tersimpan di browser.

Kamera memerlukan localhost atau HTTPS dan izin browser. Video diproses lokal dengan MediaPipe Face Detection; model dan runtime disalin dari paket npm oleh postinstall, tanpa unggahan kamera ke server. Font Google opsional dengan fallback lokal. Bila izin kamera ditolak, gunakan mode manual. Mode kamera perlu validasi dengan pengguna dan webcam nyata sebelum digunakan dalam acara.

Aset: conveyor perspektif, pabrik, pohon, elf, kereta, hadiah, bintang, rintangan, salju dan partikel dibuat di src.js. Tidak menggunakan aset Higgsfield karena integrasinya tidak tersedia dalam sesi pembuatan.
