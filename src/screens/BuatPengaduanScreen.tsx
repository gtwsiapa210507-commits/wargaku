import React, { useState } from 'react';
import { ReportItem, ScreenType } from '../types';

interface BuatPengaduanScreenProps {
  onBack: () => void;
  onSubmit: (newReport: Partial<ReportItem>) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const BuatPengaduanScreen: React.FC<BuatPengaduanScreenProps> = ({
  onBack,
  onSubmit,
  onNavigate,
}) => {
  const [jenisLaporan, setJenisLaporan] = useState<'keluhan' | 'saran' | 'apresiasi'>('keluhan');
  const [selectedOpd, setSelectedOpd] = useState('sdabm');
  const [activeVoiceLang, setActiveVoiceLang] = useState<'id' | 'jv' | 'md'>('id');
  const [laporanText, setLaporanText] = useState(
    'Ada lubang besar di tengah jalan depan SDN Sawahan, diameter sekitar 60 cm dan sering membuat pengendara motor oleng terutama saat malam hari.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [locationText, setLocationText] = useState('Jl. Dukuh Kupang Barat No. 24, Kec. Sawahan');
  const [coords, setCoords] = useState({ lat: -7.2798, lng: 112.7231 });
  const [photos, setPhotos] = useState<Array<{ url: string; label: string; alt: string }>>([
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxa0jFLzo8jr4H91bT5uMP6RPVyIrTAcM7wBrlm2712PO6oK8epEQxd4PHj3d_RIt4pU_RDv1bhXKBSWZpL-33BQXXPGGn2ZP9K7aRw-UI0zs9b_oTHm-eqA8qEovqWz1rdnATK938xBMrxTDuBf9ggznScWu4O9lGtTrsZZXXjeFKsUaqMApSWLEwqm4EQ_8AtJNhU6CdxMma0s2mJY_rOjrxUj-hnrgekCd5vpLph3TyEBPUn-i7',
      label: 'Lubang jalan',
      alt: 'Close-up foto lubang aspal',
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBB1Ci-JmJQMvhI-uVJPJ0pSHQwsWnPAw2C5H9HBpLvFryePH3t8TTR_ZATeda8pOy3T-S00lePqK8OOYqXkSa7oqomLvk_YF9QKukeysAF6AnKylZU53hCX8U8nCQ5dTi96RYFVzS54cbrkt3cbzY4lRor-Fj8yGgoQxAnS8sD4YaiLFx5ETM5qNWpAquGUnXAPbEzyAn_QjRHop5F8Fr0y0rw8xNfTOuaR5G-FwLp8xE8RZnqwDkq',
      label: 'Tampak sudut',
      alt: 'Pemandangan jalan raya dari samping',
    },
  ]);
  const [isAssisted, setIsAssisted] = useState(true);
  const [assistedNik, setAssistedNik] = useState('3578019901010002');
  const [assistedCompanion, setAssistedCompanion] = useState(
    'Bpk. Supriyanto (Ketua RT 05 / RW 02 Sawahan)'
  );
  const [isAnon, setIsAnon] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedTicket, setGeneratedTicket] = useState('#SBY-2024-8841');

