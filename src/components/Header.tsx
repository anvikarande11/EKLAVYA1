import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption, StudentMockProfile } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { Globe, Eye, ArrowLeft, BookOpen, User, ChevronDown } from 'lucide-react';
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
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#1E4D3C] text-white shadow-sm border-b border-[#C25927]/40">
      {/* Top Utility Bar */}
      <div className="bg-[#163D2F] px-3.5 py-1.5 flex items-center justify-between text-[11px] border-b border-white/5">
        <div className="flex items-center space-x-1.5 truncate">
          {canGoBack ? (
            <button
              onClick={onGoBack}
              className="flex items-center space-x-1 px-2.5 py-0.5 bg-[#C25927] hover:bg-[#A94A1E] text-white font-medium text-[11px] rounded-md transition-colors"
              title={t.backToHome}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{t.back}</span>
            </button>
          ) : (
            <span className="text-amber-200/90 font-semibold tracking-wide text-[10px]">
              National Tribal Scholar Portal
            </span>
          )}
        </div>

        {/* Right utilities: Stories button + Profile button + Contrast + Font Size */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Stories Button */}
          <button
            onClick={onOpenStories}
            className="flex items-center space-x-1 px-2 py-0.5 bg-amber-400/15 hover:bg-amber-400/25 text-amber-200 border border-amber-300/30 text-[10px] font-medium rounded-md transition-colors"
            title="View Tribal Culture & Story Slider"
          >
            <BookOpen className="w-3 h-3 text-amber-300" />
            <span className="hidden xs:inline">{t.cultureStory}</span>
          </button>

          {/* User Account / Profile Button */}
          <button
            onClick={onOpenProfile}
            className="flex items-center space-x-1 px-2.5 py-0.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 text-[10px] font-medium rounded-md transition-colors"
            title="View Scholar Profile"
          >
            <User className="w-3 h-3 text-amber-300" />
            <span className="max-w-[70px] truncate">{profile.name.split(' ')[0]}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </button>

          {/* Text scale toggle */}
          <div className="flex items-center bg-black/20 px-1.5 py-0.5 rounded-md border border-white/10">
            <button
              onClick={() => onChangeFontScale(fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'xlarge' : 'normal')}
              className="px-1 text-[10px] font-bold text-amber-200 hover:text-white"
              title="Change Text Size"
            >
              {fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-1 rounded-md transition-colors ${
              highContrast ? 'bg-amber-400 text-stone-950 font-bold' : 'text-emerald-200 hover:text-white'
            }`}
            title="High Contrast"
          >
            <Eye className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main App Bar */}
      <div className="px-3.5 py-2.5 flex items-center justify-between">
        {/* App Title & Motif */}
        <div className="flex items-center space-x-2.5">
          <div 
            onClick={onGoBack}
            className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C25927] to-[#D97706] p-0.5 shadow-sm flex items-center justify-center shrink-0 cursor-pointer"
          >
            <span className="text-white font-bold text-sm">🏹</span>
          </div>

          <div onClick={onGoBack} className="cursor-pointer">
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-lg tracking-tight text-amber-50 font-serif leading-none">
                EKLAVYA
              </h1>
              <span className="text-[9px] uppercase font-semibold tracking-wider text-emerald-100 px-1.5 py-0.5 bg-white/10 rounded border border-white/10">
                SCHOLAR
              </span>
            </div>
            <p className="text-[10px] text-emerald-100/80 leading-tight truncate max-w-[170px] sm:max-w-none mt-0.5">
              {t.unifiedPortal}
            </p>
          </div>
        </div>

        {/* Right: Working Interactive Click-Toggle Language Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#C25927] hover:bg-[#A94A1E] text-white font-semibold text-xs rounded-lg shadow-sm transition-all active:scale-95 border border-amber-300/30"
          >
            <Globe className="w-3.5 h-3.5 text-amber-200" />
            <span className="text-[11px]">{currentLanguage.flagOrIcon} {currentLanguage.nativeName}</span>
            <ChevronDown className={`w-3 h-3 text-amber-200 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Outside click backdrop */}
          {isLanguageOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsLanguageOpen(false)} 
            />
          )}

          {/* Dropdown Menu */}
          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-stone-900 rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in-50 zoom-in-95">
              <div className="px-3.5 py-2 text-[10px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100 flex items-center justify-between">
                <span>{t.selectDialect}</span>
                <span className="text-[#C25927] font-semibold">12 Available</span>
              </div>
              <div className="max-h-72 overflow-y-auto py-1">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between hover:bg-stone-50 text-xs transition-colors border-b border-stone-50 last:border-b-0 ${
                      currentLanguage.code === lang.code ? 'bg-amber-50/70 font-bold text-amber-950 border-l-4 border-[#C25927]' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base">{lang.flagOrIcon}</span>
                      <div>
                        <p className="font-semibold text-stone-900 text-xs">{lang.nativeName}</p>
                        <p className="text-[10px] text-stone-500">{lang.name} • {lang.script}</p>
                      </div>
                    </div>
                    {currentLanguage.code === lang.code && (
                      <span className="text-emerald-700 font-bold text-xs">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Geometric Warli Border Accent */}
      <WarliPattern variant="border" color="#F59E0B" className="opacity-70" />
    </header>
  );
};
