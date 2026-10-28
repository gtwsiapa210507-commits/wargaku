import React, { useState } from 'react';
import { ScreenType, ReportItem, CityService, ChatMessage } from './types';
import {
  INITIAL_SERVICES,
  INITIAL_REPORTS,
  INITIAL_OPD_UPDATES,
  INITIAL_CHAT,
} from './data/mockData';
import { BottomNav } from './components/BottomNav';
import { EmergencyModal } from './components/EmergencyModal';
import { NotificationModal } from './components/NotificationModal';
import { OfficialDocumentModal } from './components/OfficialDocumentModal';
import { ServiceModal } from './components/ServiceModal';
import { LayananPortalScreen } from './screens/LayananPortalScreen';
import { PengaduanWargaScreen } from './screens/PengaduanWargaScreen';
import { BuatPengaduanScreen } from './screens/BuatPengaduanScreen';
import { DetailPengaduanScreen } from './screens/DetailPengaduanScreen';
import { PetaPublikScreen } from './screens/PetaPublikScreen';
import { LoginScreen } from './screens/LoginScreen';
import { AgendaScreen } from './screens/AgendaScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('layanan');
  const [services] = useState<CityService[]>(INITIAL_SERVICES);
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [selectedReportId, setSelectedReportId] = useState<string>('rep-64436');
  const [opdUpdates] = useState(INITIAL_OPD_UPDATES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT);

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Budi Santoso');

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedBeritaAcara, setSelectedBeritaAcara] = useState<ReportItem | null>(null);
  const [activeModalService, setActiveModalService] = useState<CityService | null>(null);

  // Active report for detail screen
  const currentReport =
    reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleSelectReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentScreen('detail-pengaduan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `user-msg-${Date.now()}`,
      sender: 'user',
      senderName: userName || 'Anda (Pelapor)',
      time: 'Baru saja',
      text,
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Simulate instant municipal response
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: `opd-reply-${Date.now()}`,
        sender: 'opd',
        senderName: 'Admin SDABM',
        senderRole: 'Pusat Kendali Pengaduan',
        time: 'Baru saja',
        text: 'Konfirmasi pesan Anda telah kami teruskan ke mandor pelaksana di lapangan. Terima kasih atas kerja samanya.',
      };
      setChatMessages((prev) => [...prev, autoReply]);
    }, 1500);
  };

  const handleAddNewReport = (newReportData: Partial<ReportItem>) => {
    const createdReport: ReportItem = {
      id: `rep-${Date.now()}`,
      ticketNumber: newReportData.ticketNumber || `#${Math.floor(64000 + Math.random() * 999)}/MC/X/2026`,
      opd: newReportData.opd || 'Dinas SDABM',
      opdFullName: newReportData.opdFullName || 'Dinas Sumber Daya Air & Bina Marga',
      date: newReportData.date || 'Hari ini · Baru saja',
      title: newReportData.title || 'Laporan Pengaduan Baru',
      status: 'Sedang diproses',
      statusColor: 'amber',
      location: newReportData.location || 'Kota Surabaya',
      imageUrl: newReportData.imageUrl,
      imageAlt: newReportData.title,
      progressPercent: 25,
      currentStage: 'Diajukan',
      targetDays: '3 Hari Kerja',
      description: newReportData.description,
      coordinates: newReportData.coordinates || { lat: -7.2798, lng: 112.7231 },
      isAssisted: newReportData.isAssisted,
      assistedNIK: newReportData.assistedNIK,
      assistedCompanion: newReportData.assistedCompanion,
      isAnonymous: newReportData.isAnonymous,
      upvotes: 1,
      userSupported: true,
    };

    setReports([createdReport, ...reports]);
    setSelectedReportId(createdReport.id);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f8] flex flex-col items-center">
      {/* Mobile Frame Container: Maximum width 448px (max-w-md) for native app experience */}
      <div className="w-full max-w-md min-h-screen bg-[#fcf9f8] shadow-2xl relative flex flex-col overflow-x-hidden">
        {/* Active Screen Rendering */}
        {currentScreen === 'layanan' && (
          <LayananPortalScreen
            services={services}
            onOpenService={(srv) => setActiveModalService(srv)}
            onNavigate={(screen) => setCurrentScreen(screen)}
            isLoggedIn={isLoggedIn}
            userName={userName}
          />
        )}

        {currentScreen === 'pengaduan' && (
          <PengaduanWargaScreen
            reports={reports}
            onSelectReport={handleSelectReport}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenNotifications={() => setIsNotificationOpen(true)}
            onOpenBeritaAcara={(ticket) => setSelectedBeritaAcara(ticket)}
            onSubmitNewReport={handleAddNewReport}
          />
        )}

        {currentScreen === 'buat-pengaduan' && (
          <BuatPengaduanScreen
            onBack={() => setCurrentScreen('pengaduan')}
            onSubmit={handleAddNewReport}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'detail-pengaduan' && currentReport && (
          <DetailPengaduanScreen
            report={currentReport}
            opdUpdates={opdUpdates}
            chatMessages={chatMessages}
            onBack={() => setCurrentScreen('pengaduan')}
            onSendMessage={handleSendMessage}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'peta' && (
          <PetaPublikScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenNotifications={() => setIsNotificationOpen(true)}
            reportCount={reports.length}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={(name) => {
              setIsLoggedIn(true);
              setUserName(name);
            }}
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'agenda' && (
          <AgendaScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenNotifications={() => setIsNotificationOpen(true)}
          />
        )}

        {/* Global Bottom Navigation (Visible on main navigation screens) */}
        {currentScreen !== 'buat-pengaduan' && currentScreen !== 'detail-pengaduan' && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onEmergencyClick={() => setIsEmergencyOpen(true)}
          />
        )}

        {/* Modals & Dialogs */}
        <EmergencyModal
          isOpen={isEmergencyOpen}
          onClose={() => setIsEmergencyOpen(false)}
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          onSelectTicket={handleSelectReport}
        />

        <OfficialDocumentModal
          isOpen={!!selectedBeritaAcara}
          onClose={() => setSelectedBeritaAcara(null)}
          reportTitle={selectedBeritaAcara?.title}
          ticketId={selectedBeritaAcara?.ticketNumber}
        />

        <ServiceModal
          service={activeModalService}
          onClose={() => setActiveModalService(null)}
          onOpenPengaduan={() => setCurrentScreen('pengaduan')}
        />
      </div>
    </div>
  );
}
