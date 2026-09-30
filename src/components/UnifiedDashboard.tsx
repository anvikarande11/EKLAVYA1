import React, { useState } from 'react';
import { MOTA_SCHEMES, StudentMockProfile, SchemeDetail, LanguageOption } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  CheckCircle2, Clock, AlertTriangle, ArrowRight, ShieldCheck, 
  Award, Sparkles, FileText, TrendingUp, RefreshCw,
  BookOpen, ChevronLeft, ChevronRight, User, Edit3
} from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

// Direct image imports so Vite bundles and hashes them reliably for production builds
import slide1Img from '../assets/images/i_can_dream_1790708636707.jpg';
import slide2Img from '../assets/images/village_smile_1790708651184.jpg';
import slide3Img from '../assets/images/classroom_hands_1790708594872.jpg';
import slide4Img from '../assets/images/reading_circle_1790708623379.jpg';
import slide5Img from '../assets/images/chalkboard_girl_1790708612474.jpg';

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
      img: slide1Img || '/images/i_can_dream_1790708636707.jpg',
      title: t.slide1Title,
      desc: t.slide1Desc,
      schemeId: 'pre-matric'
    },
    {
      img: slide2Img || '/images/village_smile_1790708651184.jpg',
      title: t.slide2Title,
      desc: t.slide2Desc,
      schemeId: 'post-matric'
    },
    {
      img: slide3Img || '/images/classroom_hands_1790708594872.jpg',
      title: t.slide3Title,
      desc: t.slide3Desc,
      schemeId: 'top-class'
    },
    {
      img: slide4Img || '/images/reading_circle_1790708623379.jpg',
      title: t.slide4Title,
      desc: t.slide4Desc,
      schemeId: 'nfst'
    },
    {
      img: slide5Img || '/images/chalkboard_girl_1790708612474.jpg',
      title: t.slide5Title,
      desc: t.slide5Desc,
      schemeId: 'nos'
    }
  ];

  // Helper for clean, soft status tags
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Disbursed':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
            {t.statusDisbursed}
          </span>
        );
      case 'Sanctioned':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-amber-50 text-amber-900 border border-amber-200">
            <Award className="w-3 h-3 mr-1 text-[#C25927]" />
            {t.statusSanctioned}
          </span>
        );
      case 'Under Verification':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-orange-50 text-orange-900 border border-orange-200">
            <Clock className="w-3 h-3 mr-1 text-orange-600 animate-spin" />
            {t.statusUnderVerification}
          </span>
        );
      case 'Not Applied':
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-medium rounded-full bg-stone-100 text-stone-600 border border-stone-200">
            {t.statusNotApplied}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-semibold rounded-full bg-rose-50 text-rose-800 border border-rose-200">
            <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />
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
      
      {/* 1. Dignified Hero Card - Natural Forest Green & Soft Rounded Edges */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1E4D3C] to-[#163D2F] text-white p-5 shadow-sm border border-emerald-800/40 overflow-hidden">
        {/* Warli Pattern Subtle Accent */}
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <WarliPattern variant="tree" color="#FDE68A" className="w-28 h-28" />
        </div>

        <div className="relative z-10 space-y-3">
          {/* Header strip in Hero Card */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#C25927] text-white text-[10px] font-semibold uppercase tracking-wider">
                {t.welcomeScholar}
              </span>
              <button
                onClick={onOpenProfile}
                className="text-[10px] bg-white/10 hover:bg-white/20 text-amber-200 px-2 py-0.5 rounded-md border border-white/15 font-medium flex items-center space-x-1 transition-colors"
                title="View & Edit Profile"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>My Profile</span>
              </button>
            </div>
            <span className="text-[11px] font-mono text-emerald-200">
              {t.stIdLabel}: <span className="font-semibold text-white">{profile.id}</span>
            </span>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif flex items-center space-x-2">
              <span>{profile.name}</span>
            </h2>
            <p className="text-xs text-emerald-100/90 mt-0.5">
              Tribe: <span className="font-semibold text-amber-300">{profile.tribalCommunity}</span> • State: <span className="font-semibold">{profile.state} ({profile.district})</span>
            </p>
            <p className="text-[11px] text-emerald-200/80 font-normal mt-0.5">
              {profile.educationLevel}
            </p>
          </div>

          {/* Quick Hero Action Triggers */}
          <div className="flex items-center space-x-2.5 pt-1">
            <button
              onClick={() => onNavigateToChat('How do I check my scholarship DBT payment status on PFMS?')}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3.5 rounded-xl bg-[#C25927] hover:bg-[#A94A1E] text-white font-semibold text-xs shadow-sm transition-all active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>{t.askJagoBtn}</span>
            </button>
            <button
              onClick={onNavigateToWallet}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-emerald-100 font-medium text-xs transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>{t.digiVaultBtn}</span>
            </button>
          </div>
        </div>

        {/* Live DBT Monetary Ticker - Clean, Breathing Grid */}
        <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-2 gap-2 text-left">
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block font-semibold">{t.totalDisbursed}</span>
            <span className="text-base font-bold text-amber-300">{disbursedAmountDisplay}</span>
            <span className="text-[9px] text-emerald-200/70 block">Aadhaar PFMS Bridge</span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block font-semibold">{t.sanctionedPending}</span>
            <span className="text-base font-bold text-white">{sanctionedAmountDisplay}</span>
            <span className="text-[9px] text-amber-200/80 block">Sanction Order Issued</span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block font-semibold">{t.nfstStipend}</span>
            <span className="text-base font-bold text-emerald-200">{stipendDisplay}</span>
            <span className="text-[9px] text-emerald-200/70 block">Higher Education</span>
          </div>

          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
            <span className="text-[9px] text-emerald-200/80 uppercase tracking-wider block font-semibold">{t.aadhaarBankSeed}</span>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-xs font-semibold text-emerald-100">{t.activeStatus} (***4091)</span>
            </div>
            <span className="text-[9px] text-emerald-200/70 block">NPCI Direct Credit</span>
          </div>
        </div>
      </div>

      {/* 2. Photo Showcase Slider: Natural, Rounded & Clean */}
      <div className="bg-white rounded-2xl border border-stone-200 p-3.5 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-[#C25927]" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800">
              {t.storiesTitle}
            </h3>
          </div>
          <button 
            onClick={onOpenStories}
            className="text-[11px] text-[#C25927] font-semibold hover:underline"
          >
            {t.cultureStory} →
          </button>
        </div>

        {/* Interactive Photo Carousel */}
        <div className="relative aspect-[16/9] rounded-xl bg-stone-900 overflow-hidden">
          <img
            src={photoStories[activeStoryIdx].img}
            alt={photoStories[activeStoryIdx].title}
            onError={(e) => {
              // Resilient fallback to public/images if bundled asset is missing
              const fallbackUrl = `/images/${photoStories[activeStoryIdx].img.split('/').pop()}`;
              if ((e.currentTarget as HTMLImageElement).src !== fallbackUrl) {
                (e.currentTarget as HTMLImageElement).src = fallbackUrl;
              }
            }}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
          
          {/* Caption */}
          <div className="absolute bottom-3 left-3 right-3 text-left text-white">
            <span className="text-[9px] uppercase font-semibold tracking-wider bg-[#C25927] px-2 py-0.5 rounded text-white inline-block mb-1">
              Eklavya Journey
            </span>
            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
              {photoStories[activeStoryIdx].title}
            </h4>
            <p className="text-[10px] text-stone-200 leading-tight line-clamp-1 mt-0.5">
              {photoStories[activeStoryIdx].desc}
            </p>
          </div>

          {/* Carousel Arrows */}
          <button
            onClick={() => setActiveStoryIdx((prev) => (prev === 0 ? photoStories.length - 1 : prev - 1))}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveStoryIdx((prev) => (prev + 1) % photoStories.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Story Dots */}
        <div className="flex items-center justify-center space-x-1.5 mt-2.5">
          {photoStories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStoryIdx(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === activeStoryIdx ? 'w-5 bg-[#C25927]' : 'w-1.5 bg-stone-200'}`}
              aria-label={`Story ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 3. Quick Action Grid - Soft, Natural Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onNavigateToEligibility}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#C25927] transition-all text-left shadow-xs hover:shadow-sm flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C25927] flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="mt-2.5">
            <span className="font-semibold text-xs text-stone-900 block leading-tight">{t.eligibilityChecker}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.eligibilityDesc}</span>
          </div>
        </button>

        <button
          onClick={onNavigateToWallet}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#1E4D3C] transition-all text-left shadow-xs hover:shadow-sm flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1E4D3C] flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="mt-2.5">
            <span className="font-semibold text-xs text-stone-900 block leading-tight">{t.walletAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.walletDesc}</span>
          </div>
        </button>

        <button
          onClick={() => onNavigateToChat('What is the deadline for National Overseas Scholarship (NOS)?')}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-[#C25927] transition-all text-left shadow-xs hover:shadow-sm flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#C25927] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="mt-2.5">
            <span className="font-semibold text-xs text-stone-900 block leading-tight">{t.jagoGuidanceAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.jagoGuidanceDesc}</span>
          </div>
        </button>

        <button
          onClick={onNavigateToSchemes}
          className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 transition-all text-left shadow-xs hover:shadow-sm flex flex-col justify-between"
        >
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div className="mt-2.5">
            <span className="font-semibold text-xs text-stone-900 block leading-tight">{t.rulebooksAction}</span>
            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">{t.rulebooksDesc}</span>
          </div>
        </button>
      </div>

      {/* 4. The 5 National Scholarship Schemes Status Cards - Clean Editorial List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-xs font-bold text-[#1E4D3C] uppercase tracking-wider">
              {t.trackerTitle}
            </h3>
            <p className="text-[10px] text-stone-500">
              Personalized status tracking for {profile.name}
            </p>
          </div>
          <span className="text-[10px] font-medium text-stone-500 flex items-center">
            <RefreshCw className="w-2.5 h-2.5 mr-1 text-[#C25927]" />
            {t.liveSync}
          </span>
        </div>

        <div className="space-y-2">
          {MOTA_SCHEMES.map((scheme) => {
            const studentStatus = profile.applicationStatuses?.find(s => s.schemeId === scheme.id);
            const isDisbursed = studentStatus?.status === 'Disbursed';
            const isSanctioned = studentStatus?.status === 'Sanctioned';

            return (
              <div
                key={scheme.id}
                className="p-3.5 bg-white rounded-xl border border-stone-200 shadow-xs hover:shadow-sm transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded bg-stone-100 text-stone-600 mb-1">
                      {scheme.shortCode} • {scheme.category}
                    </span>
                    <h4 className="font-semibold text-xs sm:text-sm text-stone-900 leading-tight">
                      {scheme.name}
                    </h4>
                  </div>
                  <div>
                    {getStatusBadge(studentStatus?.status || 'Not Applied')}
                  </div>
                </div>

                {/* Financial Entitlement */}
                <div className="mt-2.5 py-2 px-2.5 bg-stone-50 rounded-lg text-xs flex items-center justify-between border border-stone-100">
                  <div>
                    <span className="text-[9px] text-stone-500 uppercase block font-medium">{t.grantStipendLabel}</span>
                    <span className="font-bold text-[#C25927] text-xs">
                      {scheme.annualGrant}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-stone-500 uppercase block font-medium">{t.incomeCeilingLabel}</span>
                    <span className="font-medium text-stone-700 text-[11px]">
                      {scheme.incomeLimit}
                    </span>
                  </div>
                </div>

                {/* Pipeline Stage or Note */}
                {studentStatus && (
                  <div className="mt-2.5 pt-2 border-t border-stone-100 text-[11px] text-stone-600 flex items-center justify-between">
                    <span className="truncate max-w-[210px] text-stone-500">
                      {studentStatus.notes}
                    </span>
                    <button
                      onClick={() => onNavigateToChat(`What are the next steps for my ${scheme.name} application?`)}
                      className="text-[10px] font-semibold text-[#C25927] hover:underline shrink-0 ml-2"
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
