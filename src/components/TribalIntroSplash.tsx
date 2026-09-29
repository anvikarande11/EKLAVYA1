import React, { useState, useEffect } from 'react';
import { ChevronRight, Sparkles, Clock, ArrowRight, Shield } from 'lucide-react';
import { getTranslation } from '../data/translations.ts';
import { LanguageOption } from '../data/motaKnowledge.ts';
import { WarliPattern } from './WarliPattern.tsx';

interface TribalIntroSplashProps {
  currentLanguage: LanguageOption;
  onFinish: () => void;
}

export const TribalIntroSplash: React.FC<TribalIntroSplashProps> = ({
  currentLanguage,
  onFinish
}) => {
  const t = getTranslation(currentLanguage.code);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides = [
    {
      img: '/src/assets/images/i_can_dream_1790708636707.jpg',
      title: t.slide1Title,
      desc: t.slide1Desc,
      tag: 'Aspiration'
    },
    {
      img: '/src/assets/images/village_smile_1790708651184.jpg',
      title: t.slide2Title,
      desc: t.slide2Desc,
      tag: 'Direct Benefit'
    },
    {
      img: '/src/assets/images/classroom_hands_1790708594872.jpg',
      title: t.slide3Title,
      desc: t.slide3Desc,
      tag: 'Classrooms'
    },
    {
      img: '/src/assets/images/reading_circle_1790708623379.jpg',
      title: t.slide4Title,
      desc: t.slide4Desc,
      tag: 'Higher Ed'
    },
    {
      img: '/src/assets/images/chalkboard_girl_1790708612474.jpg',
      title: t.slide5Title,
      desc: t.slide5Desc,
      tag: 'Excellence'
    }
  ];

  // 5-second countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) {
      onFinish();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, onFinish]);

  // Slide cycle every 1.5s within the 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 1600);
    return () => clearInterval(slideTimer);
  }, [slides.length]);

  const activeSlide = slides[currentSlideIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C4D3E] p-2 sm:p-4 select-none animate-in fade-in duration-300">
      {/* Mobile Screen Container Frame */}
      <div className="w-full max-w-[420px] h-[92vh] max-h-[820px] bg-[#235E4B] text-white flex flex-col justify-between overflow-hidden shadow-2xl relative border-2 border-[#D97706]/40">
        
        {/* Top Cultural Tribal Header Strip */}
        <div className="bg-[#1A4739] px-4 py-3 flex items-center justify-between border-b border-[#D97706]/30 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#EA580C] to-[#D97706] flex items-center justify-center text-xs font-bold text-white shadow-inner">
              🏹
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-wider text-amber-200 block leading-tight font-serif">
                {t.introTitle}
              </span>
              <span className="text-[10px] text-emerald-200/90 tracking-wide block">
                {currentLanguage.nativeName}
              </span>
            </div>
          </div>

          {/* 5-second countdown badge & Skip button */}
          <button
            onClick={onFinish}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold shadow-md transition-all active:scale-95 border border-amber-300/40"
          >
            <span>{t.skipIntro}</span>
            <div className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px] font-mono">
              {secondsLeft}
            </div>
          </button>
        </div>

        {/* Warli Border Motif */}
        <WarliPattern variant="border" color="#F59E0B" className="opacity-90 shrink-0" />

        {/* Visual Slider Showcase with Real Tribal Student Photos */}
        <div className="flex-1 flex flex-col justify-center px-4 py-2 overflow-hidden relative">
          {/* Main Slide Card - Modern Architectural Canvas */}
          <div className="relative w-full aspect-[4/3] bg-stone-900 border-2 border-[#D97706]/50 shadow-xl overflow-hidden shrink-0">
            <img
              src={activeSlide.img}
              alt={activeSlide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-700 transform hover:scale-105"
            />
            {/* Dark gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            
            {/* Tag Badge */}
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#EA580C] text-white text-[10px] font-bold uppercase tracking-wider shadow">
              {activeSlide.tag}
            </div>

            {/* Slide Caption */}
            <div className="absolute bottom-2.5 left-3 right-3 text-left">
              <h3 className="text-base sm:text-lg font-extrabold text-amber-200 leading-snug drop-shadow-md">
                {activeSlide.title}
              </h3>
              <p className="text-[11px] text-stone-200 mt-0.5 leading-tight line-clamp-2">
                {activeSlide.desc}
              </p>
            </div>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center space-x-1.5 mt-3 shrink-0">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-1.5 transition-all duration-300 ${
                  idx === currentSlideIndex 
                    ? 'w-6 bg-[#EA580C]' 
                    : 'w-2 bg-emerald-800/80 hover:bg-emerald-600'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Cultural Motto Banner */}
          <div className="mt-3 p-3 bg-[#1D5041] border border-amber-600/30 text-center">
            <p className="text-xs font-serif text-amber-100 font-semibold tracking-wide">
              "{t.introSubtitle}"
            </p>
            <div className="flex items-center justify-center space-x-2 text-[10px] text-emerald-300/80 mt-1">
              <span>Pre-Matric</span>
              <span>•</span>
              <span>Post-Matric</span>
              <span>•</span>
              <span>Top Class</span>
              <span>•</span>
              <span>NFST</span>
              <span>•</span>
              <span>NOS</span>
            </div>
          </div>
        </div>

        {/* Bottom Action Footer with Progress Bar */}
        <div className="bg-[#1A4739] p-4 border-t border-[#D97706]/30 shrink-0 space-y-2.5">
          {/* Progress Bar for the 5-second countdown */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-400 inline" />
                <span>{t.enteringIn} {secondsLeft} {t.secondsSuffix}</span>
              </span>
              <span className="text-amber-300 font-bold">{Math.round(((5 - secondsLeft) / 5) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#14382C] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#EA580C] to-[#FBBF24] transition-all duration-1000 ease-linear"
                style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onFinish}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:brightness-110 active:scale-98 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center space-x-2 border border-amber-400/40"
          >
            <span>{t.enterPortalNow}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Bottom Warli Pattern Accent */}
        <WarliPattern variant="dancers" color="#FDE68A" className="opacity-40 py-1 bg-[#143B2E] shrink-0" />
      </div>
    </div>
  );
};
