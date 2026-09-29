import React, { useState } from 'react';
import { MOTA_SCHEMES, StudentMockProfile, SchemeDetail, LanguageOption } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, 
  Award, Sparkles, FileText, TrendingUp, RefreshCw,
  BookOpen, ChevronLeft, ChevronRight, User, Edit3
} from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface DashboardProps {
  currentLanguage: LanguageOption;
  profile: StudentMockProfile;
  onNavigateToChat: (initialQuery?: string) => void;
  onNavigateToWallet: () => void;
  onNavigateToEligibility: () => void;
  onNavigateToSchemes: () => void;
  onOpenStories: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
}

export const UnifiedDashboard: React.FC<DashboardProps> = ({
  currentLanguage,
  profile,
  onNavigateToChat,
  onNavigateToWallet,
  onNavigateToEligibility,
  onNavigateToSchemes,
  onOpenStories,
  onOpenProfile,
  onOpenAuth
}) => {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const t = getTranslation(currentLanguage.code);

  const photoStories = [
    {
      img: '/src/assets/images/i_can_dream_1790708636707.jpg',
      title: t.slide1Title,
      desc: t.slide1Desc,
      schemeId: 'pre-matric'
    },
    {
      img: '/src/assets/images/village_smile_1790708651184.jpg',
      title: t.slide2Title,
      desc: t.slide2Desc,
      schemeId: 'post-matric'
    },
    {
      img: '/src/assets/images/classroom_hands_1790708594872.jpg',
      title: t.slide3Title,
      desc: t.slide3Desc,
      schemeId: 'top-class'
    },
    {
      img: '/src/assets/images/reading_circle_1790708623379.jpg',
      title: t.slide4Title,
      desc: t.slide4Desc,
      schemeId: 'nfst'
    },
    {
      img: '/src/assets/images/chalkboard_girl_1790708612474.jpg',
      title: t.slide5Title,
      desc: t.slide5Desc,
      schemeId: 'nos'
    }
  ];

  // Helper for translated status styling (architectural crisp look, not generic pills)
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disbursed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-emerald-100 text-emerald-950 border border-emerald-400">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-800" />
            {t.statusDisbursed}
          </span>
        );
      case 'Sanctioned':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-400">
            <Award className="w-3 h-3 mr-1 text-[#C2410C]" />
            {t.statusSanctioned}
          </span>
        );
      case 'Under Verification':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-orange-100 text-orange-950 border border-orange-400 animate-pulse">
            <Clock className="w-3 h-3 mr-1 text-orange-700" />
            {t.statusUnderVerification}
          </span>
        );
      case 'Not Applied':
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-300">
            {t.statusNotApplied}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-rose-100 text-rose-900 border border-rose-400">
            <AlertTriangle className="w-3 h-3 mr-1 text-rose-700" />
            {t.statusActionRequired}
          </span>
        );
    }
  };

  // Determine personalized financial metrics based on student profile
  const isPreMatric = profile.educationLevel.toLowerCase().includes('class 9') || profile.educationLevel.toLowerCase().includes('class 10');
  const isPhD = profile.educationLevel.toLowerCase().includes('ph.d') || profile.educationLevel.toLowerCase().includes('research');
  
  const disbursedAmountDisplay = isPreMatric ? '₹7,000' : isPhD ? '₹48,000' : '₹61,000';
  const sanctionedAmountDisplay = isPreMatric ? '₹7,000' : isPhD ? '₹4,44,000' : '₹2,95,000';
  const stipendDisplay = isPhD ? '₹37,000/mo' : 'Eligible';

  return (
    <div className="space-y-4 pb-24 text-stone-900">
      
      {/* 1. Dignified Hero Card - Modern Lighter Forest Green Theme */}
      <div className="relative bg-[#235E4B] text-white p-4 border-2 border-[#EA580C] shadow-md">
        {/* Warli Pattern Accent */}
        <div className="absolute right-1 top-1 opacity-15 pointer-events-none">
          <WarliPattern variant="tree" color="#FBBF24" className="w-20 h-20" />
        </div>

        <div className="relative z-10 space-y-2">
          {/* Header strip in Hero Card */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="px-2 py-0.5 bg-[#EA580C] text-white text-[10px] font-bold uppercase tracking-wider">
                {t.welcomeScholar}
              </span>
              <button
                onClick={onOpenProfile}
                className="text-[10px] bg-[#1A4739] hover:bg-[#143B2E] text-amber-200 px-2 py-0.5 border border-emerald-500/40 font-bold flex items-center space-x-1 transition-all"
                title="View & Edit Profile"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>My Profile</span>
              </button>
            </div>
            <span className="text-[11px] font-mono text-amber-200">
              {t.stIdLabel}: <span className="font-bold">{profile.id}</span>
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-serif flex items-center space-x-2">
              <span>{profile.name}</span>
            </h2>
            <p className="text-xs text-emerald-100 mt-0.5">
              Tribe: <span className="font-bold text-amber-300">{profile.tribalCommunity}</span> • State: <span className="font-bold">{profile.state} ({profile.district})</span>
            </p>
            <p className="text-[11px] text-emerald-200/90 font-medium">
              {profile.educationLevel}
            </p>
          </div>

          {/* Quick Hero Action Triggers */}
          <div className="flex items-center space-x-2 pt-1">
            <button
              onClick={() => onNavigateToChat('How do I check my scholarship DBT payment status on PFMS?')}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow transition-all active:scale-98 border border-amber-300/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{t.askJagoBtn}</span>
            </button>
            <button
              onClick={onNavigateToWallet}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 bg-[#1A4739] hover:bg-[#143B2E] border border-emerald-400/50 text-emerald-100 font-semibold text-xs transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.digiVaultBtn}</span>
            </button>
          </div>
        </div>

        {/* Live DBT Monetary Ticker - Clean Tile Grid */}
        <div className="mt-3 pt-3 border-t border-emerald-600/60 grid grid-cols-2 gap-2 text-left">
          <div className="bg-[#1A4739] p-2 border border-emerald-600/80">
            <span className="text-[9px] text-emerald-200 uppercase tracking-wider block font-bold">{t.totalDisbursed}</span>
            <span className="text-base font-extrabold text-amber-300">{disbursedAmountDisplay}</span>
            <span className="text-[9px] text-emerald-300/70 block">Aadhaar PFMS Bridge</span>
          </div>

          <div className="bg-[#1A4739] p-2 border border-emerald-600/80">
            <span className="text-[9px] text-emerald-200 uppercase tracking-wider block font-bold">{t.sanctionedPending}</span>
            <span className="text-base font-extrabold text-white">{sanctionedAmountDisplay}</span>
            <span className="text-[9px] text-amber-200/80 block">Sanction Order Issued</span>
          </div>

          <div className="bg-[#1A4739] p-2 border border-emerald-600/80">
            <span className="text-[9px] text-emerald-200 uppercase tracking-wider block font-bold">{t.nfstStipend}</span>
            <span className="text-base font-extrabold text-emerald-200">{stipendDisplay}</span>
            <span className="text-[9px] text-emerald-300/70 block">Higher Education</span>
          </div>

          <div className="bg-[#1A4739] p-2 border border-emerald-600/80">
            <span className="text-[9px] text-emerald-200 uppercase tracking-wider block font-bold">{t.aadhaarBankSeed}</span>
            <div className="flex items-center space-x-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 animate-ping inline-block" />
              <span className="text-xs font-bold text-emerald-200">{t.activeStatus} (***4091)</span>
            </div>
            <span className="text-[9px] text-emerald-300/70 block">NPCI Direct Credit</span>
          </div>
        </div>
      </div>

      {/* 2. Photo Showcase Slider: Authentic Tribal Scholars */}
      <div className="bg-white border-2 border-stone-300 p-3 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-[#EA580C]" />
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-stone-900">
              {t.storiesTitle}
            </h3>
          </div>
          <button 
            onClick={onOpenStories}
            className="text-[10px] text-[#EA580C] font-bold hover:underline"
          >
            {t.cultureStory} →
          </button>
        </div>

        {/* Interactive Photo Carousel */}
        <div className="relative aspect-[16/9] bg-stone-950 overflow-hidden border border-stone-300">
          <img
            src={photoStories[activeStoryIdx].img}
            alt={photoStories[activeStoryIdx].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          
          {/* Caption */}
          <div className="absolute bottom-2 left-2.5 right-2.5 text-left text-white">
            <span className="text-[9px] uppercase font-bold tracking-wider bg-[#EA580C] px-1.5 py-0.2 text-white inline-block mb-1">
              Eklavya Journey
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-amber-200 leading-tight">
              {photoStories[activeStoryIdx].title}
            </h4>
            <p className="text-[10px] text-stone-300 leading-tight line-clamp-1 mt-0.5">
              {photoStories[activeStoryIdx].desc}
            </p>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={() => setActiveStoryIdx((prev) => (prev === 0 ? photoStories.length - 1 : prev - 1))}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setActiveStoryIdx((prev) => (prev + 1) % photoStories.length)}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xs"
            aria-label="Next story"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Story Dots */}
        <div className="flex items-center justify-center space-x-1.5 mt-2">
          {photoStories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStoryIdx(idx)}
              className={`h-1 transition-all ${idx === activeStoryIdx ? 'w-4 bg-[#EA580C]' : 'w-1.5 bg-stone-300'}`}
              aria-label={`Story ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Quick Action Grid */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onNavigateToEligibility}
          className="p-3 bg-white border border-stone-300 hover:border-[#EA580C] transition-all text-left shadow-xs flex flex-col justify-between"
        >
          <div className="w-7 h-7 bg-amber-100 text-[#C2410C] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-xs text-stone-900 block leading-tight">{t.eligibilityChecker}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.eligibilityDesc}</span>
          </div>
        </button>

        <button
          onClick={onNavigateToWallet}
          className="p-3 bg-white border border-stone-300 hover:border-[#235E4B] transition-all text-left shadow-xs flex flex-col justify-between"
        >
          <div className="w-7 h-7 bg-emerald-100 text-[#235E4B] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-xs text-stone-900 block leading-tight">{t.walletAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.walletDesc}</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateToChat('What is the deadline for National Overseas Scholarship (NOS)?')}
          className="p-3 bg-white border border-stone-300 hover:border-[#EA580C] transition-all text-left shadow-xs flex flex-col justify-between"
        >
          <div className="w-7 h-7 bg-orange-100 text-[#EA580C] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-xs text-stone-900 block leading-tight">{t.jagoGuidanceAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.jagoGuidanceDesc}</span>
          </div>
        </button>

        <button
          onClick={onNavigateToSchemes}
          className="p-3 bg-white border border-stone-300 hover:border-stone-800 transition-all text-left shadow-xs flex flex-col justify-between"
        >
          <div className="w-7 h-7 bg-stone-100 text-stone-800 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div className="mt-2">
            <span className="font-bold text-xs text-stone-900 block leading-tight">{t.rulebooksAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.rulebooksDesc}</span>
          </div>
        </button>
      </div>

      {/* 4. The 5 National Scholarship Schemes Status Cards */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-0.5">
          <div>
            <h3 className="text-sm font-extrabold text-[#235E4B] uppercase tracking-wider font-serif">
              {t.trackerTitle}
            </h3>
            <p className="text-[10px] text-stone-600">
              Personalized status tracking for {profile.name}
            </p>
          </div>
          <span className="text-[10px] font-semibold text-stone-500 flex items-center">
            <RefreshCw className="w-2.5 h-2.5 mr-1 text-[#EA580C] animate-spin" />
            {t.liveSync}
          </span>
        </div>

        <div className="space-y-2">
          {MOTA_SCHEMES.map((scheme) => {
            const studentStatus = profile.applicationStatuses?.find(s => s.schemeId === scheme.id);
            const isDisbursed = studentStatus?.status === 'Disbursed';
            const isSanctioned = studentStatus?.status === 'Sanctioned';
            const isUnderVerification = studentStatus?.status === 'Under Verification';

            return (
              <div
                key={scheme.id}
                className={`p-3 border-2 transition-all shadow-xs ${
                  isDisbursed 
                    ? 'bg-emerald-50/60 border-emerald-400' 
                    : isSanctioned
                    ? 'bg-amber-50/60 border-amber-400'
                    : isUnderVerification
                    ? 'bg-orange-50/60 border-orange-400'
                    : 'bg-white border-stone-300'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-stone-100 text-stone-700 mb-1 border border-stone-200">
                      {scheme.shortCode} • {scheme.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                      {scheme.name}
                    </h4>
                  </div>
                  <div>
                    {getStatusBadge(studentStatus?.status || 'Not Applied')}
                  </div>
                </div>

                {/* Financial Entitlement */}
                <div className="mt-2 py-1.5 px-2 bg-white/80 border border-stone-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-stone-500 uppercase block font-bold">{t.grantStipendLabel}</span>
                    <span className="font-extrabold text-[#C2410C] text-xs">
                      {scheme.annualGrant}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-stone-500 uppercase block font-bold">{t.incomeCeilingLabel}</span>
                    <span className="font-semibold text-stone-800 text-[11px]">
                      {scheme.incomeLimit}
                    </span>
                  </div>
                </div>

                {/* Pipeline Stage or Note */}
                {studentStatus && (
                  <div className="mt-2 pt-2 border-t border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
                    <span className="truncate max-w-[200px]">
                      {studentStatus.notes}
                    </span>
                    <button
                      onClick={() => onNavigateToChat(`What are the next steps for my ${scheme.name} application?`)}
                      className="text-[10px] font-bold text-[#EA580C] hover:underline shrink-0 ml-2"
                    >
                      {t.askJagoShort} →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
