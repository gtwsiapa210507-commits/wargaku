import React, { useState } from 'react';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (userName: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [nikInput, setNikInput] = useState('3578019901010002');
  const [pwdInput, setPwdInput] = useState('rahasiawarga123');
  const [showPwd, setShowPwd] = useState(false);
  const [mathAnswer, setMathAnswer] = useState('27');
  const [isLoading, setIsLoading] = useState(false);
  const [activeHelpChip, setActiveHelpChip] = useState<'nik' | 'email' | 'server'>('nik');

  const [magicEmail, setMagicEmail] = useState('wargasurabaya@email.com');
  const [magicSent, setMagicSent] = useState(false);

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regNik, setRegNik] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const helpContents: Record<string, string> = {
    nik: 'Periksa: NIK 16 digit, belum pernah terdaftar, dan sesuai data kependudukan Dukcapil. Jika tetap kendala, kirim tautan masuk instan atau hubungi kelurahan.',
    email: 'Periksa folder Spam/Promosi email Anda. Tautan aktivasi dikirim dari noreply@surabaya.go.id dalam rentang 1-3 menit.',
    server: 'Sistem sedang sinkronisasi berkala dengan server pusat. Harap tunggu 2-5 menit lalu muat ulang, atau coba akses melalui koneksi internet lain.',
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ans = parseInt(mathAnswer.trim(), 10);
    if (ans !== 27) {
      alert('Jawaban verifikasi anti-bot kurang tepat. Mohon hitung 24 + 3.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('Budi Santoso');
      onNavigate('layanan');
    }, 1000);
  };

  const handleSendMagicLink = () => {
    setMagicSent(true);
    setTimeout(() => {
      setMagicSent(false);
    }, 6000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNik.length !== 16) {
      alert('NIK harus 16 digit.');
      return;
    }
    alert(`Registrasi NIK ${regNik} (${regName}) berhasil diautentikasi dengan database Dukcapil Surabaya!`);
    setShowRegisterModal(false);
    onLoginSuccess(regName || 'Warga Baru');
    onNavigate('layanan');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* Top Header Bar with Back Button */}
      <div className="w-full bg-white/90 backdrop-blur-md px-4 py-3 pt-safe flex items-center justify-between border-b border-gray-100 max-w-md mx-auto">
        <button
          onClick={() => onNavigate('layanan')}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:text-gray-900"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Kembali ke Beranda</span>
        </button>
        <span className="text-[11px] font-bold text-[#b7131a] bg-red-50 px-2 py-0.5 rounded-full">
          Dukcapil Terintegrasi
        </span>
      </div>

      <main className="flex flex-col relative w-full pt-4 pb-28 max-w-md mx-auto px-4">
        <div className="flex flex-col gap-4">
          {/* Hero Banner Card */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#b7131a] flex items-center justify-center mb-2 shadow-2xs">
              <span className="material-symbols-outlined text-4xl">assured_workload</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-2xl font-extrabold text-[#b7131a] tracking-tight">
                WargaKu
              </span>
              <span className="bg-[#b7131a] text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                Surabaya
              </span>
            </div>
            <p className="text-xs text-gray-600 max-w-[280px]">
              Satu akun untuk seluruh layanan publik Pemerintah Kota Surabaya
            </p>

            <div className="mt-3.5 w-full h-32 rounded-xl overflow-hidden relative shadow-inner">
              <img
                alt="Balaikota Surabaya"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwOBYAd1wQexwJ1J5RyeARwlp89NhHHeg0INEz6YHUGDBLUgAZg0NrhRpUP43pKsrMNqzCEHzBuy-CAgUm9e-L5EwpKVnxpFjUHP9rBL7K-68iK0Ljb5h97SRq2qxS2bhPwocwYQ30kM5yMsCjux0X1_AhEgM9muK9U7vtBdyHfIVPjC75g8fhh7jlmw7REvHUOaNQOlLfGtcJiZz7LfEAL9G8C7aIoUqf_mYRcBer5Rg7Nj13T1re"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-left">
                <span className="text-[11px] text-gray-800 font-semibold bg-white/90 px-2 py-1 rounded-full shadow-2xs backdrop-blur-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Sistem Dukcapil Terhubung
                </span>
                <span className="text-[11px] text-[#b7131a] font-bold bg-white/90 px-2 py-1 rounded-full shadow-2xs backdrop-blur-sm">
                  v3.4.1
                </span>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7131a] text-xl">login</span>
                <h2 className="text-base font-bold text-gray-900">Masuk ke Akun Anda</h2>
              </div>
              <span className="text-[10px] text-[#b7131a] bg-red-50 border border-red-200 px-2 py-0.5 rounded-md font-bold">
                Warga Terdaftar
              </span>
            </div>

            {/* Field NIK / Email */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600 font-semibold flex items-center justify-between">
                <span>NIK KTP atau Alamat Email</span>
                <span className="text-[11px] text-[#b7131a] font-bold">16 Digit NIK</span>
              </label>
              <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 border border-gray-200">
                <span className="material-symbols-outlined text-gray-400 text-lg">badge</span>
                <input
                  type="text"
                  value={nikInput}
                  onChange={(e) => setNikInput(e.target.value)}
                  className="bg-transparent text-gray-900 text-xs w-full focus:outline-none font-mono"
                  placeholder="35780XXXXXXXXXXX"
                />
                <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
              </div>
            </div>

            {/* Field Password */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-gray-600 font-semibold">Kata Sandi</label>
                <button
                  type="button"
                  onClick={() => alert('Petunjuk reset sandi telah dikirim ke nomor WhatsApp dan email terdaftar.')}
                  className="text-[11px] text-[#b7131a] font-bold hover:underline"
                >
                  Lupa Sandi?
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl px-3.5 py-2.5 flex items-center gap-2 border border-gray-200">
                <span className="material-symbols-outlined text-gray-400 text-lg">lock</span>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={pwdInput}
                  onChange={(e) => setPwdInput(e.target.value)}
                  className="bg-transparent text-gray-900 text-xs w-full focus:outline-none"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPwd ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Anti-Bot Math Security */}
            <div className="bg-gray-50 p-3.5 rounded-xl flex flex-col gap-2 border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[#b7131a] text-base">security</span>
                  Verifikasi Anti-Bot Keamanan
                </span>
                <span className="text-[10px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                  Wajib diisi
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-2xs">
                  <span className="text-sm font-extrabold text-[#b7131a] tracking-wide">
                    24 + 3 =
                  </span>
                </div>
                <div className="flex-1 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-2xs">
                  <input
                    type="number"
                    value={mathAnswer}
                    onChange={(e) => setMathAnswer(e.target.value)}
                    className="bg-transparent text-gray-900 text-sm font-bold w-full text-center focus:outline-none"
                  />
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                Jawab operasi hitung sederhana untuk memastikan Anda warga asli, bukan sistem otomatis.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#b7131a] hover:bg-red-800 text-white py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
            >
              <span className={`material-symbols-outlined text-xl ${isLoading ? 'animate-spin' : ''}`}>
                {isLoading ? 'refresh' : 'verified_user'}
              </span>
              <span>{isLoading ? 'Memverifikasi NIK...' : 'Masuk ke WargaKu'}</span>
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-1 text-center text-gray-500">
              <span className="material-symbols-outlined text-base">privacy_tip</span>
              <span className="text-[11px]">Data terenkripsi standar keamanan BSSN RI</span>
            </div>
          </form>

          {/* Help Center Troubleshooter */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b7131a] text-xl">contact_support</span>
              <h3 className="text-sm font-bold text-gray-900">Tidak bisa registrasi atau masuk?</h3>
            </div>
            <p className="text-xs text-gray-600">
              Pilih kendala yang Anda alami untuk mendapatkan solusi cepat kependudukan Surabaya:
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveHelpChip('nik')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  activeHelpChip === 'nik'
                    ? 'bg-[#b7131a] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">error_outline</span>
                NIK ditolak
              </button>
              <button
                type="button"
                onClick={() => setActiveHelpChip('email')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  activeHelpChip === 'email'
                    ? 'bg-[#b7131a] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">mail</span>
                Email tidak sampai
              </button>
              <button
                type="button"
                onClick={() => setActiveHelpChip('server')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                  activeHelpChip === 'server'
                    ? 'bg-[#b7131a] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">dns</span>
                Muncul error server
              </button>
            </div>

            <div className="bg-red-50/70 p-3.5 rounded-xl flex gap-3 items-start border border-red-100">
              <span className="material-symbols-outlined text-[#b7131a] text-xl mt-0.5">info</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-[#b7131a] font-bold">Panduan Validasi Dukcapil</span>
                <p className="text-xs text-gray-700 leading-relaxed">{helpContents[activeHelpChip]}</p>
              </div>
            </div>
          </div>

          {/* Magic Link Container */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-gray-100 flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 text-[#b7131a] flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">bolt</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900">Kirim Tautan Masuk Instan</h3>
                <p className="text-[11px] text-gray-500">Masuk tanpa sandi (Magic Link) langsung ke HP Anda</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600 font-semibold">Email Terdaftar di Akun</label>
                <div className="bg-gray-50 rounded-xl px-3 py-2 flex items-center gap-2 border border-gray-200">
                  <span className="material-symbols-outlined text-gray-400 text-base">alternate_email</span>
                  <input
                    type="email"
                    value={magicEmail}
                    onChange={(e) => setMagicEmail(e.target.value)}
                    className="bg-transparent text-xs text-gray-900 w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendMagicLink}
              className="w-full bg-[#d8363a] hover:bg-red-700 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-2xs active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-lg">send</span>
              <span>{magicSent ? 'Tautan Terkirim! Cek Email' : 'Kirim tautan masuk (Berlaku 15 menit)'}</span>
            </button>

            {magicSent && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800">
                <span className="material-symbols-outlined text-emerald-600 text-lg">task_alt</span>
                <span>Tautan akses instan telah dikirim ke <b>{magicEmail}</b>. Buka kotak masuk email sekarang!</span>
              </div>
            )}
          </div>

          {/* Hotline & Kelurahan Info */}
          <div className="bg-gray-100/80 rounded-2xl p-4 flex flex-col gap-2 border border-gray-200/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b7131a] text-lg">support_agent</span>
              <h4 className="text-xs font-bold text-gray-900">Layanan Pengaduan & Bantuan Langsung</h4>
            </div>
            <p className="text-[11px] text-gray-600">
              Butuh bantuan operator? Hubungi Hotline Layanan Pengaduan Integritas Pemkot Surabaya:
            </p>
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-lg">call</span>
                <span className="text-sm font-bold text-gray-900">0811-3115-7777</span>
              </div>
              <a
                href="tel:081131157777"
                className="bg-red-50 text-[#b7131a] text-xs font-bold px-3 py-1 rounded-lg hover:bg-red-100"
              >
                Hubungi
              </a>
            </div>
            <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-[#b7131a]">location_on</span>
              Atau kunjungi meja pelayanan adminduk di kantor Kelurahan terdekat di Surabaya.
            </p>
          </div>

          {/* Register Call to Action */}
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className="w-full flex items-center justify-center gap-2">
              <div className="h-0.5 bg-gray-200 flex-1"></div>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                Warga Baru?
              </span>
              <div className="h-0.5 bg-gray-200 flex-1"></div>
            </div>

            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="w-full bg-white text-[#b7131a] border border-red-200 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:bg-red-50/50 transition-all"
            >
              <span className="material-symbols-outlined text-xl">person_add</span>
              <span>Belum punya akun? Daftar Akun Baru</span>
            </button>
            <span className="text-[11px] text-gray-500 text-center">
              Registrasi membutuhkan validasi NIK 16 digit aktif Dukcapil Surabaya.
            </span>
          </div>

          {/* Footer Note */}
          <div className="text-center py-3 flex flex-col items-center gap-1 text-[11px] text-gray-400">
            <p>Dikelola oleh Dinas Komunikasi dan Informatika Kota Surabaya</p>
            <p>Hak Cipta © 2026 Pemerintah Kota Surabaya</p>
          </div>
        </div>

        {/* Register Modal */}
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b7131a] text-xl">person_add</span>
                  <h3 className="text-sm font-bold text-gray-900">Daftar Akun Warga Baru</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">NIK (16 Digit KTP Surabaya) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={regNik}
                    onChange={(e) => setRegNik(e.target.value)}
                    placeholder="Contoh: 3578012345670001"
                    className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 font-mono outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Nama Lengkap (Sesuai KTP) *</label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Nama lengkap warga"
                    className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-700">Nomor WhatsApp Aktif *</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0812XXXXXXXX"
                    className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#b7131a] text-white font-bold text-xs shadow-md mt-1"
                >
                  Verifikasi Dukcapil & Buat Akun
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
