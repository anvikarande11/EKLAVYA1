import React, { useState, useEffect } from 'react';
import { LanguageOption } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { ArrowRight, Clock, X } from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

// Direct bundled imports for bulletproof rendering in all production builds
import slide1Img from '../assets/images/i_can_dream_1790708636707.jpg';
import slide2Img from '../assets/images/village_smile_1790708651184.jpg';
import slide3Img from '../assets/images/classroom_hands_1790708594872.jpg';
import slide4Img from '../assets/images/reading_circle_1790708623379.jpg';
import slide5Img from '../assets/images/chalkboard_girl_1790708612474.jpg';

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
      img: slide1Img || '/images/i_can_dream_1790708636707.jpg',
      title: t.slide1Title,
      desc: t.slide1Desc,
      tag: 'Aspiration'
    },
    {
      img: slide2Img || '/images/village_smile_1790708651184.jpg',
      title: t.slide2Title,
      desc: t.slide2Desc,
      tag: 'Direct Benefit'
    },
    {
      img: slide3Img || '/images/classroom_hands_1790708594872.jpg',
      title: t.slide3Title,
      desc: t.slide3Desc,
      tag: 'Classrooms'
    },
    {
      img: slide4Img || '/images/reading_circle_1790708623379.jpg',
      title: t.slide4Title,
      desc: t.slide4Desc,
      tag: 'Higher Ed'
    },
    {
      img: slide5Img || '/images/chalkboard_girl_1790708612474.jpg',
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

  // Slide rotator every 1.6s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentSlideIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 select-none animate-in fade-in duration-200">
      {/* Mobile Screen Container Frame */}
      <div className="w-full max-w-[420px] max-h-[85vh] bg-[#1E4D3C] text-white flex flex-col justify-between overflow-hidden shadow-2xl rounded-2xl border border-white/10 relative">
        
        {/* Top Cultural Tribal Header Strip */}
        <div className="bg-[#163D2F] px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#C25927] to-[#D97706] flex items-center justify-center text-xs font-bold text-white shadow-xs">
              🏹
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide text-amber-100 block leading-tight font-serif">
                {t.introTitle}
              </span>
              <span className="text-[10px] text-emerald-200/90 tracking-wide block">
                {currentLanguage.nativeName}
              </span>
            </div>
          </div>

          {/* Skip button */}
          <button
            onClick={onFinish}
            className="flex items-center space-x-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors border border-white/15"
          >
            <span>{t.skipIntro}</span>
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-mono">
              {secondsLeft}
            </div>
          </button>
        </div>

        {/* Warli Border Motif */}
        <WarliPattern variant="border" color="#F59E0B" className="opacity-70 shrink-0" />

        {/* Visual Slider Showcase with Real Tribal Student Photos */}
        <div className="flex-1 flex flex-col justify-center px-4 py-3 overflow-hidden relative">
          {/* Main Slide Card */}
          <div className="relative w-full aspect-[4/3] rounded-xl bg-stone-900 border border-white/10 shadow-md overflow-hidden shrink-0">
            <img
              src={activeSlide.img}
              alt={activeSlide.title}
              onError={(e) => {
                const fallbackUrl = `/images/${activeSlide.img.split('/').pop()}`;
                if ((e.currentTarget as HTMLImageElement).src !== fallbackUrl) {
                  (e.currentTarget as HTMLImageElement).src = fallbackUrl;
                }
              }}
              className="w-full h-full object-cover transition-all duration-700"
            />
            {/* Dark gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            
            {/* Tag Badge */}
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-[#C25927] text-white text-[10px] font-semibold uppercase tracking-wider shadow-sm">
              {activeSlide.tag}
            </div>

            {/* Slide Text */}
            <div className="absolute bottom-3 left-3.5 right-3.5 text-left text-white space-y-0.5">
              <h3 className="text-base sm:text-lg font-bold font-serif text-white tracking-wide leading-tight">
                {activeSlide.title}
              </h3>
              <p className="text-xs text-stone-200 leading-snug line-clamp-2">
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
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex 
                    ? 'w-6 bg-[#C25927]' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Cultural Motto Banner */}
          <div className="mt-3 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
            <p className="text-xs font-serif text-amber-100 font-medium tracking-wide">
              "{t.introSubtitle}"
            </p>
            <div className="flex items-center justify-center space-x-2 text-[10px] text-emerald-200/70 mt-1">
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
        <div className="bg-[#163D2F] p-4 border-t border-white/10 shrink-0 space-y-2.5">
          {/* Progress Bar for the 5-second countdown */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[10px] text-emerald-200/80 font-mono">
              <span className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-300 inline" />
                <span>{t.enteringIn} {secondsLeft} {t.secondsSuffix}</span>
              </span>
              <span className="text-amber-300 font-semibold">{Math.round(((5 - secondsLeft) / 5) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C25927] to-[#F59E0B] transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onFinish}
            className="w-full py-2.5 px-4 rounded-xl bg-[#C25927] hover:bg-[#A94A1E] active:scale-98 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center space-x-2"
          >
            <span>{t.enterPortalNow}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
