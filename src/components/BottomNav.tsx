import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onEmergencyClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onEmergencyClick,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
      <div className="relative w-full max-w-md mx-auto">
        {/* SVG Curved Cutout Background matching WargaKu municipal aesthetic */}
        <div className="relative w-full drop-shadow-[0_-8px_16px_rgba(0,0,0,0.08)]">
          <svg className="w-full h-[76px] block" preserveAspectRatio="none" viewBox="0 0 375 76">
            <path
              d="M0,16 
                 C0,7.16 7.16,0 16,0 
                 L138,0 
                 C148,0 152,6 156,15 
                 C162,28 171,36 187.5,36 
                 C204,36 213,28 219,15 
                 C223,6 227,0 237,0 
                 L359,0 
                 C367.84,0 375,7.16 375,16 
                 L375,76 
                 L0,76 
                 Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Floating Center Red Button (Emergency/Hotline 112) */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <button
            aria-label="Darurat 112 Surabaya"
            onClick={onEmergencyClick}
            type="button"
            className="w-[56px] h-[56px] rounded-full bg-gradient-to-tr from-[#c81e1e] via-[#e52d27] to-[#f84a4a] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(229,45,39,0.45)] active:scale-95 transition-transform hover:shadow-red-500/60 ring-4 ring-white"
          >
            <span className="material-symbols-outlined text-[26px]">call</span>
          </button>
        </div>

        {/* Navigation Items Container */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pt-1 pb-safe pointer-events-none">
          {/* Tab 1: Layanan */}
          <button
            type="button"
            onClick={() => onNavigate('layanan')}
            className={`pointer-events-auto flex flex-col items-center justify-center min-w-[56px] transition-colors ${
              currentScreen === 'layanan'
                ? 'text-[#e53935] font-extrabold'
                : 'text-[#8e939e] hover:text-[#22252a]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">grid_view</span>
            <span className="text-[11px] font-bold tracking-tight mt-0.5">Layanan</span>
          </button>

          {/* Tab 2: Pengaduan (Lapor) */}
          <button
            type="button"
            onClick={() => onNavigate('pengaduan')}
            className={`pointer-events-auto flex flex-col items-center justify-center min-w-[56px] transition-colors ${
              currentScreen === 'pengaduan' || currentScreen === 'buat-pengaduan' || currentScreen === 'detail-pengaduan'
                ? 'text-[#e53935] font-extrabold'
                : 'text-[#8e939e] hover:text-[#22252a]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">rate_review</span>
            <span className="text-[11px] font-bold tracking-tight mt-0.5">Pengaduan</span>
          </button>

          {/* Spacer for center phone button */}
          <div className="w-14 shrink-0 pointer-events-none" />

          {/* Tab 3: Peta Publik & Status */}
          <button
            type="button"
            onClick={() => onNavigate('peta')}
            className={`pointer-events-auto flex flex-col items-center justify-center min-w-[56px] transition-colors ${
              currentScreen === 'peta'
                ? 'text-[#e53935] font-extrabold'
                : 'text-[#8e939e] hover:text-[#22252a]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">map</span>
            <span className="text-[11px] font-bold tracking-tight mt-0.5">Peta & Kinerja</span>
          </button>

          {/* Tab 4: Agenda Kota */}
          <button
            type="button"
            onClick={() => onNavigate('agenda')}
            className={`pointer-events-auto flex flex-col items-center justify-center min-w-[56px] transition-colors ${
              currentScreen === 'agenda'
                ? 'text-[#e53935] font-extrabold'
                : 'text-[#8e939e] hover:text-[#22252a]'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            <span className="text-[11px] font-bold tracking-tight mt-0.5">Agenda</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
