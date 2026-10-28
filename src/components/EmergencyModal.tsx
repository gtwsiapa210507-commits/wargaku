import React from 'react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCall = (service: string, number: string) => {
    alert(`[Simulasi Panggilan Cepat] Menghubungi ${service} (${number}). Petugas siap siaga 24 jam.`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto sm:hidden mb-1"></div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30">
              <span className="material-symbols-outlined text-[28px]">emergency</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                Bebas Pulsa 24 Jam
              </span>
              <h3 className="text-xl font-extrabold text-gray-900 mt-0.5">Darurat 112 Surabaya</h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed bg-red-50/80 p-3 rounded-xl border border-red-100">
          Command Center Pemkot Surabaya terintegrasi dengan Ambulans Dinkes, PMK, BPBD, Satpol PP, dan Polrestabes Surabaya.
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => handleCall('Command Center 112', '112')}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-sm flex items-center justify-between shadow-md shadow-red-500/25 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">call</span>
              </div>
              <div className="text-left">
                <div className="text-sm font-extrabold">Hubungi Call Center 112</div>
                <div className="text-[11px] text-white/80">Panggilan Utama Segala Kegawatdaruratan</div>
              </div>
            </div>
            <span className="text-xs font-bold bg-white text-red-700 px-2.5 py-1 rounded-lg">Panggil</span>
          </button>

          <button
            onClick={() => handleCall('Ambulans Medis & Posko Terpadu', '112 / (031) 5454-999')}
            className="w-full p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-800 text-sm flex items-center justify-between active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">local_hospital</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xs">Ambulans Medis Gratis</div>
                <div className="text-[11px] text-gray-500">Kecelakaan, persalinan & serangan medis darurat</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => handleCall('Pemadam Kebakaran & Penyelamatan (PMK)', '112 / (031) 3522-222')}
            className="w-full p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-800 text-sm flex items-center justify-between active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">fire_truck</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xs">Pemadam Kebakaran & Animal Rescue</div>
                <div className="text-[11px] text-gray-500">Kebakaran, sarang tawon, evakuasi ular</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => handleCall('Satgas Siaga Banjir & Pohon Tumbang (BPBD)', '112 / (031) 5035-777')}
            className="w-full p-3.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200/80 text-gray-800 text-sm flex items-center justify-between active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">flood</span>
              </div>
              <div className="text-left">
                <div className="font-bold text-gray-900 text-xs">BPBD & Siaga Banjir</div>
                <div className="text-[11px] text-gray-500">Evakuasi pohon tumbang, tanggul jebol, pompa darurat</div>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400 text-[18px]">chevron_right</span>
          </button>
        </div>

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
          <span>Pusat Kendali Balaikota Surabaya</span>
          <span className="text-red-600 font-semibold">Tersambung GPS Lokasi Anda</span>
        </div>
      </div>
    </div>
  );
};
