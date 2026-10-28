import React, { useState, useMemo } from 'react';
import { ReportItem, ScreenType } from '../types';
import { ReportFilterBar, SortOption } from '../components/ReportFilterBar';

interface PengaduanWargaScreenProps {
  reports: ReportItem[];
  onSelectReport: (reportId: string) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  onOpenBeritaAcara: (ticket: ReportItem) => void;
  onSubmitNewReport: (newReport: Partial<ReportItem>) => void;
}

export const PengaduanWargaScreen: React.FC<PengaduanWargaScreenProps> = ({
  reports,
  onSelectReport,
  onNavigate,
  onOpenNotifications,
  onOpenBeritaAcara,
  onSubmitNewReport,
}) => {
  const [activeTab, setActiveTab] = useState<'laporanSaya' | 'laporBaru'>('laporanSaya');
  const [selectedKategori, setSelectedKategori] = useState<string>('Jalan & Saluran');
  const [targetDinas, setTargetDinas] = useState<string>('Dinas Sumber Daya Air dan Bina Marga');
  const [topik, setTopik] = useState('Laporan: Jalan & Saluran - ');
  const [detail, setDetail] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [isGpsLoading, setIsGpsLoading] = useState(false);
  const [gpsLocked, setGpsLocked] = useState(false);
  const [photos, setPhotos] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCiEigQNh4OZalgHgLssWxzQv0zcQU4nRW9PItQvRO42TqriAVpEBF8vNHGllEoPL-xhgc6-yDO4PwXxLpke6Qof08f8VX4XzZEjeMIfeHF89umFyjA1AvFKD_gvsyJse-6GwH6a_rxZ35KC6uvhIhJ8RE2GC7HKkSjlAQUsFZd34eRXvkAgYIe3nOUHQYSdCOdXe4Qd7mWUEdjOZ1EV0J11iDu0ZqtT9lO1HcIntM_nFoCxVzQetR-',
  ]);
  const [isAssisted, setIsAssisted] = useState(false);
  const [assistedNik, setAssistedNik] = useState('');
  const [assistedCompanion, setAssistedCompanion] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [ratingTargetTicket, setRatingTargetTicket] = useState<ReportItem | null>(null);
  const [userRating, setUserRating] = useState(5);

  // Filter & Sorting state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [opdFilter, setOpdFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  // Compute available unique OPDs
  const availableOpds = useMemo(() => {
    const opdSet = new Set<string>();
    reports.forEach((r) => {
      if (r.opd) opdSet.add(r.opd);
    });
    return Array.from(opdSet).sort();
  }, [reports]);

  // Compute status counts for the filter tabs
  const statusCounts = useMemo(() => {
    return {
      all: reports.length,
      sedangDiproses: reports.filter((r) => r.status === 'Sedang diproses').length,
      selesai: reports.filter((r) => r.status === 'Selesai').length,
      diverifikasi: reports.filter((r) => r.status === 'Diverifikasi' || r.status === 'Diajukan').length,
    };
  }, [reports]);

  // Check if any filter is active
  const hasActiveFilters =
    statusFilter !== 'all' ||
    opdFilter !== 'all' ||
    searchQuery.trim() !== '' ||
    sortBy !== 'latest';

  const handleResetFilters = () => {
    setStatusFilter('all');
    setOpdFilter('all');
    setSearchQuery('');
    setSortBy('latest');
  };

  // Filter and sort reports
  const filteredAndSortedReports = useMemo(() => {
    return reports
      .filter((r) => {
        // Status filter
        if (statusFilter !== 'all') {
          if (statusFilter === 'Sedang diproses' && r.status !== 'Sedang diproses') return false;
          if (statusFilter === 'Selesai' && r.status !== 'Selesai') return false;
          if (statusFilter === 'Diverifikasi' && r.status !== 'Diverifikasi' && r.status !== 'Diajukan') return false;
        }

        // OPD filter
        if (opdFilter !== 'all' && r.opd !== opdFilter) {
          return false;
        }

        // Keyword search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTicket = r.ticketNumber.toLowerCase().includes(q);
          const matchTitle = r.title.toLowerCase().includes(q);
          const matchLoc = r.location.toLowerCase().includes(q);
          const matchOpd =
            r.opd.toLowerCase().includes(q) ||
            (r.opdFullName ? r.opdFullName.toLowerCase().includes(q) : false);
          const matchDesc = r.description ? r.description.toLowerCase().includes(q) : false;

          if (!matchTicket && !matchTitle && !matchLoc && !matchOpd && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'status-process') {
          if (a.status === 'Sedang diproses' && b.status !== 'Sedang diproses') return -1;
          if (b.status === 'Sedang diproses' && a.status !== 'Sedang diproses') return 1;
          return 0;
        }
        if (sortBy === 'status-completed') {
          if (a.status === 'Selesai' && b.status !== 'Selesai') return -1;
          if (b.status === 'Selesai' && a.status !== 'Selesai') return 1;
          return 0;
        }
        if (sortBy === 'upvotes') {
          return (b.upvotes || 0) - (a.upvotes || 0);
        }
        if (sortBy === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        // default: 'latest' (newest first based on ticket number or order)
        return b.id.localeCompare(a.id);
      });
  }, [reports, statusFilter, opdFilter, searchQuery, sortBy]);

  const handleKategoriSelect = (kat: string, dinas: string) => {
    setSelectedKategori(kat);
    setTargetDinas(dinas);
    setTopik(`Laporan: ${kat} - `);
  };

  const handleGpsPin = () => {
    setIsGpsLoading(true);
    setTimeout(() => {
      setIsGpsLoading(false);
      setLokasi('Jl. Dukuh Kupang No. 42, RT 03 / RW 06, Sawahan');
      setGpsLocked(true);
    }, 600);
  };

  const handleAddPhoto = () => {
    if (photos.length >= 3) {
      alert('Maksimal 3 foto pendukung');
      return;
    }
    const sampleSecondPhoto =
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBg8vJfZ0d9RoXEc_yFrQiKZbfcjocgJ3s_wwWPZfaIqDEAnpHhQQAJiRTlZPdEyUv3ipiH8g_jomN_J9JMuQnUjUEHf83E7E9utz0IHp86hYg2sCp-7IG9fNkkiFW1FUX8axOBZwDXIzhVHYdBoTU_B4JqU5PoP2sk_lFA3ECTNMadjl9xc8HWGfhwDPK2AS6Rpu1HZtOBBoTl3lB6NcJlsjSe7zPT1Y94o6Y1yELrvhiJIgPqSxj2';
    setPhotos([...photos, sampleSecondPhoto]);
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!detail.trim()) {
      alert('Mohon isi detail pengaduan dengan jelas.');
      return;
    }
    if (!lokasi.trim()) {
      alert('Mohon masukkan lokasi kejadian atau gunakan GPS Pin.');
      return;
    }

    const newTicketNum = `#${Math.floor(64000 + Math.random() * 999)}/MC/X/2026`;
    onSubmitNewReport({
      ticketNumber: newTicketNum,
      title: topik.replace('Laporan: ', '') || selectedKategori,
      opd: targetDinas.includes('SDABM') ? 'Dinas SDABM' : targetDinas.includes('Dishub') ? 'Dishub' : 'Dinas Lingkungan Hidup',
      opdFullName: targetDinas,
      date: 'Hari ini · Baru saja',
      status: 'Sedang diproses',
      statusColor: 'amber',
      location: lokasi,
      description: detail,
      progressPercent: 25,
      currentStage: 'Diajukan',
      targetDays: '3 Hari Kerja',
      imageUrl: photos[0],
      isAssisted,
      assistedNIK: assistedNik,
      assistedCompanion,
      isAnonymous,
      upvotes: 1,
      userSupported: true,
    });

    setToastMessage(`Laporan Berhasil Terkirim! Tiket ${newTicketNum} telah diteruskan ke ${targetDinas}.`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
      setActiveTab('laporanSaya');
      setDetail('');
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] select-none text-left">
      {/* FIXED TOP HEADER */}
      <header className="fixed top-0 w-full z-40 pt-safe bg-[#fcf9f8]/90 backdrop-blur-xl border-b border-gray-200/60">
        <div className="h-14 px-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <img
              alt="Logo WargaKu Pemkot Surabaya"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Uv9YfZSrksdPfdBLQDsq37pTQ_aGJ6SBxPCQqG6nzflKeg3zD8a1wsgGvnHEYdqlH2P6tG6uAX-A2dU0AeCAz5vNcIGPdb3W6zeA3_dXN5KI6mTEyWKA90lcK-ZOH2lV2iq-v-_iKIN2zqv-MtJC7hrEsFogvd3edu4k-KjSR6cIHo0BtV-41wE9oZFWTHs69Kxbb3mwaK2do0AOZrVFygVsndWSG9PgIIISqw8azPfW3bn-ck1KRD3GI"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-[#e53935] leading-tight tracking-tight text-base">
                WargaKu
              </span>
              <span className="text-[11px] text-gray-500 leading-none font-medium">
                Pengaduan Warga
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              aria-label="Notifikasi Warga"
              onClick={onOpenNotifications}
              className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#e53935] ring-2 ring-white"></span>
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="flex items-center justify-center w-9 h-9"
              type="button"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-red-500/20 shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFQP0dJmaczX4EpgUE_9ZzBaGvWnFBheCKkzMceJXK_QYXzm__xbHxMqKDk8D6Z83Ca06ThTjwze4_1PIY2uyzBnhI8dUzRrPWY5W9-6sEMEfDTSNqtR_n5lkQDIjIFqGlL7T84V2Y2E8Rj5G85I3txEN5Sg-tI0NZFiS5E85WqDMrJHozqtJTgKbChfFDyjOzcRYBraNg87nmM7X5KXGqLkY95lVkfcf7nYS2GcjsU7Hz-bFbJv8F"
              />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex flex-col relative w-full pt-16 pb-32 px-4 max-w-md mx-auto">
        <div className="flex flex-col w-full gap-3.5 mt-2">
          {/* Surabaya Red Gradient Civic Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#e52d27] via-[#e53935] to-[#b71c1c] p-4 text-white shadow-md shadow-red-500/20">
            {/* Decorative subtle circles */}
            <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10 pointer-events-none"></div>
            <div className="absolute right-12 -bottom-10 w-24 h-24 rounded-full bg-black/10 pointer-events-none"></div>

            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex flex-col max-w-[82%]">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-100 uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-full w-fit">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Layanan Pengaduan Responsif
                </span>
                <h1 className="text-[22px] font-extrabold text-white mt-1.5 tracking-tight leading-tight">
                  Pengaduan Warga
                </h1>
                <p className="text-xs text-white/90 mt-1 leading-relaxed">
                  Sampaikan aspirasi demi Surabaya yang lebih aman, rapi, dan nyaman.
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-md shadow-inner border border-white/20">
                <span className="material-symbols-outlined text-white text-[24px]">campaign</span>
              </div>
            </div>
          </div>

          {/* Interactive Segmented Navigation */}
          <div className="p-1 rounded-xl bg-gray-100 flex items-center">
            <button
              onClick={() => setActiveTab('laporanSaya')}
              type="button"
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm text-center font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'laporanSaya'
                  ? 'bg-[#e53935] text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              <span>Laporan Saya</span>
              <span
                className={`ml-1 px-1.5 py-0.2 rounded-full text-[11px] font-bold ${
                  activeTab === 'laporanSaya'
                    ? 'bg-white text-[#e53935]'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {reports.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('laporBaru')}
              type="button"
              className={`flex-1 py-2.5 px-3 rounded-lg text-sm text-center font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 ${
                activeTab === 'laporBaru'
                  ? 'bg-[#e53935] text-white shadow-sm font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Lapor Baru</span>
            </button>
          </div>

          {/* TAB 1: LAPORAN SAYA */}
          {activeTab === 'laporanSaya' && (
            <div className="flex flex-col gap-3.5 w-full">
              {/* Header Title with Realtime Signal */}
              <div className="flex items-center justify-between px-0.5 pt-0.5">
                <span className="text-sm font-bold text-gray-900 tracking-tight">
                  Riwayat Aspirasi Terkini
                </span>
                <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Update realtime
                </span>
              </div>

              {/* Advanced Filter Component: Status, OPD & Sorting */}
              <ReportFilterBar
                selectedStatus={statusFilter}
                onChangeStatus={(st) => setStatusFilter(st)}
                selectedOpd={opdFilter}
                onChangeOpd={(opd) => setOpdFilter(opd)}
                availableOpds={availableOpds}
                searchQuery={searchQuery}
                onChangeSearch={(q) => setSearchQuery(q)}
                sortBy={sortBy}
                onChangeSortBy={(sb) => setSortBy(sb)}
                statusCounts={statusCounts}
                totalCount={reports.length}
                filteredCount={filteredAndSortedReports.length}
                onResetFilters={handleResetFilters}
                hasActiveFilters={hasActiveFilters}
              />

              {/* Active Filter Tags Bar (if filtered) */}
              {hasActiveFilters && (
                <div className="flex items-center gap-1.5 flex-wrap -mt-1 px-0.5">
                  <span className="text-[11px] text-gray-500 font-medium">Filter Aktif:</span>
                  {statusFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold">
                      Status: {statusFilter}
                      <button
                        type="button"
                        onClick={() => setStatusFilter('all')}
                        className="hover:text-red-600"
                        aria-label="Hapus filter status"
                      >
                        <span className="material-symbols-outlined text-[12px]">close</span>
                      </button>
                    </span>
                  )}
                  {opdFilter !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-[#e53935] border border-red-200 text-[11px] font-semibold">
                      OPD: {opdFilter}
                      <button
                        type="button"
                        onClick={() => setOpdFilter('all')}
                        className="hover:text-red-700"
                        aria-label="Hapus filter OPD"
                      >
                        <span className="material-symbols-outlined text-[12px]">close</span>
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200 text-[11px] font-semibold">
                      "{searchQuery}"
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-red-600"
                        aria-label="Hapus kata kunci pencarian"
                      >
                        <span className="material-symbols-outlined text-[12px]">close</span>
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Reports List or Empty State */}
              {filteredAndSortedReports.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-gray-300 text-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#e53935] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[30px]">filter_alt_off</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-900">
                      Tidak Ada Laporan Ditemukan
                    </span>
                    <p className="text-xs text-gray-500 mt-1 max-w-[280px]">
                      Tidak ada pengaduan dengan status{' '}
                      <strong>{statusFilter === 'all' ? 'semua' : statusFilter}</strong>
                      {opdFilter !== 'all' ? ` pada dinas ${opdFilter}` : ''}.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-[#e53935] text-xs font-bold flex items-center gap-1.5 border border-red-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                      Reset Semua Filter
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('laporBaru')}
                      className="px-4 py-2 rounded-xl bg-[#e53935] hover:bg-[#d32f2f] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      Buat Laporan
                    </button>
                  </div>
                </div>
              ) : (
                filteredAndSortedReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex flex-col rounded-2xl bg-white p-4 shadow-xs border border-gray-200/70 transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-medium text-gray-500">
                            {report.ticketNumber} · {report.date}
                          </span>
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold text-[10px] border border-gray-200">
                            <span className="material-symbols-outlined text-[12px] text-[#e53935]">account_balance</span>
                            {report.opd}
                          </span>
                        </div>
                        <h2 className="text-base font-bold text-gray-900 mt-1 leading-snug">
                          {report.title}
                        </h2>
                      </div>
                      {report.status === 'Selesai' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold text-[11px] shrink-0 border border-emerald-200">
                          <span className="material-symbols-outlined text-[14px]">check_circle</span>
                          Selesai
                        </span>
                      ) : report.status === 'Diverifikasi' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px] shrink-0 border border-blue-200">
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                          Diverifikasi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold text-[11px] shrink-0 border border-amber-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                          Sedang diproses
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-gray-600 mb-3">
                      <span className="material-symbols-outlined text-[16px] text-[#e53935]">
                        location_on
                      </span>
                      <span className="text-xs font-medium truncate">{report.location}</span>
                    </div>

                    {/* Visual Evidence Preview */}
                    {report.imageUrl && (
                      <div className="w-full h-36 rounded-xl overflow-hidden relative mb-3 bg-gray-100 shadow-inner">
                        <img
                          className="w-full h-full object-cover"
                          alt={report.imageAlt || report.title}
                          src={report.imageUrl}
                        />
                        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {report.status === 'Selesai' ? 'task_alt' : 'photo_camera'}
                          </span>
                          {report.status === 'Selesai'
                            ? `Tuntas Diperbaiki ${report.opd}`
                            : '1 Bukti Foto'}
                        </div>
                      </div>
                    )}

                    {/* Progress Tracker (If still in progress) */}
                    {report.status !== 'Selesai' ? (
                      <div className="flex flex-col gap-1.5 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#e53935] font-bold">
                            Tahap: {report.currentStage || 'Perbaikan Lapangan'}
                          </span>
                          <span className="text-[#e53935] font-bold">{report.progressPercent}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#e53935] to-[#f84a4a] rounded-full transition-all duration-500"
                            style={{ width: `${report.progressPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center text-[11px] text-gray-500 mt-0.5 font-medium">
                          <span className={report.progressPercent >= 25 ? 'text-[#e53935] font-bold' : ''}>Diajukan</span>
                          <span className={report.progressPercent >= 50 ? 'text-[#e53935] font-bold' : ''}>Diverifikasi</span>
                          <span className={report.progressPercent >= 75 ? 'text-[#e53935] font-bold' : ''}>Perbaikan</span>
                          <span className={report.progressPercent === 100 ? 'text-emerald-600 font-bold' : ''}>Selesai</span>
                        </div>
                      </div>
                    ) : (
                      /* Solved Notice Banner */
                      <div className="p-3 rounded-xl bg-gray-50 flex items-start gap-2.5 border border-gray-200/60">
                        <span className="material-symbols-outlined text-[18px] text-emerald-600 mt-0.5">
                          verified
                        </span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-900">
                            Pekerjaan Selesai oleh {report.opdFullName || report.opd}
                          </span>
                          <span className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                            {report.resolvedNote || 'Penanganan telah diselesaikan dan diverifikasi oleh tim pengawas lapangan.'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Footer */}
                    <div className="flex items-center justify-between pt-3 mt-3 bg-gray-50 -mx-4 -mb-4 px-4 py-2.5 rounded-b-2xl border-t border-gray-100">
                      {report.status === 'Selesai' ? (
                        <>
                          <button
                            onClick={() => setRatingTargetTicket(report)}
                            className="text-xs text-[#e53935] font-bold flex items-center gap-1 hover:underline"
                          >
                            <span className="material-symbols-outlined text-[16px] text-amber-500">
                              star
                            </span>
                            Beri Penilaian Warga
                          </button>
                          <button
                            onClick={() => onOpenBeritaAcara(report)}
                            className="text-xs font-semibold text-gray-600 flex items-center gap-0.5 hover:text-gray-900"
                          >
                            Lihat Berkas Berita Acara
                            <span className="material-symbols-outlined text-[16px]">
                              arrow_forward
                            </span>
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                            <span className="material-symbols-outlined text-[16px] text-[#e53935]">
                              schedule
                            </span>
                            Target: {report.targetDays}
                          </span>
                          <button
                            onClick={() => onSelectReport(report.id)}
                            className="text-xs font-bold text-[#e53935] flex items-center gap-0.5 hover:underline"
                          >
                            Detail Riwayat
                            <span className="material-symbols-outlined text-[16px]">
                              chevron_right
                            </span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Dedicated Button for Full Buat Pengaduan */}
              <button
                onClick={() => onNavigate('buat-pengaduan')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Buka Formulir Pengaduan Lengkap (Dikte Suara & GPS)</span>
              </button>
            </div>
          )}

          {/* TAB 2: FORMULIR PENGADUAN BARU */}
          {activeTab === 'laporBaru' && (
            <form
              onSubmit={handleSubmitForm}
              className="flex flex-col gap-4 w-full rounded-2xl bg-white p-4 shadow-xs border border-gray-200/70"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex flex-col">
                  <h2 className="text-base font-bold text-gray-900">Formulir Pengaduan Cepat</h2>
                  <span className="text-xs text-gray-500">
                    Kanal resmi Pemkot Surabaya yang terhubung langsung ke OPD
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-[#e53935]">
                  <span className="material-symbols-outlined text-[20px]">edit_note</span>
                </span>
              </div>

              {/* Field 1: Kategori */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  Kategori Pengaduan <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: 'Jalan & Saluran',
                      dinas: 'Dinas Sumber Daya Air dan Bina Marga',
                      icon: 'construction',
                    },
                    {
                      label: 'Penerangan Jalan',
                      dinas: 'Dinas Perhubungan',
                      icon: 'light',
                    },
                    {
                      label: 'Sampah & Lingkungan',
                      dinas: 'Dinas Lingkungan Hidup',
                      icon: 'delete_sweep',
                    },
                    {
                      label: 'Administrasi',
                      dinas: 'Dispendukcapil / Kelurahan',
                      icon: 'assignment',
                    },
                  ].map((kat) => (
                    <button
                      key={kat.label}
                      type="button"
                      onClick={() => handleKategoriSelect(kat.label, kat.dinas)}
                      className={`p-2.5 rounded-xl text-left flex items-center gap-2 transition-all active:scale-95 border ${
                        selectedKategori === kat.label
                          ? 'bg-red-50 border-[#e53935] font-bold text-[#e53935]'
                          : 'bg-gray-50 border-transparent text-gray-800'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#e53935] shadow-2xs">
                        <span className="material-symbols-outlined text-[18px]">{kat.icon}</span>
                      </span>
                      <span className="text-xs">{kat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Field 2: Topik & Instansi Terhubung */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  Topik dan Instansi <span className="text-red-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={topik}
                  onChange={(e) => setTopik(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-gray-50 text-gray-900 text-sm border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                />
                <div className="inline-flex items-center gap-1.5 text-[#e53935] bg-red-50 px-2.5 py-1 rounded-md text-xs font-semibold mt-0.5 border border-red-200 w-fit">
                  <span className="material-symbols-outlined text-[16px]">account_balance</span>
                  <span>Diteruskan ke: {targetDinas}</span>
                </div>
              </div>

              {/* Field 3: Detail Pengaduan */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    Detail Pengaduan <span className="text-red-500 font-bold">*</span>
                  </label>
                  <span className="text-[11px] font-medium text-gray-400">
                    {detail.length}/500
                  </span>
                </div>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  maxLength={500}
                  rows={4}
                  placeholder="Ceritakan kendala dengan jelas: patokan lokasi terdekat, waktu kejadian, dan dampak bagi warga sekitar..."
                  className="w-full p-3.5 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>

              {/* Field 4: Lokasi Kejadian (with GPS Pin) */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  Lokasi Kejadian <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#e53935]">
                      pin_drop
                    </span>
                    <input
                      type="text"
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      placeholder="Ketik jalan, RT/RW, atau kelurahan..."
                      className="w-full h-11 pl-9 pr-3 rounded-xl bg-gray-50 text-gray-900 text-sm placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleGpsPin}
                    className="h-11 px-3.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#e53935] text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-all border border-red-200"
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isGpsLoading ? 'animate-spin' : ''
                      }`}
                    >
                      my_location
                    </span>
                    <span>GPS Pin</span>
                  </button>
                </div>
                {gpsLocked && (
                  <div className="text-xs font-semibold text-[#e53935] flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    <span>Koordinat akurat terkunci: Sawahan, Kota Surabaya (-7.2798, 112.7231)</span>
                  </div>
                )}
              </div>

              {/* Field 5: Foto Pendukung */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    Foto Pendukung <span className="text-red-500 font-bold">*</span>
                  </label>
                  <span className="text-[11px] font-medium text-gray-400">
                    {photos.length}/3 Foto
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={handleAddPhoto}
                    className="h-24 rounded-xl bg-gray-50 border-2 border-dashed border-red-300 flex flex-col items-center justify-center gap-1 text-gray-600 hover:bg-red-50/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-[#e53935] group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                    </div>
                    <span className="text-[11px] font-bold text-[#e53935]">Ambil/Unggah</span>
                  </button>

                  {photos.map((photoUrl, idx) => (
                    <div
                      key={idx}
                      className="relative h-24 rounded-xl overflow-hidden bg-gray-100 group border border-gray-200"
                    >
                      <img src={photoUrl} alt={`Bukti ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(idx)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center active:scale-90"
                      >
                        <span className="material-symbols-outlined text-[13px]">close</span>
                      </button>
                      <div className="absolute bottom-1 left-1 px-1.5 py-0.2 rounded bg-black/60 text-white text-[10px] font-bold">
                        Foto {idx + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delegated RT/RW Checkbox Section */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col gap-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAssisted}
                    onChange={(e) => setIsAssisted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-[#e53935] focus:ring-0 accent-[#e53935]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900">
                      Saya dibantu RT/RW atau petugas kelurahan
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                      Centang jika permohonan ini difasilitasi aparatur lingkungan untuk warga lanjut usia atau disabilitas.
                    </span>
                  </div>
                </label>

                {isAssisted && (
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-200">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-800 font-semibold">
                        NIK Warga yang Dibantu *
                      </label>
                      <input
                        type="text"
                        value={assistedNik}
                        onChange={(e) => setAssistedNik(e.target.value)}
                        placeholder="16 digit NIK KTP Surabaya"
                        className="w-full h-10 px-3 rounded-lg bg-white text-gray-900 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-800 font-semibold">
                        Nama Petugas Pendamping *
                      </label>
                      <input
                        type="text"
                        value={assistedCompanion}
                        onChange={(e) => setAssistedCompanion(e.target.value)}
                        placeholder="Contoh: Pak Bambang (Ketua RT 04)"
                        className="w-full h-10 px-3 rounded-lg bg-white text-gray-900 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Privacy Checkbox */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex flex-col gap-1">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-[#e53935] focus:ring-0 accent-[#e53935]"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      Rahasiakan identitas saya dari OPD
                      <span className="material-symbols-outlined text-[15px] text-[#e53935]">lock</span>
                    </span>
                    <span className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                      Lapor Anonim/Rahasia: Nama dan NIK Anda hanya dapat diverifikasi oleh inspektorat pusat.
                    </span>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('laporanSaya')}
                  className="flex-1 h-11 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-[2] h-11 rounded-xl bg-[#e53935] hover:bg-[#d32f2f] text-white text-xs font-bold shadow-md shadow-red-500/25 transition-all active:scale-98 flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  Kirim Pengaduan
                </button>
              </div>
            </form>
          )}

          {/* Civic Integrity Hotline Note */}
          <div className="rounded-2xl bg-white p-4 flex items-start gap-3 shadow-xs border border-gray-200/60">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#e53935] shrink-0 border border-red-100">
              <span className="material-symbols-outlined text-[22px]">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900">Pusat Bantuan & Pengawasan</span>
              <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                Hotline Layanan Pengaduan Integritas: <span className="font-bold text-[#e53935]">0811-3115-7777</span>, atau datang ke kelurahan terdekat.
              </p>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-24 left-4 right-4 z-50 p-3.5 rounded-xl bg-gray-900 text-white shadow-2xl flex items-center gap-3 border border-white/10 animate-in fade-in duration-200 max-w-md mx-auto">
            <span className="material-symbols-outlined text-emerald-400 text-[24px]">task_alt</span>
            <div className="flex flex-col flex-1">
              <span className="text-xs font-bold">Laporan Berhasil Terkirim!</span>
              <span className="text-[11px] text-gray-300">{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Rating Modal for Completed Ticket */}
        {ratingTargetTicket && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">star</span>
              </div>
              <h3 className="font-extrabold text-base text-gray-900">Penilaian Kinerja Warga</h3>
              <p className="text-xs text-gray-500">
                Bagaimana kualitas pekerjaan {ratingTargetTicket.opd} pada {ratingTargetTicket.title}?
              </p>

              <div className="flex items-center gap-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    className="p-1 active:scale-125 transition-transform"
                  >
                    <span
                      className={`material-symbols-outlined text-[32px] ${
                        star <= userRating ? 'text-amber-400' : 'text-gray-300'
                      }`}
                      style={{ fontVariationSettings: star <= userRating ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      star
                    </span>
                  </button>
                ))}
              </div>

              <span className="text-xs font-bold text-[#e53935]">
                {userRating === 5 && 'Luar Biasa Cepat (5/5)'}
                {userRating === 4 && 'Sangat Baik & Tanggap (4/5)'}
                {userRating === 3 && 'Cukup Baik (3/5)'}
                {userRating === 2 && 'Kurang Memuaskan (2/5)'}
                {userRating === 1 && 'Perlu Peningkatan Serius (1/5)'}
              </span>

              <button
                type="button"
                onClick={() => {
                  alert(`Terima kasih! Penilaian bintang ${userRating} Anda telah dicatat dalam indeks kepuasan publik.`);
                  setRatingTargetTicket(null);
                }}
                className="w-full py-3 rounded-xl bg-[#e53935] text-white font-bold text-xs mt-2"
              >
                Kirim Penilaian
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
