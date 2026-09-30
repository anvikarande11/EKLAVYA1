import React from 'react';
import { StudentMockProfile } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { User, ShieldCheck, CheckCircle2, X, MapPin, School, Banknote, FileCheck, LogOut, ArrowRight, Sparkles } from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentMockProfile;
  onOpenAuth: () => void;
  langCode: string;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onOpenAuth,
  langCode
}) => {
  const t = getTranslation(langCode);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/55 backdrop-blur-xs animate-in fade-in select-none">
      <div className="bg-[#FAF8F5] w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col text-stone-900 border border-stone-200">
        
        {/* Header */}
        <div className="bg-[#1E4D3C] text-white px-5 py-4 flex items-center justify-between rounded-t-2xl shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#C25927] to-[#D97706] text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-amber-50 font-serif leading-none">
                {profile.name}
              </h3>
              <p className="text-[10px] text-emerald-100/80 leading-tight mt-1 font-mono">
                ID: {profile.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Body */}
        <div className="p-5 space-y-4">
          
          {/* Status Chip Strip */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-semibold text-emerald-950">Active Scholar Profile</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1E4D3C] text-white text-[10px] font-semibold uppercase tracking-wider">
              DBT Verified
            </span>
          </div>

          {/* Academic & Tribal Credentials Grid */}
          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Indigenous Identity
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">
                  {profile.tribalCommunity} Community
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-50 text-[#C25927] font-semibold text-[10px] border border-amber-200">
                  Scheduled Tribe (ST)
                </span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Location & Domicile
              </span>
              <div className="flex items-center text-stone-800 space-x-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#C25927] shrink-0" />
                <span>{profile.district}, {profile.state}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Current Education Level & Course
              </span>
              <div className="flex items-center text-stone-800 space-x-1.5 font-medium">
                <School className="w-3.5 h-3.5 text-[#1E4D3C] shrink-0" />
                <span className="font-semibold">{profile.educationLevel}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                Family Annual Income Bracket
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-900 text-sm">
                  ₹{profile.annualFamilyIncome.toLocaleString('en-IN')}/year
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Full Grant Eligible (&lt; ₹2.5L)
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[9px] text-emerald-800 font-semibold uppercase block">Aadhaar Bank Seed</span>
              <span className="text-xs font-semibold text-emerald-950 flex items-center mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
                Linked (NPCI Bridge)
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[9px] text-emerald-800 font-semibold uppercase block">DigiLocker Records</span>
              <span className="text-xs font-semibold text-emerald-950 flex items-center mt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
                4 Synced Docs
              </span>
            </div>
          </div>

          {/* Switch Account / Sign Out / Create New Account */}
          <div className="pt-2 border-t border-stone-200 flex items-center space-x-2.5">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#1E4D3C] hover:bg-[#163D2F] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <User className="w-3.5 h-3.5" />
              <span>Switch / Sign In</span>
            </button>

            <button
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
