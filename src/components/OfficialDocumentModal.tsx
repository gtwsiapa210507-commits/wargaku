import React from 'react';

interface OfficialDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle?: string;
  ticketId?: string;
}

export const OfficialDocumentModal: React.FC<OfficialDocumentModalProps> = ({
  isOpen,
  onClose,
  reportTitle = 'Lampu PJU Mati - Jl. Mayjen Sungkono',
  ticketId = '#64102/MC/V/2025',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <div>
              <h3 className="text-base font-extrabold text-gray-900">Berita Acara Penyelesaian</h3>
              <span className="text-[11px] text-gray-500">Dokumen Resmi Pemkot Surabaya</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate / Official Doc Container */}
        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 flex flex-col gap-3 font-sans text-xs">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Pemerintah Kota Surabaya</span>
              <span className="text-xs font-bold text-gray-800">Dinas Perhubungan - UPT Penerangan Jalan Umum</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              TUNTAS DIKERJAKAN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] py-1">
            <div>
              <span className="text-gray-400 block">Nomor Berkas:</span>
              <span className="font-bold text-gray-800">{ticketId}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Tanggal Selesai:</span>
              <span className="font-bold text-gray-800">21 Mei 2025 · 19:40 WIB</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-400 block">Uraian Pekerjaan:</span>
              <span className="font-medium text-gray-800">
                Penggantian 1 unit armature lampu PJU LED Philips 90W dan perbaikan konektor kabel tiang nomor PJU-MS-042 di Jl. Mayjen Sungkono, Sawahan.
              </span>
            </div>
            <div>
              <span className="text-gray-400 block">Penanggung Jawab:</span>
              <span className="font-bold text-gray-800">Ir. Bambang Triyono, M.T.</span>
              <span className="text-[10px] text-gray-500 block">NIP. 197805122003121004</span>
            </div>
            <div>
              <span className="text-gray-400 block">Status Validasi:</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                Tanda Tangan Elektronik Sah (BSrE)
              </span>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
              </div>
              <div className="flex flex-col text-[10px]">
                <span className="font-bold text-gray-800">Verifikasi QR Code</span>
                <span className="text-gray-400">sertifikat.surabaya.go.id/ba/{ticketId.replace(/[^a-zA-Z0-9]/g, '')}</span>
              </div>
            </div>
            <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-1 rounded">TERVERIFIKASI</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Mengunduh salinan Berita Acara digital format PDF...')}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Berita Acara (PDF)</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
