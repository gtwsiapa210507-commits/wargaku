import React, { useState } from 'react';
import { CityService } from '../types';

interface ServiceModalProps {
  service: CityService | null;
  onClose: () => void;
  onOpenPengaduan: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onOpenPengaduan,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'info' | 'action'>('action');
  const [cctvLocation, setCctvLocation] = useState('Jl. Raya Darmo (Al-Falah)');

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto sm:hidden mb-1"></div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#e53935] flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
              <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                {service.category === 'perizinan' ? 'Layanan Perizinan' : 'Layanan Warga'}
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 mt-0.5 leading-snug">{service.title}</h3>
              <p className="text-xs text-gray-500">{service.subtitle}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Dynamic Service Specific Content */}
        {service.id === 'gobis' && (
          <div className="flex flex-col gap-3">
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-gray-800">Suroboyo Bus & WiraWiri</div>
                <div className="text-[11px] text-gray-500">Pembayaran dengan botol plastik atau QRIS / Flazz</div>
              </div>
              <span className="text-xs font-bold text-red-600 bg-white px-2.5 py-1 rounded-lg shadow-2xs">Live GPS</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-bold text-gray-700">Rute Populer:</div>
              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-800">Koridor 1: Purabaya - Rajawali</div>
                  <div className="text-[11px] text-gray-500">Armada berikutnya: Halte Darmo (4 Menit)</div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Lancar</span>
              </div>
              <div className="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-800">Feeder WiraWiri FD01: Benowo - Tunjungan</div>
                  <div className="text-[11px] text-gray-500">Armada berikutnya: Halte Mayjen (7 Menit)</div>
                </div>
                <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Tepat Waktu</span>
              </div>
            </div>
            <button
              onClick={() => alert('Membuka peta rute armada bus Suroboyo Bus interaktif...')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">map</span>
              <span>Buka Peta Pelacakan Bus</span>
            </button>
          </div>
        )}

        {service.id === 'pengaduan' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Kanal resmi aspirasi dan pengaduan warga Surabaya yang langsung terhubung ke Organisasi Perangkat Daerah (OPD) teknis.
            </p>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-600">SLA Tanggapan Awal:</span>
              <span className="font-bold text-red-600">Maksimal 1 x 24 Jam</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenPengaduan();
              }}
              className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">campaign</span>
              <span>Masuk ke Pengaduan WargaKu</span>
            </button>
          </div>
        )}

        {service.id === 'klampid' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Pelayanan Adminduk daring Dispendukcapil Surabaya. Pengurusan akta lahir, kartu keluarga, surat pindah, dan cetak KTP-el.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                <span className="font-bold text-gray-800">Antrean Online</span>
                <span className="text-[11px] text-gray-500">Pilih hari & jam ke Mal Pelayanan Publik (MPP)</span>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col">
                <span className="font-bold text-gray-800">Cetak di Kelurahan</span>
                <span className="text-[11px] text-gray-500">Berkas dikirim ke kantor kelurahan terdekat</span>
              </div>
            </div>
            <button
              onClick={() => alert('Membuka portal Klampid New Dispendukcapil...')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs"
            >
              Ajukan Dokumen Kependudukan
            </button>
          </div>
        )}

        {service.id === 'sits' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700">Pilih Titik Kamera CCTV:</label>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Live Streaming</span>
            </div>
            <select
              value={cctvLocation}
              onChange={(e) => setCctvLocation(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="Jl. Raya Darmo (Al-Falah)">Jl. Raya Darmo (Depan RS Darmo)</option>
              <option value="Jl. Mayjen Sungkono (Ciputra World)">Jl. Mayjen Sungkono (Ciputra World)</option>
              <option value="Jl. Ahmad Yani (Bundaran Dolog)">Jl. Ahmad Yani (Bundaran Dolog Taman Pelangi)</option>
              <option value="Jl. Tunjungan (Siola)">Jl. Tunjungan (Gedung Siola)</option>
            </select>
            <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-inner">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsUKqK9XzOFp_gyqL5_QlPQaRTwUK4yFux8x1j-5_THoFovd1P3JGixhMPSw75IL79zZVOZ6qIEOJzqNS7OGPWgjl-DPcf7rpUT6Nd237H-zc-P9IicoJI2vOIsXir-j7nuFac5Cd4EvLvFXtDcy9mFZ1JncBLoc8JrHoW4iPZAUTA-dVK42rkNa65zyCa5vtQfOwrEYsWLzGZYw5mwhAqywPfK-qM1E80fVraBSwFXGoWaodpx4hf"
                alt="CCTV SITS Surabaya"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-white flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                <span>REC · SITS-DISHUB</span>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md p-1.5 rounded-lg text-[10px] text-white flex items-center justify-between">
                <span className="font-semibold truncate">{cctvLocation}</span>
                <span className="text-emerald-400 font-bold shrink-0">LALU LINTAS RAMAI LANCAR</span>
              </div>
            </div>
            <p className="text-[11px] text-gray-500">
              Streaming langsung dikelola oleh Surabaya Intelligent Transport System (SITS) Dishub Surabaya.
            </p>
          </div>
        )}

        {service.id === 'ehealth' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Pendaftaran antrean faskes online di 63 Puskesmas dan 2 RSUD (RSUD Soewandhie & RSUD BDH) tanpa perlu mengantre dari subuh.
            </p>
            <div className="p-3 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-800">Faskes Terdekat Anda</span>
                <div className="text-[11px] text-gray-600">Puskesmas Sawahan (Jl. Raya Sawahan No. 40)</div>
              </div>
              <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded-lg">Buka 24 Jam</span>
            </div>
            <button
              onClick={() => alert('Membuka antrean Puskesmas Sawahan...')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs"
            >
              Ambil Nomor Antrean Faskes
            </button>
          </div>
        )}

        {service.id === 'pbb' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Cek Nilai Jual Objek Pajak (NJOP), status pelunasan PBB, serta e-SPPT digital secara mandiri.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Masukkan Nomor Objek Pajak (NOP)..."
                className="flex-1 p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                defaultValue="35.78.040.001.002-0045.0"
              />
              <button
                onClick={() => alert('NOP Valid! Status PBB Tahun 2025: LUNAS')}
                className="px-4 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl"
              >
                Cek
              </button>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Diskon denda PBB 0% berlaku hingga akhir bulan ini!</span>
            </div>
          </div>
        )}

        {service.id === 'beasiswa' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Program Beasiswa Pemuda Tangguh Pemkot Surabaya bagi pelajar SMA/SMK dan mahasiswa perguruan tinggi ber-KTP Surabaya.
            </p>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex flex-col gap-1 text-xs">
              <div className="flex items-center justify-between font-bold text-gray-800">
                <span>Gelombang Semester Ganjil</span>
                <span className="text-emerald-600">Pendaftaran Dibuka</span>
              </div>
              <span className="text-[11px] text-gray-500">Mencakup biaya UKT kuliah dan uang saku bulanan.</span>
            </div>
            <button
              onClick={() => alert('Membuka formulir Beasiswa Pemuda Tangguh...')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs"
            >
              Daftar Beasiswa Sekarang
            </button>
          </div>
        )}

        {service.id === 'ssw' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Surabaya Single Window (SSW Alfa) - Satu pintu perizinan berusaha, Nomor Induk Berusaha (NIB), izin reklame, dan izin tata ruang.
            </p>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-700 font-semibold">Waktu Proses Rata-rata:</span>
              <span className="font-bold text-red-600">1-3 Hari Kerja Selesai</span>
            </div>
            <button
              onClick={() => alert('Membuka portal SSW Alfa Perizinan Mandiri...')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs"
            >
              Buka Portal SSW Alfa
            </button>
          </div>
        )}

        {service.id === 'gamis' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Pengecekan Data Keluarga Miskin (Gamis) dan Pra-Miskin Surabaya untuk verifikasi penerima bansos permakanan, seragam gratis, dan PKH.
            </p>
            <button
              onClick={() => alert('Data NIK Anda tercatat dalam database Dinsos Surabaya.')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs"
            >
              Cek Status Kepesertaan Bansos
            </button>
          </div>
        )}

        {service.id === '112' && (
          <div className="flex flex-col gap-3">
            <p className="text-xs text-gray-600 leading-relaxed">
              Layanan darurat terpadu Kota Surabaya bebas pulsa 24 jam untuk segala kondisi kritis darurat.
            </p>
            <button
              onClick={() => alert('Menghubungi Call Center Darurat Surabaya 112')}
              className="w-full py-3 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>Panggil 112 Surabaya</span>
            </button>
          </div>
        )}

        <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>Dikelola Pemerintah Kota Surabaya</span>
          <button onClick={onClose} className="text-gray-600 font-bold hover:underline">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
