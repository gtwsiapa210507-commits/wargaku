import React, { useState } from 'react';
import { ReportItem, OPDUpdate, ChatMessage, ScreenType } from '../types';

interface DetailPengaduanScreenProps {
  report: ReportItem;
  opdUpdates: OPDUpdate[];
  chatMessages: ChatMessage[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const DetailPengaduanScreen: React.FC<DetailPengaduanScreenProps> = ({
  report,
  opdUpdates,
  chatMessages,
  onBack,
  onSendMessage,
  onNavigate,
}) => {
  const [replyText, setReplyText] = useState('');
  const [rating, setRating] = useState(5);
  const [isResolved, setIsResolved] = useState(false);
  const [isReopened, setIsReopened] = useState(false);

  const starLabels = [
    'Perlu Perbaikan Serius (1/5)',
    'Kurang Memuaskan (2/5)',
    'Cukup Baik (3/5)',
    'Sangat Baik & Tanggap (4/5)',
    'Luar Biasa Cepat (5/5)',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendMessage(replyText.trim());
    setReplyText('');
  };

  const handleSettle = () => {
    setIsResolved(true);
    alert('Terima kasih atas apresiasi Anda! Penilaian positif telah diteruskan ke pimpinan OPD dan Walikota Surabaya.');
  };

  const handleReopen = () => {
    setIsReopened(true);
    alert('Permohonan evaluasi ulang telah diajukan ke tim inspektorat teknis SDABM untuk peninjauan kedua.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* FIXED TOP APPBAR */}
      <header className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-xl shadow-xs pt-safe border-b border-gray-100">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <button
              aria-label="Kembali"
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="text-base font-bold text-gray-900 truncate">Detail Pengaduan</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Bantuan"
              onClick={() => alert('Bantuan Tiket: Pantau progres pengerjaan dan diskusikan langsung dengan dinas.')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-8 h-8 rounded-full bg-[#b7131a] flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="flex flex-col relative w-full pt-16 pb-28 max-w-md mx-auto">
        {/* Top Municipal Crimson Banner */}
        <div className="relative bg-gradient-to-r from-[#b7131a] to-[#d8363a] px-4 pt-4 pb-10 text-white">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span className="text-[11px] font-bold uppercase tracking-wider">Tiket Resmi WargaKu</span>
            </div>
            <span className="text-xs font-semibold opacity-90">ID: {report.ticketNumber}</span>
          </div>
          <div className="mt-2 text-left">
            <p className="text-[11px] opacity-80 uppercase tracking-widest font-semibold">
              Pemerintah Kota Surabaya
            </p>
            <h2 className="text-xl font-extrabold tracking-tight mt-0.5 leading-snug">
              {report.opdFullName || 'Dinas Sumber Daya Air & Bina Marga'}
            </h2>
          </div>
        </div>

        {/* Main Overlapping Content Sheet */}
        <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 flex flex-col gap-6 shadow-sm border-t border-gray-100">
          {/* 1. Kartu Identitas Laporan */}
          <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3.5 border border-gray-100">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-gray-500 font-semibold tracking-wide">
                  {report.ticketNumber} · {report.opd}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">{report.title}</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold shrink-0 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                {report.status}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2 bg-white/80 p-3 rounded-xl border border-gray-100 text-left">
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <span className="material-symbols-outlined text-[18px] text-[#b7131a]">
                  calendar_today
                </span>
                <span>
                  Dilaporkan: <strong className="text-gray-900">{report.date}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2 text-gray-600 text-xs">
                <span className="material-symbols-outlined text-[18px] text-[#b7131a] shrink-0 mt-0.5">
                  location_on
                </span>
                <span className="line-clamp-2">{report.location}</span>
              </div>
              {report.description && (
                <p className="text-xs text-gray-700 mt-1 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
                  &ldquo;{report.description}&rdquo;
                </p>
              )}
            </div>
          </div>

          {/* 2. Tracker Tahapan Pengerjaan */}
          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                  timeline
                </span>
                Tahapan Pengerjaan
              </h4>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-red-100 text-[#b7131a] font-bold">
                Tahap 3 dari 4
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-4 border border-gray-100">
              <div className="relative flex items-center justify-between w-full">
                {/* Step Connectors */}
                <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-gray-200 z-0"></div>
                <div className="absolute left-4 w-2/3 top-1/2 -translate-y-1/2 h-1 bg-[#b7131a] z-0 transition-all duration-500"></div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold mt-1.5">Diajukan</span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <span className="text-[11px] text-gray-800 font-semibold mt-1.5">Diverifikasi</span>
                </div>

                {/* Step 3 (Active) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-[#b7131a] text-white flex items-center justify-center shadow-md animate-pulse">
                    <span className="material-symbols-outlined text-[18px]">engineering</span>
                  </div>
                  <span className="text-[11px] text-[#b7131a] font-bold mt-1.5">Lapangan</span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">flag</span>
                  </div>
                  <span className="text-[11px] text-gray-500 mt-1.5">Selesai</span>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white p-3 rounded-xl flex items-center gap-3 border border-gray-100 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#b7131a] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">speed</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-gray-900">
                      Progres Fisik: {report.progressPercent}%
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                      Tepat Waktu
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Penghamparan lapis aspal AC-WC dijadwalkan siang ini.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Foto Bukti dari Pelapor */}
          {report.imageUrl && (
            <div className="flex flex-col gap-2.5 text-left">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                    photo_camera
                  </span>
                  Foto Bukti dari Pelapor
                </h4>
                <span className="text-[11px] text-gray-500">1 Foto Lampiran</span>
              </div>
              <div className="relative overflow-hidden rounded-2xl bg-gray-100 h-48 w-full shadow-inner">
                <img
                  className="w-full h-full object-cover"
                  alt={report.imageAlt || 'Foto Pelapor'}
                  src={report.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                    <span>Dukuh Kupang Barat</span>
                  </div>
                  <span className="text-[11px] bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full font-medium">
                    02 Jun 2025
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 4. Dokumentasi Pengerjaan & Transparansi OPD */}
          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                  history_edu
                </span>
                Transparansi Pengerjaan OPD
              </h4>
              <span className="text-[11px] font-bold text-red-600">Terbuka Publik</span>
            </div>

            <div className="flex flex-col gap-3">
              {opdUpdates.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 p-4 rounded-2xl flex flex-col gap-3 border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#b7131a] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[18px]">
                          {item.badge === 'Konstruksi' ? 'construction' : 'straighten'}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900">{item.author}</span>
                        <span className="text-[10px] text-gray-500">{item.timestamp}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-100 text-red-800 font-bold">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 leading-relaxed">{item.description}</p>

                  {item.images && item.images.length === 1 && (
                    <div className="w-full h-44 rounded-xl overflow-hidden bg-gray-200 relative shadow-inner">
                      <img
                        className="w-full h-full object-cover"
                        alt={item.images[0].alt}
                        src={item.images[0].url}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">photo</span>
                        <span>{item.images[0].label}</span>
                      </div>
                    </div>
                  )}

                  {item.images && item.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-2">
                      {item.images.map((img, i) => (
                        <div
                          key={i}
                          className="h-28 rounded-xl overflow-hidden bg-gray-200 relative shadow-inner"
                        >
                          <img className="w-full h-full object-cover" alt={img.alt} src={img.url} />
                          <span className="absolute bottom-1.5 left-1.5 text-[10px] font-semibold bg-black/60 text-white px-1.5 py-0.5 rounded">
                            {img.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Ruang Diskusi Terbuka Pelapor & Petugas */}
          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                  forum
                </span>
                Ruang Diskusi Interaktif
              </h4>
              <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                OPD Aktif
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3 border border-gray-100">
              {/* Message Stream */}
              <div className="flex flex-col gap-3">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[90%] ${
                      msg.sender === 'user' ? 'self-end justify-end' : ''
                    }`}
                  >
                    {msg.sender === 'opd' && (
                      <div className="w-8 h-8 rounded-full bg-[#b7131a] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">support_agent</span>
                      </div>
                    )}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-gray-900">{msg.senderName}</span>
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                      </div>
                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          msg.sender === 'user'
                            ? 'bg-[#b7131a] text-white rounded-tr-sm'
                            : 'bg-white text-gray-800 rounded-tl-sm border border-gray-200/60'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center shrink-0 mt-1 shadow-xs">
                        <span className="material-symbols-outlined text-[16px]">person</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSend} className="relative mt-2 flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Ketik pesan konfirmasi ke OPD..."
                    className="w-full h-11 bg-white rounded-full pl-4 pr-10 text-gray-900 placeholder:text-gray-400 text-xs shadow-2xs border border-gray-200 outline-none focus:ring-2 focus:ring-[#b7131a]/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => alert('Foto lampiran percakapan dapat dipilih.')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-gray-400 flex items-center justify-center hover:bg-gray-100"
                  >
                    <span className="material-symbols-outlined text-[18px]">attach_file</span>
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-11 h-11 rounded-full bg-[#b7131a] hover:bg-red-800 text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">send</span>
                </button>
              </form>
            </div>
          </div>

          {/* 6. Verifikasi & Kepuasan Warga */}
          <div className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-2xl p-4 flex flex-col gap-4 shadow-2xs border border-gray-200 mb-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-red-100 text-[#b7131a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">task_alt</span>
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-gray-900 leading-tight">
                  Apakah masalah ini sudah beres?
                </h4>
                <p className="text-[11px] text-gray-600 mt-0.5">
                  Konfirmasi warga sangat menentukan evaluasi mutu dinas terkait.
                </p>
              </div>
            </div>

            {/* Interactive Rating */}
            <div className="bg-white p-3.5 rounded-xl flex flex-col items-center gap-2 border border-gray-100 shadow-2xs">
              <span className="text-[11px] font-semibold text-gray-500">
                Beri Nilai Kecepatan & Kualitas Respon
              </span>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star, idx) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="active:scale-125 transition-transform"
                  >
                    <span
                      className={`material-symbols-outlined text-[32px] ${
                        star <= rating ? 'text-amber-400' : 'text-gray-300'
                      }`}
                      style={{ fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-[#b7131a]">{starLabels[rating - 1]}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={handleSettle}
                className={`w-full h-12 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all ${
                  isResolved ? 'bg-emerald-700' : 'bg-[#b7131a] hover:bg-red-800'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isResolved ? 'check_circle' : 'thumb_up'}
                </span>
                {isResolved ? 'Apresiasi Warga Terkirim' : 'Sudah Beres (Kirim Apresiasi)'}
              </button>

              <button
                type="button"
                onClick={handleReopen}
                className="w-full h-11 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
                {isReopened ? 'Permintaan Evaluasi Terkirim' : 'Belum Tuntas, Ajukan Evaluasi Ulang'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
