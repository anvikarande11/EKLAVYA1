import React, { useState } from 'react';
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
  // Check if user has an existing saved profile in localStorage
  const savedProfileString = typeof window !== 'undefined' ? localStorage.getItem('eklavya_scholar_profile') : null;
  const isNewVisitor = !savedProfileString;

  // New visitors immediately see the centered Sign Up / Login modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(isNewVisitor);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showIntroSplash, setShowIntroSplash] = useState(false);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');

  // Primary initial language is English (SUPPORTED_LANGUAGES[0])
  const [currentLanguage, setCurrentLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [chatInitialQuery, setChatInitialQuery] = useState<string | undefined>(undefined);

  // Authenticated Scholar Profile State with Local Storage persistence
  const [userProfile, setUserProfile] = useState<StudentMockProfile>(() => {
    try {
      if (savedProfileString) return JSON.parse(savedProfileString);
    } catch (e) {
      // fallback
    }
    return DEMO_STUDENT;
  });

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
    <div className={`min-h-screen bg-[#18392E] flex justify-center items-center py-0 sm:py-4 transition-colors ${getFontScaleClass()}`}>
      
      {/* Tribal Art Stories Modal (triggered on demand via header or dashboard) */}
      {showIntroSplash && (
        <TribalIntroSplash
          currentLanguage={currentLanguage}
          onFinish={() => setShowIntroSplash(false)}
        />
      )}

      {/* Mobile Device Viewport Container - Soft & Professional */}
      <div 
        className={`w-full max-w-[430px] min-h-screen sm:min-h-[860px] sm:max-h-[920px] bg-[#FAF8F5] text-stone-900 flex flex-col shadow-2xl rounded-none sm:rounded-3xl border-0 sm:border border-stone-300/60 overflow-hidden relative ${
          highContrast ? 'contrast-125' : ''
        }`}
      >
        {/* Top Header Bar with Working Language Selector */}
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

        {/* Main Scrollable Content Viewport */}
        <main className="flex-1 overflow-y-auto px-3.5 py-3 pb-24 relative bg-[#FAF8F5]">
          
          {/* Subpage Breadcrumb Navigation when navigated away from Dashboard */}
          {activeTab !== 'dashboard' && (
            <div className="mb-3 flex items-center justify-between animate-in fade-in">
              <button
                onClick={handleGoBackToDashboard}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-stone-50 text-[#1E4D3C] font-semibold text-xs rounded-lg border border-stone-200 shadow-2xs transition-all active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#C25927]" />
                <span>{t.backToHome}</span>
              </button>
              <div className="flex items-center space-x-1.5 text-[11px] text-stone-500 font-medium">
                <span className="cursor-pointer hover:underline" onClick={handleGoBackToDashboard}>{t.home}</span>
                <span>/</span>
                <span className="font-semibold text-[#1E4D3C]">{getTabTitle(activeTab)}</span>
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

        {/* Persistent Bottom Navigation Bar */}
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

      {/* Login & Sign Up Modal - Appears in the center for new users */}
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
