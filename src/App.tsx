import React, { useState, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption, StudentMockProfile, DEMO_STUDENT } from './data/motaKnowledge.ts';
import { getTranslation } from './data/translations.ts';
import { Header } from './components/Header.tsx';
import { BottomNav, NavTab } from './components/BottomNav.tsx';
import { UnifiedDashboard } from './components/UnifiedDashboard.tsx';
import { JagoBotChat } from './components/JagoBotChat.tsx';
import { DigiLockerWallet } from './components/DigiLockerWallet.tsx';
import { SchemesExplorer } from './components/SchemesExplorer.tsx';
import { ToolsRedressal } from './components/ToolsRedressal.tsx';
import { TribalIntroSplash } from './components/TribalIntroSplash.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { ProfileModal } from './components/ProfileModal.tsx';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [showIntroSplash, setShowIntroSplash] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[1]); // Default to Hindi (हिन्दी)
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Authenticated Scholar Profile State with Local Storage persistence
  const [userProfile, setUserProfile] = useState<StudentMockProfile>(() => {
    try {
      const saved = localStorage.getItem('eklavya_scholar_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return DEMO_STUDENT;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const t = getTranslation(currentLanguage.code);

  const handleNavigateToChat = (query?: string) => {
    setChatInitialQuery(query);
    setActiveTab('chat');
  };

  const handleGoBackToDashboard = () => {
    setActiveTab('dashboard');
    setChatInitialQuery(undefined);
  };

  const handleUpdateProfile = (newProfile: StudentMockProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem('eklavya_scholar_profile', JSON.stringify(newProfile));
    } catch (e) {
      // ignore
    }
  };

  // Font scale class
  const getFontScaleClass = () => {
    switch (fontScale) {
      case 'large':
        return 'text-[108%] leading-relaxed';
      case 'xlarge':
        return 'text-[120%] leading-loose';
      default:
        return 'text-[100%]';
    }
  };

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'chat':
        return t.jagoBot;
      case 'wallet':
        return t.wallet;
      case 'schemes':
        return t.schemes;
      case 'tools':
        return t.tools;
      default:
        return t.home;
    }
  };

  return (
    <div className={`min-h-screen bg-[#1D4F40] flex justify-center items-center py-0 sm:py-3 transition-colors ${getFontScaleClass()}`}>
      
      {/* 5-Second Tribal Art Intro / Welcome Splash Slider */}
      {showIntroSplash && (
        <TribalIntroSplash
          currentLanguage={currentLanguage}
          onFinish={() => setShowIntroSplash(false)}
        />
      )}

      {/* APK Mobile Device Container */}
      <div 
        className={`w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-[#FAF7F2] text-stone-900 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.5)] border-x-0 sm:border-x-4 border-[#143B2E] overflow-hidden relative ${
          highContrast ? 'contrast-125' : ''
        }`}
      >
        {/* Top Header Bar */}
        <Header
          currentLanguage={currentLanguage}
          onLanguageChange={(lang) => setCurrentLanguage(lang)}
          highContrast={highContrast}
          onToggleHighContrast={() => setHighContrast(!highContrast)}
          fontScale={fontScale}
          onChangeFontScale={(scale) => setFontScale(scale)}
          canGoBack={activeTab !== 'dashboard'}
          onGoBack={handleGoBackToDashboard}
          onOpenStories={() => setShowIntroSplash(true)}
          profile={userProfile}
          onOpenProfile={() => setIsProfileModalOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />

        {/* Main APK Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto px-3 py-2.5 pb-20 relative bg-[#FAF7F2]">
          
          {/* Subpage Breadcrumb Navigation when navigated away from Dashboard */}
          {activeTab !== 'dashboard' && (
            <div className="mb-2.5 flex items-center justify-between animate-in fade-in">
              <button
                onClick={handleGoBackToDashboard}
                className="inline-flex items-center space-x-1 px-2.5 py-1 bg-white hover:bg-stone-100 text-[#235E4B] font-bold text-xs border border-stone-300 shadow-xs transition-all active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#EA580C]" />
                <span>{t.backToHome}</span>
              </button>
              <div className="flex items-center space-x-1 text-[11px] text-stone-500 font-medium">
                <span className="cursor-pointer hover:underline" onClick={handleGoBackToDashboard}>{t.home}</span>
                <span>/</span>
                <span className="font-bold text-[#235E4B]">{getTabTitle(activeTab)}</span>
              </div>
            </div>
          )}

          {/* Tab Screen Routing */}
          {activeTab === 'dashboard' && (
            <UnifiedDashboard
              currentLanguage={currentLanguage}
              profile={userProfile}
              onNavigateToChat={handleNavigateToChat}
              onNavigateToWallet={() => setActiveTab('wallet')}
              onNavigateToEligibility={() => setActiveTab('tools')}
              onNavigateToSchemes={() => setActiveTab('schemes')}
              onOpenStories={() => setShowIntroSplash(true)}
              onOpenProfile={() => setIsProfileModalOpen(true)}
              onOpenAuth={() => setIsAuthModalOpen(true)}
            />
          )}

          {activeTab === 'chat' && (
            <JagoBotChat
              currentLanguage={currentLanguage}
              profile={userProfile}
              onLanguageChange={(lang) => setCurrentLanguage(lang)}
              initialQuery={chatInitialQuery}
              onNavigateToEligibility={() => setActiveTab('tools')}
              onNavigateToWallet={() => setActiveTab('wallet')}
              onGoBack={handleGoBackToDashboard}
            />
          )}

          {activeTab === 'wallet' && (
            <DigiLockerWallet 
              onApplyInstant={() => setActiveTab('dashboard')} 
              langCode={currentLanguage.code}
              onGoBack={handleGoBackToDashboard}
            />
          )}

          {activeTab === 'schemes' && (
            <SchemesExplorer
              onAskJago={handleNavigateToChat}
              onCheckEligibility={() => setActiveTab('tools')}
              langCode={currentLanguage.code}
              onGoBack={handleGoBackToDashboard}
            />
          )}

          {activeTab === 'tools' && (
            <ToolsRedressal 
              onAskJago={handleNavigateToChat} 
              langCode={currentLanguage.code}
              onGoBack={handleGoBackToDashboard}
            />
          )}
        </main>

        {/* Persistent APK Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab !== 'chat') setChatInitialQuery(undefined);
          }}
          langCode={currentLanguage.code}
          unreadChatBadge={false}
        />
      </div>

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleUpdateProfile}
        currentProfile={userProfile}
        langCode={currentLanguage.code}
      />

      {/* Profile Details Sheet */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        langCode={currentLanguage.code}
      />
    </div>
  );
}
