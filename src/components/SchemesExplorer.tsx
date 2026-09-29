import React, { useState } from 'react';
import { MOTA_SCHEMES, SchemeDetail } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  BookOpen, CheckCircle, ExternalLink, HelpCircle, 
  Sparkles, FileText, ArrowRight, ShieldCheck, ChevronRight, ArrowLeft
} from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface SchemesExplorerProps {
  onAskJago: (query: string) => void;
  onCheckEligibility: () => void;
  langCode?: string;
  onGoBack?: () => void;
}

export const SchemesExplorer: React.FC<SchemesExplorerProps> = ({
  onAskJago,
  onCheckEligibility,
  langCode = 'en',
  onGoBack
}) => {
  const t = getTranslation(langCode);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeScheme, setActiveScheme] = useState<SchemeDetail>(MOTA_SCHEMES[0]);

  const categories = ['All', 'School', 'Higher Education', 'Research', 'Premier Institutes', 'Overseas'];

  const filteredSchemes = selectedCategory === 'All'
    ? MOTA_SCHEMES
    : MOTA_SCHEMES.filter(s => s.category === selectedCategory);

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#235E4B] to-[#1A4739] text-white p-5 sm:p-6 shadow-xl border border-amber-600/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              {onGoBack && (
                <button
                  onClick={onGoBack}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-300 font-bold text-xs transition-all mr-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{t.back}</span>
                </button>
              )}
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                Ministry of Tribal Affairs Gazette Compendium
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              The 5 National Scholarship Schemes
            </h2>
            <p className="text-xs text-emerald-100 max-w-xl mt-0.5">
              Comprehensive guidelines, financial entitlements, and eligibility rules established under MoTA statutory regulations.
            </p>
          </div>

          <button
            onClick={onCheckEligibility}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all shrink-0"
          >
            <span>Match My Grants</span>
            <ArrowRight className="w-4 h-4 text-stone-950" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto mt-5 pt-3 border-t border-emerald-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-stone-950 font-bold shadow'
                  : 'bg-emerald-900/60 text-emerald-200 hover:bg-emerald-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Schemes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Scheme Cards list */}
        <div className="lg:col-span-1 space-y-3">
          {filteredSchemes.map((scheme) => {
            const isSelected = activeScheme.id === scheme.id;

            return (
              <div
                key={scheme.id}
                onClick={() => setActiveScheme(scheme)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#235E4B] shadow-md ring-2 ring-[#235E4B]/20'
                    : 'bg-white/80 border-stone-200 hover:border-stone-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider">
                    {scheme.category}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {scheme.shortCode}
                  </span>
                </div>

                <h4 className="font-bold text-stone-900 text-sm mt-1">
                  {scheme.name}
                </h4>

                <p className="text-xs font-semibold text-[#235E4B] mt-1.5">
                  {scheme.annualGrant}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-500 pt-2 border-t border-stone-100">
                  <span>Cap: {scheme.incomeLimit}</span>
                  <span className="font-bold text-[#235E4B] flex items-center">
                    Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Deep Dive on Selected Scheme */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#235E4B] border border-emerald-200">
                {activeScheme.category} Scheme
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-2">
                {activeScheme.name}
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {activeScheme.description}
              </p>
            </div>

            <button
              onClick={() => onAskJago(`Tell me all guidelines and application steps for ${activeScheme.name}`)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs transition-colors shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Ask Jago</span>
            </button>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Financial Entitlement</span>
              <span className="font-bold text-[#235E4B] text-xs sm:text-sm">{activeScheme.annualGrant}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Family Income Cap</span>
              <span className="font-semibold text-stone-800 text-xs sm:text-sm">{activeScheme.incomeLimit}</span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 font-bold uppercase block">Available Slots</span>
              <span className="font-semibold text-stone-800 text-xs sm:text-sm">{activeScheme.totalSlots}</span>
            </div>
          </div>

          {/* Key Scheme Benefits */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-600 mr-1.5" />
              Statutory Coverage & Benefits
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-700">
              {activeScheme.keyBenefits.map((b, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-emerald-700 font-bold mt-0.5">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mandatory Verification Documents */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 text-amber-600 mr-1.5" />
              Mandatory DigiLocker Verified Documents
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {activeScheme.requiredDocs.map((doc, i) => (
                <div key={i} className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs text-stone-800 flex items-center space-x-2">
                  <span className="text-amber-700 font-bold text-xs">📄</span>
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Gazette Reference */}
          <div className="p-3.5 bg-stone-100/80 rounded-xl border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-stone-700 block text-[11px]">Official MoTA Gazette Citation:</span>
              <span className="font-mono text-[11px] text-stone-800">{activeScheme.officialSource}</span>
              <p className="text-[10px] text-stone-500">{activeScheme.guidelineSection}</p>
            </div>
            <a
              href={activeScheme.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1 text-xs font-bold text-[#235E4B] hover:underline"
            >
              <span>NSP Portal Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
