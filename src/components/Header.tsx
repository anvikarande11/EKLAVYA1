import React from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption, StudentMockProfile } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { Globe, Eye, ArrowLeft, BookOpen, User } from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface HeaderProps {
  currentLanguage: LanguageOption;
  onLanguageChange: (lang: LanguageOption) => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
  fontScale: 'normal' | 'large' | 'xlarge';
  onChangeFontScale: (scale: 'normal' | 'large' | 'xlarge') => void;
  canGoBack: boolean;
  onGoBack: () => void;
  onOpenStories: () => void;
  profile: StudentMockProfile;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  highContrast,
  onToggleHighContrast,
  fontScale,
  onChangeFontScale,
  canGoBack,
  onGoBack,
  onOpenStories,
  profile,
  onOpenProfile,
  onOpenAuth
}) => {
  const t = getTranslation(currentLanguage.code);

  return (
    <header className="sticky top-0 z-40 bg-[#235E4B] text-white shadow-md border-b-2 border-[#EA580C]">
      {/* Mobile Top Status / Utility Bar */}
      <div className="bg-[#1A4739] px-3 py-1 flex items-center justify-between text-[11px] border-b border-[#143B2E]">
        <div className="flex items-center space-x-1.5 truncate">
          {canGoBack ? (
            <button
              onClick={onGoBack}
              className="flex items-center space-x-1 px-2 py-0.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[11px] transition-all"
              title={t.backToHome}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{t.back}</span>
            </button>
          ) : (
            <span className="text-amber-200 font-bold uppercase tracking-wider text-[10px]">
              National Tribal Scholar Portal
            </span>
          )}
        </div>

        {/* Right utilities: Stories button + Profile button + Contrast + Font Size */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Stories Button */}
          <button
            onClick={onOpenStories}
            className="flex items-center space-x-1 px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-[10px] font-bold transition-all"
            title="View Tribal Culture & Story Slider"
          >
            <BookOpen className="w-3 h-3 text-amber-400" />
            <span className="hidden xs:inline">{t.cultureStory}</span>
          </button>

          {/* User Account / Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1 px-2 py-0.5 bg-[#EA580C]/30 hover:bg-[#EA580C]/50 text-white border border-[#EA580C]/60 text-[10px] font-bold transition-all"
            title="View Scholar Profile"
          >
            <User className="w-3 h-3 text-amber-300" />
            <span className="max-w-[70px] truncate">{profile.name.split(' ')[0]}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </button>

          {/* Text scale toggle */}
          <div className="flex items-center bg-[#143B2E] px-1 py-0.5 border border-[#103025]">
            <button
              onClick={() => onChangeFontScale(fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'xlarge' : 'normal')}
              className="px-1 text-[10px] font-bold text-amber-300 hover:text-white"
              title="Change Text Size"
            >
              {fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-1 flex items-center transition-colors ${
              highContrast ? 'bg-amber-400 text-stone-950 font-bold' : 'text-emerald-200 hover:text-white'
            }`}
            title="High Contrast"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Mobile App Bar */}
      <div className="px-3.5 py-2 flex items-center justify-between">
        {/* App Title & Motif */}
        <div className="flex items-center space-x-2.5">
          <div 
            onClick={onGoBack}
            className="w-8 h-8 bg-gradient-to-tr from-[#EA580C] to-[#D97706] p-0.5 shadow flex items-center justify-center shrink-0 cursor-pointer border border-amber-300/40"
          >
            <span className="text-white font-bold text-sm">🏹</span>
          </div>

          <div onClick={onGoBack} className="cursor-pointer">
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-lg tracking-tight text-amber-100 font-serif leading-none">
                EKLAVYA
              </h1>
              <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-100 px-1.5 py-0.2 bg-[#1A4739] border border-emerald-600/50">
                SCHOLAR
              </span>
            </div>
            <p className="text-[10px] text-emerald-100/90 leading-tight truncate max-w-[170px] sm:max-w-none mt-0.5">
              {t.unifiedPortal}
            </p>
          </div>
        </div>

        {/* Right: Language Pill Dropdown & Sign In trigger */}
        <div className="flex items-center space-x-1.5">
          {/* Language Selector Dropdown Pill */}
          <div className="relative group">
            <div className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow transition-all cursor-pointer border border-amber-300/40">
              <Globe className="w-3 h-3 text-amber-200" />
              <span className="text-[11px]">{currentLanguage.flagOrIcon} {currentLanguage.nativeName}</span>
              <span className="text-[9px] text-amber-200">▼</span>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-1 w-64 bg-white text-stone-900 shadow-2xl border-2 border-[#235E4B] py-1.5 hidden group-hover:block hover:block z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                <span>{t.selectDialect}</span>
                <span className="text-[#EA580C]">12 Languages</span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang)}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-amber-50 text-xs transition-colors border-b border-stone-50 last:border-b-0 ${
                      currentLanguage.code === lang.code ? 'bg-amber-100/70 font-bold text-amber-950 border-l-4 border-[#EA580C]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{lang.flagOrIcon}</span>
                      <div>
                        <p className="font-semibold text-stone-900 text-xs">{lang.nativeName}</p>
                        <p className="text-[9px] text-stone-500">{lang.name} • {lang.script}</p>
                      </div>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <span className="text-emerald-700 font-bold text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Geometric Warli Border Accent */}
      <WarliPattern variant="border" color="#F59E0B" className="opacity-80" />
    </header>
  );
};
