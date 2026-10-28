import React, { useState } from 'react';
import { CityService, ScreenType } from '../types';

interface LayananPortalScreenProps {
  services: CityService[];
  onOpenService: (service: CityService) => void;
  onNavigate: (screen: ScreenType) => void;
  isLoggedIn: boolean;
  userName: string;
}

export const LayananPortalScreen: React.FC<LayananPortalScreenProps> = ({
  services,
  onOpenService,
  onNavigate,
  isLoggedIn,
  userName,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pengaduan' | 'perizinan'>('pengaduan');
  const [recentServices, setRecentServices] = useState<CityService[]>([]);

  const filteredServices = services.filter((srv) => {
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || srv.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (service: CityService) => {
    // Add to recent services
    setRecentServices((prev) => {
      const filtered = prev.filter((s) => s.id !== service.id);
      return [service, ...filtered].slice(0, 3);
    });

    if (service.id === 'pengaduan') {
      onNavigate('pengaduan');
    } else {
      onOpenService(service);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#e52d27] select-none text-left">
      {/* TOP GRADIENT HEADER WITH STATUS BAR */}
      <header className="relative w-full bg-gradient-to-b from-[#e52d27] via-[#e5332a] to-[#ea3834] pt-safe px-5 pb-9 text-white">
        {/* iOS Status Bar Elements */}
        <div className="flex items-center justify-between text-white text-[15px] font-semibold tracking-tight pb-3">
          <div className="flex items-center gap-1.5 pl-1">
            <span>01.44</span>
            <span className="material-symbols-outlined text-[14px]">bedtime</span>
          </div>
          <div className="flex items-center gap-1.5 pr-1">
            <span className="material-symbols-outlined text-[17px] leading-none">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[17px] leading-none">wifi</span>
            {/* Battery Icon */}
            <div className="w-6 h-3 rounded-[4px] border border-white/90 p-[1.5px] flex items-center relative ml-0.5">
              <div className="h-full w-4/5 bg-white rounded-[1.5px]"></div>
              <div className="absolute -right-1 w-0.5 h-1.5 bg-white rounded-r-sm"></div>
            </div>
          </div>
        </div>

        {/* Title & Login Button Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <h1 className="text-[26px] font-extrabold tracking-tight leading-tight text-white">
              Layanan Digital
            </h1>
            <p className="text-[14px] font-semibold text-white/95 mt-0.5">
              Pemerintah Kota Surabaya
            </p>
          </div>

          {/* Login or User Profile Button */}
          {isLoggedIn ? (
            <button
              onClick={() => onNavigate('login')}
              type="button"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/25 text-white active:scale-95 transition-all shadow-sm"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFQP0dJmaczX4EpgUE_9ZzBaGvWnFBheCKkzMceJXK_QYXzm__xbHxMqKDk8D6Z83Ca06ThTjwze4_1PIY2uyzBnhI8dUzRrPWY5W9-6sEMEfDTSNqtR_n5lkQDIjIFqGlL7T84V2Y2E8Rj5G85I3txEN5Sg-tI0NZFiS5E85WqDMrJHozqtJTgKbChfFDyjOzcRYBraNg87nmM7X5KXGqLkY95lVkfcf7nYS2GcjsU7Hz-bFbJv8F"
                alt="User Profile"
                className="w-7 h-7 rounded-full object-cover border border-white"
              />
              <span className="text-[12px] font-bold leading-tight">Warga</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              type="button"
              className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/25 text-white active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">login</span>
              <span className="text-[12px] font-bold leading-tight mt-0.5">Login</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN SCROLLABLE CONTENT WITH WHITE TOP ROUNDED CURVE */}
      <main className="flex-1 bg-white rounded-t-[32px] px-5 pt-6 pb-32 flex flex-col space-y-6 shadow-2xl relative z-10 -mt-4">
        {/* SEARCH BAR */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-4 text-[#8e939e] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari layanan..."
            className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#f4f4f6] text-[#22252a] placeholder-[#9ca1ab] text-[15px] font-medium border-0 focus:ring-2 focus:ring-[#e53935] focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* KATEGORI LAYANAN */}
        <div className="flex flex-col space-y-3">
          <h2 className="text-[19px] font-extrabold text-[#22252a] tracking-tight">
            Kategori Layanan
          </h2>
          {/* Category Pills Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('pengaduan')}
              className={`px-5 py-2.5 rounded-xl font-bold text-[14px] shadow-sm whitespace-nowrap active:scale-95 transition-all ${
                selectedCategory === 'pengaduan'
                  ? 'bg-[#e53935] text-white'
                  : 'bg-white border border-[#dce0e5] text-[#374151] hover:bg-[#f9fafb]'
              }`}
            >
              Pengaduan & Informasi
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('perizinan')}
              className={`px-5 py-2.5 rounded-xl font-bold text-[14px] shadow-sm whitespace-nowrap active:scale-95 transition-all ${
                selectedCategory === 'perizinan'
                  ? 'bg-[#e53935] text-white'
                  : 'bg-white border border-[#dce0e5] text-[#374151] hover:bg-[#f9fafb]'
              }`}
            >
              Perizinan
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2.5 rounded-xl font-bold text-[14px] shadow-sm whitespace-nowrap active:scale-95 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#e53935] text-white'
                  : 'bg-white border border-[#dce0e5] text-[#374151] hover:bg-[#f9fafb]'
              }`}
            >
              Semua Kategori
            </button>
          </div>
        </div>

        {/* STATUS CARD: BELUM ADA LAYANAN YANG DIBUKA / RECENT SERVICES */}
        {recentServices.length === 0 ? (
          <div className="w-full bg-[#f8f9fa] border border-[#eef0f3] rounded-2xl p-6 flex flex-col items-center text-center space-y-2">
            <div className="w-12 h-12 flex items-center justify-center text-[#9ca3af]">
              <span className="material-symbols-outlined text-[38px] text-[#a4aab5]">history</span>
            </div>
            <h3 className="text-[16px] font-extrabold text-[#3a3f47] leading-snug">
              Belum Ada Layanan yang<br />Dibuka
            </h3>
            <p className="text-[13px] font-medium text-[#78808d] max-w-[240px]">
              Layanan yang baru dibuka akan muncul di sini
            </p>
          </div>
        ) : (
          <div className="w-full bg-[#f8f9fa] border border-[#eef0f3] rounded-2xl p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-gray-700">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#e53935]">history</span>
                Baru Saja Dibuka
              </span>
              <button
                onClick={() => setRecentServices([])}
                className="text-[11px] text-gray-400 hover:text-red-600 font-semibold"
              >
                Hapus Riwayat
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {recentServices.map((rs) => (
                <button
                  key={rs.id}
                  onClick={() => handleServiceClick(rs)}
                  className="p-2.5 rounded-xl bg-white border border-gray-200/80 shadow-2xs flex items-center gap-2 shrink-0 hover:border-red-300 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-[#e53935] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{rs.icon}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">{rs.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SEMUA LAYANAN SECTION (10 Layanan) */}
        <div className="flex flex-col space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] font-extrabold text-[#22252a] tracking-tight">
              Semua Layanan
            </h2>
            <span className="text-[14px] font-bold text-[#6b7280]">
              {filteredServices.length} layanan
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              Layanan &ldquo;{searchQuery}&rdquo; tidak ditemukan.
            </div>
          ) : (
            filteredServices.map((item) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(item)}
                className="w-full bg-white border border-[#eceef2] rounded-2xl p-4 flex items-center justify-between shadow-xs hover:shadow-md hover:border-red-200 transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#e53935] flex items-center justify-center shrink-0 border border-red-100">
                    <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col text-left">
                    <h4 className="text-[16px] font-bold text-[#22252a] leading-snug">{item.title}</h4>
                    <span className="text-[12px] font-medium text-[#6b7280] leading-tight mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#9ca3af] text-[20px]">
                  chevron_right
                </span>
              </div>
            ))
          )}
        </div>

        {/* PROTO DISCLAIMER */}
        <div className="py-3 text-center">
          <p className="text-[11px] font-medium text-[#9ca3af]">
            Aplikasi Resmi WargaKu Surabaya · Pemerintah Kota Surabaya
          </p>
        </div>
      </main>
    </div>
  );
};
