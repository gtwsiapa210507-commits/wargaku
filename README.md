# WargaKu Surabaya - Layanan Digital & Pengaduan Warga

Aplikasi resmi layanan digital dan pengaduan warga Pemerintah Kota Surabaya (Transparansi OPD, Peta Aspirasi Publik, dan Layanan Darurat 112).

## 🚀 Panduan Hosting ke GitHub Pages

Proyek ini telah dikonfigurasi secara otomatis dengan **GitHub Actions** (`.github/workflows/deploy.yml`) dan aset berbasis relatif (`base: './'`).

### Langkah Cepat:

1. **Buat Repository Baru di GitHub**:
   - Buka [GitHub](https://github.com/new).
   - Beri nama repository, misalnya `wargaku-surabaya`.
   - Pilih **Public**.

2. **Push Kode ke GitHub**:
   Jalankan perintah berikut di terminal komputer Anda:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - WargaKu Surabaya"
   git branch -M main
   git remote add origin https://github.com/<USERNAME-ANDA>/wargaku-surabaya.git
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**:
   - Masuk ke tab **Settings** di repository GitHub Anda.
   - Di menu sebelah kiri, klik **Pages**.
   - Pada bagian **Build and deployment > Source**, pilih **GitHub Actions**.

Website Anda akan langsung di-deploy secara otomatis dan online di:
`https://<USERNAME-ANDA>.github.io/wargaku-surabaya/`
