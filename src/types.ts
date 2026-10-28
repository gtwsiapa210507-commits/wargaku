export type ScreenType = 
  | 'layanan' 
  | 'pengaduan' 
  | 'peta' 
  | 'detail-pengaduan' 
  | 'buat-pengaduan' 
  | 'login' 
  | 'agenda'
  | 'berkas';

export interface ReportItem {
  id: string;
  ticketNumber: string;
  opd: string;
  opdFullName: string;
  date: string;
  title: string;
  status: 'Sedang diproses' | 'Selesai' | 'Diverifikasi' | 'Diajukan';
  statusColor: 'amber' | 'emerald' | 'blue' | 'gray';
  location: string;
  imageUrl?: string;
  imageAlt?: string;
  progressPercent: number;
  currentStage: 'Diajukan' | 'Diverifikasi' | 'Perbaikan' | 'Selesai';
  targetDays: string;
  description?: string;
  resolvedNote?: string;
  resolvedAt?: string;
  rating?: number;
  ratingFeedback?: string;
  isAssisted?: boolean;
  assistedNIK?: string;
  assistedCompanion?: string;
  isAnonymous?: boolean;
  upvotes?: number;
  userSupported?: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface OPDUpdate {
  id: string;
  author: string;
  role: string;
  timestamp: string;
  badge: 'Konstruksi' | 'Survei' | 'Selesai' | 'Verifikasi';
  description: string;
  images?: Array<{ url: string; label: string; alt: string }>;
}

export interface ChatMessage {
  id: string;
  sender: 'opd' | 'user';
  senderName: string;
  senderRole?: string;
  time: string;
  text: string;
}

export interface PublicPin {
  id: string;
  title: string;
  district: string;
  category: 'infrastruktur' | 'kebersihan' | 'pju' | 'air';
  status: string;
  xPercent: number;
  yPercent: number;
  description: string;
  icon: string;
}

export interface CityService {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: 'pengaduan' | 'perizinan';
  badge?: string;
  actionUrl?: string;
}
