import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicket: (ticketId: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  onSelectTicket,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Pengerjaan Berlangsung: #64436',
      desc: 'Dinas SDABM telah memulai pengupasan aspal dan pemadatan roller di Jl. Dukuh Kupang Barat.',
      time: '10 menit lalu',
      unread: true,
      ticketId: 'rep-64436',
      icon: 'construction',
      color: 'bg-red-50 text-red-600',
    },
    {
      id: 'notif-2',
      title: 'Peringatan Siaga Genangan Air',
      desc: 'Sensor Kali Lamong & Mayjen Sungkono mendeteksi kenaikan debit. 2 Pompa stasioner aktif.',
      time: '1 jam lalu',
      unread: true,
      icon: 'flood',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'notif-3',
      title: 'Pekerjaan Selesai: #64102',
      desc: 'Dishub Surabaya telah menuntaskan pergantian lampu PJU LED 90W di Jl. Mayjen Sungkono.',
      time: 'Kemarin',
      unread: false,
      ticketId: 'rep-64102',
      icon: 'task_alt',
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      id: 'notif-4',
      title: 'Jemput Bola Adminduk Keliling',
      desc: 'Dispendukcapil membuka rekam KTP-el di Balai RW 04 Kel. Sawahan besok pagi.',
      time: '2 hari lalu',
      unread: false,
      icon: 'badge',
      color: 'bg-purple-50 text-purple-700',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-left max-h-[85vh] overflow-y-auto mt-12 sm:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Notifikasi Warga</h3>
              <span className="text-[11px] text-gray-500">Pembaruan laporan & info kota resmi</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.ticketId) {
                  onSelectTicket(item.ticketId);
                  onClose();
                }
              }}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                item.unread 
                  ? 'bg-red-50/40 border-red-200/80 shadow-xs' 
                  : 'bg-gray-50/70 border-gray-100 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-gray-900 truncate">{item.title}</h4>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-600 mt-0.5 leading-snug">{item.desc}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};
