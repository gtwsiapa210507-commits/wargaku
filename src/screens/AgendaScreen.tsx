import React, { useState } from 'react';
import { CITY_AGENDA } from '../data/mockData';
import { ScreenType } from '../types';

interface AgendaScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({
  onNavigate,
  onOpenNotifications,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string, title: string) => {
    setReminders((prev) => {
      const updated = !prev[id];
      if (updated) {
        alert(`Pengingat disetel untuk "${title}". Notifikasi akan dikirimkan sebelum acara dimulai.`);
      }
      return { ...prev, [id]: updated };
    });
  };

  const filteredAgenda = CITY_AGENDA.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-40 bg-gradient-to-r from-[#e52d27] via-[#e5332a] to-[#ea3834] pt-safe shadow-sm text-white">
        <div className="h-16 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <div>
              <span className="text-[11px] text-white/80 uppercase tracking-wider font-semibold">
                Pemerintah Kota Surabaya
              </span>
              <h1 className="text-base font-extrabold text-white leading-tight">
                Agenda Warga Surabaya
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white"
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

      {/* MAIN CONTENT */}
      <main className="flex flex-col relative w-full pt-16 pb-32 max-w-md mx-auto px-4">
        {/* Banner */}
        <div className="pt-4 pb-2">
          <div className="p-4 rounded-2xl bg-white shadow-2xs border border-gray-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                Jemput Bola & Layanan Publik
              </span>
              <h2 className="text-sm font-extrabold text-gray-900 mt-1">Jadwal Pelayanan Keliling</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Pantau lokasi mobil layanan adminduk, posyandu, dan pasar murah di kecamatan Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {['Semua', 'Kependudukan', 'Pangan Murah', 'Kesehatan', 'Kegiatan Publik'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#e53935] text-white shadow-2xs'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Agenda Cards */}
        <div className="flex flex-col gap-3 mt-2">
          {filteredAgenda.map((item) => {
            const hasReminder = reminders[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 shadow-2xs border border-gray-100 flex flex-col gap-3 text-left transition-all hover:shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#e53935] uppercase tracking-wider">
                      {item.category} · {item.organizer}
                    </span>
                    <h3 className="text-sm font-extrabold text-gray-900 mt-0.5">{item.title}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-bold shrink-0">
                    {item.date}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#e53935]">
                      schedule
                    </span>
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#e53935]">
                      location_on
                    </span>
                    <span className="font-medium text-gray-800">{item.location}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1 italic leading-snug">
                    {item.notes}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                  <button
                    type="button"
                    onClick={() => alert(`Membuka petunjuk arah Google Maps menuju ${item.location}`)}
                    className="text-xs font-bold text-[#e53935] flex items-center gap-1 hover:underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                    Petunjuk Arah
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleReminder(item.id, item.title)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${
                      hasReminder
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {hasReminder ? 'alarm_on' : 'notifications'}
                    </span>
                    <span>{hasReminder ? 'Pengingat Aktif' : 'Ingatkan Saya'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};
