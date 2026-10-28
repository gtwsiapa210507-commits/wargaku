import React, { useState } from 'react';

export type SortOption =
  | 'latest'
  | 'oldest'
  | 'status-process'
  | 'status-completed'
  | 'upvotes';

interface ReportFilterBarProps {
  selectedStatus: string;
  onChangeStatus: (status: string) => void;
  selectedOpd: string;
  onChangeOpd: (opd: string) => void;
  availableOpds: string[];
  searchQuery: string;
  onChangeSearch: (query: string) => void;
  sortBy: SortOption;
  onChangeSortBy: (sort: SortOption) => void;
  statusCounts: {
    all: number;
    sedangDiproses: number;
    selesai: number;
    diverifikasi: number;
  };
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const ReportFilterBar: React.FC<ReportFilterBarProps> = ({
  selectedStatus,
  onChangeStatus,
  selectedOpd,
  onChangeOpd,
  availableOpds,
  searchQuery,
  onChangeSearch,
  sortBy,
  onChangeSortBy,
  statusCounts,
  totalCount,
  filteredCount,
  onResetFilters,
  hasActiveFilters,
}) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2.5 w-full bg-white rounded-2xl p-3.5 shadow-xs border border-gray-200/70">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <span className="material-symbols-outlined absolute left-3 text-[18px] text-gray-400">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onChangeSearch(e.target.value)}
          placeholder="Cari no. tiket, jalan, topik atau instansi..."
          className="w-full h-10 pl-9.5 pr-8 rounded-xl bg-gray-50 text-gray-900 text-xs placeholder:text-gray-400 border border-gray-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e53935]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onChangeSearch('')}
            className="absolute right-2.5 w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-gray-300"
            aria-label="Hapus pencarian"
          >
            <span className="material-symbols-outlined text-[13px]">close</span>
          </button>
        )}
      </div>

      {/* Quick Status Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        <button
          type="button"
          onClick={() => onChangeStatus('all')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'all'
              ? 'bg-[#e53935] text-white shadow-xs font-bold'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span>Semua Status</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              selectedStatus === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {statusCounts.all}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChangeStatus('Sedang diproses')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'Sedang diproses'
              ? 'bg-amber-500 text-white shadow-xs font-bold'
              : 'bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              selectedStatus === 'Sedang diproses' ? 'bg-white' : 'bg-amber-600'
            } animate-pulse`}
          ></span>
          <span>Sedang Diproses</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              selectedStatus === 'Sedang diproses'
                ? 'bg-white/25 text-white'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {statusCounts.sedangDiproses}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onChangeStatus('Selesai')}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedStatus === 'Selesai'
              ? 'bg-emerald-600 text-white shadow-xs font-bold'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 hover:bg-emerald-100'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">check_circle</span>
          <span>Selesai</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              selectedStatus === 'Selesai'
                ? 'bg-white/25 text-white'
                : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            {statusCounts.selesai}
          </span>
        </button>
      </div>

      {/* OPD & Sorting Controls Bar */}
      <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
        {/* OPD Filter Dropdown */}
        <div className="flex-1 relative">
          <label className="sr-only" htmlFor="filter-opd">
            Pilih OPD
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[16px] text-[#e53935] pointer-events-none">
              account_balance
            </span>
            <select
              id="filter-opd"
              value={selectedOpd}
              onChange={(e) => onChangeOpd(e.target.value)}
              className="w-full h-9 pl-8 pr-7 rounded-xl bg-gray-50 text-gray-800 text-xs font-semibold border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-[#e53935] cursor-pointer"
            >
              <option value="all">Semua Dinas (OPD)</option>
              {availableOpds.map((opd) => (
                <option key={opd} value={opd}>
                  {opd}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-2 text-[18px] text-gray-400 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Sort Filter Dropdown */}
        <div className="flex-1 relative">
          <label className="sr-only" htmlFor="sort-reports">
            Urutkan
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-2.5 text-[16px] text-gray-500 pointer-events-none">
              sort
            </span>
            <select
              id="sort-reports"
              value={sortBy}
              onChange={(e) => onChangeSortBy(e.target.value as SortOption)}
              className="w-full h-9 pl-8 pr-7 rounded-xl bg-gray-50 text-gray-800 text-xs font-semibold border border-gray-200 appearance-none focus:outline-none focus:ring-2 focus:ring-[#e53935] cursor-pointer"
            >
              <option value="latest">Urut: Terbaru</option>
              <option value="oldest">Urut: Terlama</option>
              <option value="status-process">Status: Proses Dahulu</option>
              <option value="status-completed">Status: Selesai Dahulu</option>
              <option value="upvotes">Dukungan Terbanyak</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 text-[18px] text-gray-400 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>

        {/* Quick Clear Filter Button if active */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            title="Reset semua filter"
            className="h-9 px-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#e53935] text-xs font-bold flex items-center gap-1 shrink-0 transition-colors border border-red-200"
          >
            <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Active Filter Indicators / Summary */}
      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-0.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-medium">
            Menampilkan <strong className="text-gray-900">{filteredCount}</strong> dari {totalCount} laporan
          </span>
          {hasActiveFilters && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 text-[#e53935] font-semibold text-[10px] border border-red-200">
              Filter aktif
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[#e53935] hover:underline font-bold text-[11px] shrink-0"
          >
            Hapus Filter
          </button>
        )}
      </div>
    </div>
  );
};