  const handleLanguageChange = (lang: 'id' | 'jv' | 'md') => {
    setActiveVoiceLang(lang);
    if (lang === 'jv') {
      setLaporanText(
        'Ono bolongan gedhe ing tengah dalan ngarep SDN Sawahan, ambane kira-kira 60 cm lan sering nggarai pengendara motor oleng nek pas wengi.'
      );
    } else if (lang === 'md') {
      setLaporanText(
        "Bada lobang rajah e tengnga lorong adha'na SDN Sawahan, rajana kera-kera 60 cm tor serrang madhaddhi reng nampa motor agoyang tape malem."
      );
    } else {
      setLaporanText(
        'Ada lubang besar di tengah jalan depan SDN Sawahan, diameter sekitar 60 cm dan sering membuat pengendara motor oleng terutama saat malam hari.'
      );
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleAdjustGps = () => {
    const randomOffsetLat = (Math.random() - 0.5) * 0.005;
    const randomOffsetLng = (Math.random() - 0.5) * 0.005;
    const newLat = Number((-7.2798 + randomOffsetLat).toFixed(4));
    const newLng = Number((112.7231 + randomOffsetLng).toFixed(4));
    setCoords({ lat: newLat, lng: newLng });
    setLocationText(`Jl. Dukuh Kupang Barat No. ${Math.floor(20 + Math.random() * 30)}, Kec. Sawahan`);
    alert(`Titik GPS diperbarui ke koordinat: ${newLat}, ${newLng}`);
  };

  const handleAddPhoto = () => {
    if (photos.length >= 3) {
      alert('Maksimal 3 foto terunggah.');
      return;
    }
    const samplePhotos = [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBg8vJfZ0d9RoXEc_yFrQiKZbfcjocgJ3s_wwWPZfaIqDEAnpHhQQAJiRTlZPdEyUv3ipiH8g_jomN_J9JMuQnUjUEHf83E7E9utz0IHp86hYg2sCp-7IG9fNkkiFW1FUX8axOBZwDXIzhVHYdBoTU_B4JqU5PoP2sk_lFA3ECTNMadjl9xc8HWGfhwDPK2AS6Rpu1HZtOBBoTl3lB6NcJlsjSe7zPT1Y94o6Y1yELrvhiJIgPqSxj2',
    ];
    setPhotos([...photos, { url: samplePhotos[0], label: 'Foto Tambahan', alt: 'Bukti lapangan' }]);
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `#SBY-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedTicket(ticketId);

    const opdMap: Record<string, { opd: string; fullName: string; title: string }> = {
      sdabm: {
        opd: 'Dinas SDABM',
        fullName: 'Dinas Sumber Daya Air & Bina Marga',
        title: 'Jalan Rusak dan Berlubang',
      },
      dlh: {
        opd: 'Dinas Lingkungan Hidup',
        fullName: 'Dinas Lingkungan Hidup Kota Surabaya',
        title: 'Sampah Menumpuk di Saluran',
      },
      dishub: {
        opd: 'Dishub',
        fullName: 'Dinas Perhubungan Kota Surabaya',
        title: 'Lampu PJU & Parkir Liar',
      },
      dinsos: {
        opd: 'Dinas Sosial',
        fullName: 'Dinas Sosial Kota Surabaya',
        title: 'Bantuan Sosial & Kesejahteraan',
      },
      satpol: {
        opd: 'Satpol PP',
        fullName: 'Satuan Polisi Pamong Praja',
        title: 'Ketertiban Umum Lingkungan',
      },
    };

    const targetOpdInfo = opdMap[selectedOpd] || opdMap.sdabm;

    onSubmit({
      ticketNumber: ticketId,
      title: targetOpdInfo.title,
      opd: targetOpdInfo.opd,
      opdFullName: targetOpdInfo.fullName,
      date: 'Hari ini · Baru saja',
      status: 'Sedang diproses',
      statusColor: 'amber',
      location: locationText,
      description: laporanText,
      progressPercent: 20,
      currentStage: 'Diajukan',
      targetDays: '3 Hari Kerja',
      imageUrl: photos[0]?.url,
      coordinates: coords,
      isAssisted,
      assistedNIK: assistedNik,
      assistedCompanion,
      isAnonymous: isAnon,
      upvotes: 1,
      userSupported: true,
    });

    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-xl shadow-xs pt-safe border-b border-gray-100">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <button
              aria-label="Kembali"
              onClick={onBack}
              className="w-11 h-11 flex items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="text-base font-bold text-gray-900 truncate">Buat Pengaduan Baru</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Bantuan"
              onClick={() =>
                alert('Pusat Bantuan WargaKu: Laporkan masalah jalan, banjir, sampah atau PJU.')
              }
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

      {/* MAIN FORM BODY */}
      <main className="flex flex-col relative w-full pt-16 pb-28 max-w-md mx-auto px-4">
        {/* Status Banner Delight / Warm Welcome */}
        <div className="pt-4 pb-2">
          <div className="bg-gradient-to-r from-red-500/10 via-red-100/40 to-amber-500/10 p-4 rounded-xl flex items-center justify-between gap-3 shadow-2xs border border-red-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b7131a] flex items-center justify-center shrink-0 shadow-xs text-white">
                <span className="material-symbols-outlined text-[22px]">campaign</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-900">Layanan Aspirasi WargaKu</span>
                <span className="text-[11px] text-gray-600">
                  Suara panjenengan langsung didengar Pemkot Surabaya
                </span>
              </div>
            </div>
            <span className="text-[11px] px-2.5 py-1 bg-white text-[#b7131a] rounded-full font-bold shadow-2xs shrink-0">
              Siap 24 Jam
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          {/* 1. Kategori Pengaduan (Segmented Tabs) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-900 flex items-center justify-between">
              <span>Jenis Laporan</span>
              <span className="text-xs text-[#b7131a] font-bold">*Wajib</span>
            </label>
            <div className="grid grid-cols-3 p-1 bg-gray-100 rounded-xl gap-1">
              <button
                type="button"
                onClick={() => setJenisLaporan('keluhan')}
                className={`flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  jenisLaporan === 'keluhan'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">error</span>
                Keluhan
              </button>
              <button
                type="button"
                onClick={() => setJenisLaporan('saran')}
                className={`flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  jenisLaporan === 'saran'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">lightbulb</span>
                Saran
              </button>
              <button
                type="button"
                onClick={() => setJenisLaporan('apresiasi')}
                className={`flex items-center justify-center py-2.5 px-3 rounded-lg text-xs font-bold transition-all duration-200 ${
                  jenisLaporan === 'apresiasi'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-white/60'
                }`}
              >
                <span className="material-symbols-outlined text-[18px] mr-1.5">favorite</span>
                Apresiasi
              </button>
            </div>
          </div>

          {/* 2. Topik & Instansi OPD */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                account_balance
              </span>
              Topik & Instansi Terkait
            </label>
            <div className="relative w-full">
              <select
                value={selectedOpd}
                onChange={(e) => setSelectedOpd(e.target.value)}
                className="w-full bg-white text-gray-900 text-xs font-medium rounded-xl py-3.5 pl-4 pr-11 shadow-xs border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-[#b7131a]/30 transition-all"
              >
                <option value="sdabm">Jalan rusak dan berlubang · Dinas SDABM</option>
                <option value="dlh">Sampah menumpuk · Dinas Lingkungan Hidup</option>
                <option value="dishub">Parkir liar & PJU · Dinas Perhubungan</option>
                <option value="dinsos">Bantuan sosial & PKH · Dinas Sosial</option>
                <option value="satpol">Ketertiban umum · Satpol PP Kota Surabaya</option>
              </select>
              <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-[22px]">
                expand_more
              </span>
            </div>
          </div>

          {/* 3. Detail Pengaduan & Input Suara Multi-Bahasa */}
          <div className="flex flex-col gap-2.5 bg-gray-50 p-4 rounded-xl shadow-2xs border border-gray-200/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                  edit_note
                </span>
                Uraian Kejadian
              </label>
              <span className="text-[11px] font-medium text-gray-400">
                {laporanText.length}/500 karakter
              </span>
            </div>

            {/* Selector Bahasa Suara Warga */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
              <span className="text-[11px] text-gray-500 shrink-0 flex items-center font-medium">
                <span className="material-symbols-outlined text-[16px] mr-1">translate</span>
                Dikte:
              </span>
              <button
                type="button"
                onClick={() => handleLanguageChange('id')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                  activeVoiceLang === 'id'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Indonesia
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('jv')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                  activeVoiceLang === 'jv'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Jawa (Suroboyoan)
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('md')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all shrink-0 ${
                  activeVoiceLang === 'md'
                    ? 'bg-[#b7131a] text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200'
                }`}
              >
                Madura
              </button>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={laporanText}
                onChange={(e) => setLaporanText(e.target.value)}
                maxLength={500}
                rows={4}
                className="w-full bg-white text-gray-900 text-xs font-normal rounded-xl p-3.5 shadow-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b7131a]/30 resize-none leading-relaxed"
                placeholder="Tuliskan detail kejadian, patokan terdekat, dan dampak bagi lingkungan..."
              />
            </div>

            {/* Voice Input Mic Micro-interaction Bar */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl shadow-2xs border border-gray-200/80">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={toggleRecording}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm ${
                    isRecording ? 'bg-amber-600 text-white animate-pulse' : 'bg-red-600 text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isRecording ? 'graphic_eq' : 'mic'}
                  </span>
                </button>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-900">
                    {isRecording ? 'Mendengarkan Warga...' : 'Bicara (Input Suara Warga)'}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {isRecording ? 'Mangga panjenengan ngendika sakmenika' : 'Ucapkan laporan, otomatis terketik'}
                  </span>
                </div>
              </div>

              {/* Audio Wave Visualizer Indicator */}
              {isRecording && (
                <div className="flex items-center gap-1 pr-2">
                  <span className="w-1 h-3 bg-[#b7131a] rounded-full animate-pulse"></span>
                  <span className="w-1 h-5 bg-[#b7131a] rounded-full animate-bounce"></span>
                  <span className="w-1 h-2 bg-[#b7131a] rounded-full animate-pulse"></span>
                  <span className="w-1 h-4 bg-[#b7131a] rounded-full animate-bounce"></span>
                </div>
              )}
            </div>
          </div>

          {/* 4. Lokasi Kejadian & Pin Peta */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                location_on
              </span>
              Lokasi & Titik Koordinat
            </label>
            <div className="relative">
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="Ketik nama jalan atau nomor rumah"
                className="w-full bg-white text-gray-900 text-xs font-medium rounded-xl py-3 pl-11 pr-4 shadow-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b7131a]/30"
              />
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b7131a] text-[20px]">
                pin_drop
              </span>
            </div>

            {/* Mini Map Visual Interaktif */}
            <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-xs border border-gray-200">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzc85RoJZj2zyUOuLk3chu80ldqm8ABHRvVqa6Gem0FfZyIEo31MNpVkTpCFWxHm6K8ZuKDUJF51NWA_0Sfi270IL98bSC3r1kJJOX0vrE354YgNxpbpyj_re5m2MQyfra8FlJHhL2u-3x8q8-8vlKkhbgnuZzhRWJBAwiTc80E8n2ry0oI7dy2ea4BPkHQVXIpsXqUHB42JuYx0qn5YdmhSIqH_VE-xVVFKxtpelKxAYXoYMrMAck')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Center Marker Badge */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-4">
                <div className="relative flex flex-col items-center animate-bounce">
                  <span className="px-2.5 py-1 rounded-full bg-gray-900/90 text-white text-[11px] font-bold shadow-md mb-1 backdrop-blur-sm">
                    Lokasi Titik Lubang
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#b7131a] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                    <span className="material-symbols-outlined text-[20px]">fmd_bad</span>
                  </div>
                </div>
              </div>

              {/* Button Sesuaikan Titik GPS */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-gray-900 shadow-sm text-xs font-mono">
                  <span className="material-symbols-outlined text-[16px] text-[#b7131a]">
                    gps_fixed
                  </span>
                  <span>
                    {coords.lat}, {coords.lng}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAdjustGps}
                  className="bg-[#b7131a] hover:bg-red-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-md transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">my_location</span>
                  Sesuaikan Titik GPS
                </button>
              </div>
            </div>
          </div>

          {/* 5. Unggah Bukti Lapangan */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">
                  add_a_photo
                </span>
                Bukti Foto Lapangan
              </label>
              <span className="text-[11px] text-gray-500">Maks. 3 Foto</span>
            </div>

            {/* Photo Cards Mosaic */}
            <div className="grid grid-cols-3 gap-2.5">
              {photos.map((item, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-xl overflow-hidden aspect-square shadow-xs bg-gray-100 border border-gray-200"
                >
                  <img src={item.url} alt={item.alt} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-1.5">
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="self-end w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs hover:bg-red-700"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                    <span className="text-[11px] text-white truncate px-1 font-medium">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}

              {photos.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="cursor-pointer flex flex-col items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 transition-all aspect-square p-2 text-center group active:scale-95 shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-full bg-red-50 text-[#b7131a] flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                  </div>
                  <span className="text-xs text-gray-800 font-bold leading-tight">+ Tambah</span>
                  <span className="text-[10px] text-gray-500">Foto</span>
                </button>
              )}
            </div>
          </div>

          {/* 6. Opsi Inklusif Bantuan Warga (Citizen Assist Feature) */}
          <div className="flex flex-col gap-3.5 bg-gray-50 p-4 rounded-xl shadow-2xs border border-gray-200/60">
            <div className="flex items-start gap-3">
              <input
                id="assistedCheck"
                type="checkbox"
                checked={isAssisted}
                onChange={(e) => setIsAssisted(e.target.checked)}
                className="w-5 h-5 mt-0.5 rounded text-[#b7131a] focus:ring-0 accent-[#b7131a] cursor-pointer shrink-0"
              />
              <label htmlFor="assistedCheck" className="cursor-pointer select-none">
                <span className="text-xs font-bold text-gray-900 block">
                  Saya dibantu RT/RW atau petugas kelurahan
                </span>
                <span className="text-[11px] text-gray-500 block mt-0.5 leading-snug">
                  Membantu lansia atau warga tanpa akses gawai pintar melaporkan secara langsung.
                </span>
              </label>
            </div>

            {isAssisted && (
              <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-800 font-semibold">
                    NIK Warga yang Dibantu
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={assistedNik}
                      onChange={(e) => setAssistedNik(e.target.value)}
                      placeholder="16 digit NIK Surabaya"
                      className="w-full bg-white text-gray-900 text-xs font-medium rounded-xl py-2.5 px-3.5 shadow-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b7131a]/30"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#b7131a] text-[18px]">
                      verified
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-800 font-semibold">
                    Nama Pendamping & Instansi
                  </label>
                  <input
                    type="text"
                    value={assistedCompanion}
                    onChange={(e) => setAssistedCompanion(e.target.value)}
                    placeholder="Nama lengkap serta jabatan/peran pendamping"
                    className="w-full bg-white text-gray-900 text-xs font-medium rounded-xl py-2.5 px-3.5 shadow-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#b7131a]/30"
                  />
                </div>
              </div>
            )}

            {/* Privasi Warga Checkbox */}
            <div className="pt-2 flex items-center gap-3 border-t border-gray-200/80">
              <input
                id="anonCheck"
                type="checkbox"
                checked={isAnon}
                onChange={(e) => setIsAnon(e.target.checked)}
                className="w-5 h-5 rounded text-[#b7131a] focus:ring-0 accent-[#b7131a] cursor-pointer shrink-0"
              />
              <label htmlFor="anonCheck" className="text-xs text-gray-800 cursor-pointer select-none">
                Rahasiakan identitas saya dari OPD pelaksana (Anonim publik)
              </label>
            </div>
          </div>

          {/* 7. Tombol Kirim & SLA Information */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="w-full bg-[#b7131a] hover:bg-red-800 text-white text-sm font-bold py-4 rounded-xl shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[24px]">send</span>
              <span>Kirim Pengaduan Sekarang</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs pb-2">
              <span className="material-symbols-outlined text-[18px] text-[#b7131a]">
                schedule
              </span>
              <span>
                Target respon awal OPD maksimal <strong>1x24 jam</strong>
              </span>
            </div>
          </div>
        </form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white text-gray-900 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl">
              <div className="w-16 h-16 rounded-full bg-red-100 text-[#b7131a] flex items-center justify-center mb-3">
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-1">Matur Nuwun!</h3>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                Pengaduan panjenengan sampun kacathet ing sistem WargaKu kanthi nomer tiket:{' '}
                <strong className="text-[#b7131a] font-bold">{generatedTicket}</strong>.
              </p>
              <div className="w-full bg-gray-50 p-3 rounded-xl mb-4 text-left text-xs text-gray-600 flex items-center gap-2 border border-gray-100">
                <span className="material-symbols-outlined text-[20px] text-[#b7131a]">
                  notifications_active
                </span>
                <span>Notifikasi pemantauan progres tindak lanjut akan dikirim ke aplikasi ini.</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  onBack();
                }}
                className="w-full bg-[#b7131a] text-white text-xs font-bold py-3 rounded-xl hover:bg-red-800 transition-all shadow-md"
              >
                Lihat Riwayat Laporan
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
