# Santa’s Toy Factory
Game browser bertema pabrik mainan Natal. Karakter, kereta, hadiah, conveyor, pohon, bangunan dan pencahayaan dibuat sebagai objek 3D Three.js. WebGL diperlukan.

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
- Kamera: tahan kepala di tengah selama kalibrasi 24 frame stabil. Sensitivitas disesuaikan ukuran wajah, dengan smoothing, hysteresis, dan jeda konfirmasi untuk mengurangi perpindahan akibat jitter. Geser kepala ke kiri/kanan untuk pindah jalur. Tombol Kalibrasi ulang menetapkan pusat baru. Jika wajah hilang lebih dari 2 detik, game dijeda. Pastikan pencahayaan cukup. Kamera tetap aktif pada hasil akhir, dan Main lagi mempertahankan mode kamera serta melakukan kalibrasi ulang. Matikan kamera memakai tombol atau tutup halaman.
- Alternatif: tombol panah / A dan D / sentuh separuh kiri atau kanan arena.
- Space / Escape untuk jeda; tab tidak aktif otomatis menjeda.
- Hasil akhir, main ulang, suara opsional, rekor tersimpan di browser.

Kamera memerlukan localhost atau HTTPS dan izin browser. Video diproses lokal dengan MediaPipe Face Detection; model dan runtime disalin dari paket npm oleh postinstall, tanpa unggahan kamera ke server. Font Google opsional dengan fallback lokal. Bila izin kamera ditolak, gunakan mode manual. Mode kamera perlu validasi dengan pengguna dan webcam nyata sebelum digunakan dalam acara.

Aset 3D prosedural dibuat di scene.js; logika kalibrasi di tracking.js. Aset tidak dibuat melalui Higgsfield atau Magnific karena integrasinya tidak tersedia dalam sesi ini.

Tes pelacakan: `node --test tests/tracking.test.mjs`. Browser regression menguji renderer, main ulang kamera dan UI dengan input deteksi simulasi; akurasi dengan pengguna nyata belum diukur.

## Living workshop and audio
`textures.js` generates local wrapping-paper, woodgrain, woven cloth, brushed metal, brick, snow and winter-window textures. `decor.js` adds candy-cane posts, teddy bears, robots, wooden horses, turning machine wheels, moving gift trays, a miniature train with steam and snowfall. Static decor is batched by material to reduce draw calls.

`audio.js` synthesizes an original looping Christmas music-box waltz, bass and bell tones in Web Audio. Music starts after a play gesture, pauses with the game, and resumes without creating duplicate loops. Music (default 50%) and effects (85%) have independent volume sliders; the top music button mutes both. A master compressor controls peaks. No external music files or downloads are required. Actual loudness depends on device/system volume. Magnific and Figma were unavailable in this session; no assets are attributed to those plugins.
