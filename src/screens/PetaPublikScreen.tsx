import React, { useState } from 'react';
import { PublicPin, ScreenType } from '../types';
import { PUBLIC_MAP_PINS, NEIGHBORHOOD_REPORTS } from '../data/mockData';

interface PetaPublikScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  reportCount: number;
}

export const PetaPublikScreen: React.FC<PetaPublikScreenProps> = ({
  onNavigate,
  onOpenNotifications,
  reportCount,
}) => {
  const [selectedPin, setSelectedPin] = useState<PublicPin | null>(null);
  const [neighborhoodReports, setNeighborhoodReports] = useState(NEIGHBORHOOD_REPORTS);
  const [selectedDistrict, setSelectedDistrict] = useState('sawahan');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'infrastruktur' | 'kebersihan' | 'pju' | 'air'>('all');
  const [showFloodReportModal, setShowFloodReportModal] = useState(false);
  const [floodStreet, setFloodStreet] = useState('');
  const [floodDepth, setFloodDepth] = useState('15-20 cm');

  const toggleSupport = (id: string) => {
    setNeighborhoodReports((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newSupported = !item.userSupported;
          return {
            ...item,
            userSupported: newSupported,
            initialCount: newSupported ? item.initialCount + 1 : item.initialCount - 1,
          };
        }
        return item;
      })
    );
  };

  const filteredPins = PUBLIC_MAP_PINS.filter((pin) => {
    if (activeCategoryFilter === 'all') return true;
    return pin.category === activeCategoryFilter;
  });

  const handleReportFlood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!floodStreet.trim()) {
      alert('Mohon masukkan nama jalan genangan.');
      return;
    }
    alert(`Laporan genangan air di ${floodStreet} (${floodDepth}) berhasil dikirim ke Satgas Siaga Bencana BPBD & SDABM Surabaya.`);
    setShowFloodReportModal(false);
    setFloodStreet('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-r from-[#b7131a] to-[#db322f] shadow-sm pt-safe">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[22px]">location_city</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-white/80 uppercase tracking-wider font-semibold">
                Pemkot Surabaya
              </span>
              <span className="text-base font-bold text-white leading-tight">
                Pengaduan Warga
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Pemberitahuan"
              onClick={onOpenNotifications}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/15 text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="flex flex-col relative w-full pt-16 pb-32 max-w-md mx-auto">
        {/* Sub-Header Tabs & Quick Summary */}
        <div className="px-4 pt-3 pb-3 bg-gradient-to-b from-gray-50 to-[#fcf9f8]">
          {/* Tab Switcher */}
          <div className="flex p-1 rounded-full bg-gray-200/80 shadow-inner">
            <button
              type="button"
              onClick={() => onNavigate('pengaduan')}
              className="flex-1 py-2 rounded-full text-center text-xs font-semibold text-gray-600 transition-all duration-200 hover:text-gray-900 flex items-center justify-center gap-1.5"
            >
              <span>Laporan Saya</span>
              <span className="px-2 py-0.5 rounded-full bg-white text-gray-700 text-[10px] font-bold">
                {reportCount}
              </span>
            </button>
            <button
              type="button"
              className="flex-1 py-2 rounded-full text-center text-xs font-bold bg-[#b7131a] text-white shadow-xs flex items-center justify-center gap-1.5 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[16px]">public</span>
              <span>Peta Publik & Kinerja</span>
            </button>
          </div>

          {/* Privacy Guard Banner */}
          <div className="mt-3 p-3 rounded-xl bg-white shadow-2xs border border-gray-100 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-50 text-[#b7131a] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] text-[#b7131a] font-bold uppercase tracking-wide">
                Transparansi Terjaga
              </span>
              <p className="text-xs text-gray-600 leading-snug mt-0.5">
                Hanya lokasi dan kategori yang tampil ke publik, tanpa data pribadi pelapor untuk menjaga kerahasiaan warga.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Public Map Section */}
        <section className="px-4 mt-2">
          <div className="rounded-2xl bg-white p-3 shadow-2xs border border-gray-100 overflow-hidden flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#b7131a] text-[20px]">map</span>
                <span className="text-xs font-bold text-gray-900">
                  Peta Aspirasi Warga Surabaya
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#b7131a] text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b7131a] animate-ping"></span>
                Live 24 Jam
              </span>
            </div>

            {/* Map Canvas */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100 shadow-inner border border-gray-200">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9sX-3gxVjc4kU0PS8nEDlut-yE3dzvjZndjevTGm8siht0B-uX7f2gMwHencTZ3qahqqj_WfknzzmFvmUQr-30V-i658-g6qGhsMeIX4PA18i-Xhxsd7jCmN9kB8MATMvzV1zD4Um0Ad041zCh7YTFwIWduBZGTqLBuF70IIHhY3feE8vO3Qhj0zQOYWmR-u9bmV9rre9BWjZzvdUGIF338avWzpMlxrw_yu46LSFC8DNn-X5Maey')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>

              {/* Dynamic Interactive Hotspot Pins */}
              {filteredPins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id;
                return (
                  <button
                    key={pin.id}
                    type="button"
                    onClick={() => setSelectedPin(pin)}
                    style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
                    className="group absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none z-10"
                  >
                    <div className="relative flex items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-[#b7131a] opacity-60"></span>
                      <div
                        className={`relative w-8 h-8 rounded-full text-white flex items-center justify-center shadow-md border-2 border-white transition-transform ${
                          isSelected ? 'scale-125 ring-2 ring-red-400 bg-red-700' : 'bg-[#b7131a]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">{pin.icon}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Popup Pin Detail Card if selected */}
              {selectedPin && (
                <div className="absolute top-2 inset-x-2 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-red-200 animate-in fade-in duration-150">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        <span className="text-xs font-bold text-gray-900">{selectedPin.title}</span>
                      </div>
                      <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                        {selectedPin.description}
                      </p>
                      <span className="text-[10px] text-emerald-700 font-semibold mt-1">
                        Status: {selectedPin.status}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPin(null)}
                      className="text-gray-400 hover:text-gray-700 p-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Map Legend Bottom Strip */}
              <div className="absolute bottom-2 inset-x-2 bg-white/90 backdrop-blur-md rounded-lg p-1.5 flex items-center justify-around shadow-xs text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'infrastruktur' ? 'all' : 'infrastruktur')}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
                    activeCategoryFilter === 'infrastruktur' ? 'bg-red-100 font-bold' : ''
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b7131a]"></span>
                  <span className="text-gray-800">Infrastruktur</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter(activeCategoryFilter === 'kebersihan' ? 'all' : 'kebersihan')}
                  className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-colors ${
                    activeCategoryFilter === 'kebersihan' ? 'bg-amber-100 font-bold' : ''
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-gray-800">Kebersihan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveCategoryFilter('all')}
                  className="text-[#b7131a] font-bold flex items-center gap-0.5"
                >
                  Semua <span className="material-symbols-outlined text-[14px]">tune</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Laporan Serupa di Sekitar (Crowd-validation) */}
        <section className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#b7131a] text-[20px]">groups</span>
              <h2 className="text-sm font-bold text-gray-900">Aspirasi Sekitar Anda</h2>
            </div>
            <span className="text-[11px] text-gray-500 font-semibold">Radius 3 Km</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {neighborhoodReports.map((item) => (
              <article
                key={item.id}
                className="p-3.5 rounded-2xl bg-white shadow-2xs border border-gray-100 flex flex-col gap-2.5 transition-transform active:scale-[0.99]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-[#b7131a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <h3 className="text-xs font-bold text-gray-900 truncate">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 truncate">{item.location}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${item.statusBg} ${item.statusText}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                    <span className="material-symbols-outlined text-[16px] text-[#b7131a]">
                      thumb_up
                    </span>
                    <span>{item.initialCount} dukungan warga</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSupport(item.id)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                      item.userSupported
                        ? 'bg-red-50 text-[#b7131a] border border-red-200'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {item.userSupported ? 'check_circle' : 'add'}
                    </span>
                    <span>
                      {item.userSupported
                        ? `Anda sudah mendukung (${item.initialCount})`
                        : 'Dukung laporan ini'}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Transparansi Kinerja OPD (30 Hari Terakhir) */}
        <section className="px-4 mt-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-gray-900">Kecepatan Pelayanan OPD</h2>
              <span className="text-[11px] text-gray-500">
                Pantauan transparansi 30 hari ke belakang
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <span className="material-symbols-outlined text-[18px]">insights</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-2xs border border-gray-100 flex flex-col gap-4 text-left">
            {/* Item 1: SDABM */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#b7131a]">
                    water_drop
                  </span>
                  <span className="text-xs text-gray-900 font-bold">
                    Dinas SDABM (Drainase & Jalan)
                  </span>
                </div>
                <span className="text-xs text-[#b7131a] font-extrabold">82% selesai</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#b7131a] h-2 rounded-full transition-all duration-500"
                  style={{ width: '82%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Target respon: &lt; 5 hari</span>
                <span className="text-gray-800 font-semibold">Rata-rata 4 hari kerja</span>
              </div>
            </div>

            {/* Item 2: DLH */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-amber-600">eco</span>
                  <span className="text-xs text-gray-900 font-bold">
                    Dinas Lingkungan Hidup (Kebersihan)
                  </span>
                </div>
                <span className="text-xs text-amber-600 font-extrabold">74% selesai</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '74%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Target respon: &lt; 6 hari</span>
                <span className="text-gray-800 font-semibold">Rata-rata 5 hari kerja</span>
              </div>
            </div>

            {/* Item 3: Dishub */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-blue-600">
                    traffic
                  </span>
                  <span className="text-xs text-gray-900 font-bold">
                    Dinas Perhubungan (PJU & Lampu)
                  </span>
                </div>
                <span className="text-xs text-blue-600 font-extrabold">61% selesai</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: '61%' }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500">
                <span>Target respon: &lt; 7 hari</span>
                <span className="text-gray-800 font-semibold">Rata-rata 7 hari kerja</span>
              </div>
            </div>
          </div>
        </section>

        {/* Info Peringatan Genangan Musim Hujan per Kecamatan */}
        <section className="px-4 mt-5">
          <div className="p-4 rounded-2xl bg-white shadow-2xs border border-gray-100 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#b7131a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">flood</span>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900">Pantau Siaga Genangan Air</h3>
                  <p className="text-[11px] text-gray-500">Musim hujan terintegrasi sensor pompa</p>
                </div>
              </div>
            </div>

            {/* District Selector */}
            <div className="relative">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full appearance-none bg-gray-50 text-gray-900 text-xs font-semibold py-2.5 px-3.5 rounded-xl pr-10 border border-gray-200 focus:outline-none"
              >
                <option value="sawahan">Kecamatan Sawahan (Aktif Dipantau)</option>
                <option value="wonokromo">Kecamatan Wonokromo</option>
                <option value="benowo">Kecamatan Benowo</option>
                <option value="genteng">Kecamatan Genteng</option>
                <option value="rungkut">Kecamatan Rungkut</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-gray-400 pointer-events-none text-[20px]">
                expand_more
              </span>
            </div>

            {/* Status Genangan Card */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b7131a] animate-pulse"></span>
                  <span className="text-xs text-[#b7131a] font-bold">Waspada Genangan</span>
                </div>
                <span className="text-[10px] text-gray-500">Diperbarui 10 mnt lalu</span>
              </div>
              <p className="text-xs text-gray-900 font-semibold">
                Jl. Mayjen Sungkono <span className="font-normal text-gray-500">(Ketinggian 15-20 cm)</span>
              </p>
              <div className="flex items-center justify-between pt-1 text-[11px]">
                <span className="text-gray-500">2 Pompa aktif beroperasi</span>
                <button
                  type="button"
                  onClick={() => alert('Rute Pengalihan: Melalui Jl. Adityawarman atau Jl. HR Muhammad untuk menghindari genangan Mayjen Sungkono.')}
                  className="text-[#b7131a] font-bold flex items-center gap-0.5 hover:underline"
                >
                  Rute Pengalihan <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Report Flood Action */}
            <button
              type="button"
              onClick={() => setShowFloodReportModal(true)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-gray-200 active:scale-[0.99] transition-all"
            >
              <span className="material-symbols-outlined text-[18px] text-[#b7131a]">
                add_location_alt
              </span>
              <span>Laporkan Titik Genangan Baru</span>
            </button>
          </div>
        </section>

        {/* Floating Action Button: Buat Pengaduan Baru */}
        <div className="fixed bottom-22 right-4 z-30">
          <button
            type="button"
            onClick={() => onNavigate('buat-pengaduan')}
            className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#b7131a] to-[#db322f] text-white shadow-lg shadow-red-600/40 active:scale-95 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span className="text-xs font-bold tracking-wide">Buat Aduan</span>
          </button>
        </div>

        {/* Modal Lapor Genangan Air */}
        {showFloodReportModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-600 text-[24px]">flood</span>
                  <h3 className="text-sm font-bold text-gray-900">Laporkan Titik Genangan</h3>
                </div>
                <button
                  onClick={() => setShowFloodReportModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <form onSubmit={handleReportFlood} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Nama Jalan / Patokan Lokasi</label>
                  <input
                    type="text"
                    value={floodStreet}
                    onChange={(e) => setFloodStreet(e.target.value)}
                    placeholder="Contoh: Jl. Kertajaya depan toko..."
                    className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-700">Perkiraan Ketinggian Air</label>
                  <select
                    value={floodDepth}
                    onChange={(e) => setFloodDepth(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium focus:ring-2 focus:ring-red-500 outline-none"
                  >
                    <option value="10-15 cm (Semata Kaki)">10-15 cm (Semata Kaki - Motor Masih Bisa)</option>
                    <option value="15-30 cm (Setengah Betis)">15-30 cm (Setengah Betis - Hati-hati)</option>
                    <option value="30-50 cm (Selutut)">30-50 cm (Selutut - Perlu Pompa Darurat Segera)</option>
                    <option value="> 50 cm (Tinggi)">Lebih dari 50 cm (Evakuasi Mobil/Motor)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#b7131a] text-white font-bold text-xs shadow-md mt-1"
                >
                  Kirim Laporan Siaga Banjir
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
