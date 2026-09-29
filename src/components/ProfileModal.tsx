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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/65 backdrop-blur-xs animate-in fade-in select-none">
      <div className="bg-[#FAF7F2] w-full max-w-md max-h-[92vh] overflow-y-auto border-2 border-[#235E4B] shadow-2xl flex flex-col text-stone-900">
        
        {/* Header */}
        <div className="bg-[#235E4B] text-white px-4 py-3 flex items-center justify-between border-b-2 border-[#EA580C] shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-[#EA580C] to-[#D97706] text-white font-extrabold flex items-center justify-center text-sm shadow">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-extrabold text-sm tracking-wide text-amber-100 font-serif leading-none">
                {profile.name}
              </h3>
              <p className="text-[10px] text-emerald-200/90 leading-tight mt-0.5 font-mono">
                ID: {profile.id}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 bg-[#1A4739] hover:bg-[#15382D] text-amber-200 flex items-center justify-center font-bold text-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warli Pattern Accent */}
        <WarliPattern variant="border" color="#F59E0B" className="opacity-90 shrink-0" />

        {/* Profile Card Body */}
        <div className="p-4 space-y-3.5">
          
          {/* Status Chip Strip */}
          <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-300 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
              <span className="font-bold text-emerald-950">Active Scholar Profile</span>
            </div>
            <span className="px-2 py-0.5 bg-[#235E4B] text-white text-[10px] font-bold uppercase tracking-wider">
              DBT Verified
            </span>
          </div>

          {/* Academic & Tribal Credentials Grid */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-white border border-stone-300 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide font-bold block">
                Indigenous Identity
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">
                  {profile.tribalCommunity} Community
                </span>
                <span className="px-1.5 py-0.5 bg-amber-100 text-[#C2410C] font-bold text-[10px] border border-amber-300">
                  Scheduled Tribe (ST)
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-stone-300 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide font-bold block">
                Location & Domicile
              </span>
              <div className="flex items-center text-stone-800 space-x-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                <span>{profile.district}, {profile.state}</span>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-stone-300 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide font-bold block">
                Current Education Level & Course
              </span>
              <div className="flex items-center text-stone-800 space-x-1 font-medium">
                <School className="w-3.5 h-3.5 text-[#235E4B] shrink-0" />
                <span className="font-semibold">{profile.educationLevel}</span>
              </div>
            </div>

            <div className="p-2.5 bg-white border border-stone-300 space-y-1">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide font-bold block">
                Family Annual Income Bracket
              </span>
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-stone-900 text-sm">
                  ₹{profile.annualFamilyIncome.toLocaleString('en-IN')}/year
                </span>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.5">
                  Full Grant Eligible (&lt; ₹2.5L)
                </span>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2 bg-emerald-50/70 border border-emerald-300">
              <span className="text-[9px] text-emerald-800 font-bold uppercase block">Aadhaar Bank Seed</span>
              <span className="text-xs font-bold text-emerald-950 flex items-center mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-700 mr-1" />
                Linked (NPCI Bridge)
              </span>
            </div>

            <div className="p-2 bg-emerald-50/70 border border-emerald-300">
              <span className="text-[9px] text-emerald-800 font-bold uppercase block">DigiLocker Records</span>
              <span className="text-xs font-bold text-emerald-950 flex items-center mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-700 mr-1" />
                4 Synced Docs
              </span>
            </div>
          </div>

          {/* Switch Account / Sign Out / Create New Account */}
          <div className="pt-2 border-t border-stone-300 flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuth();
              }}
              className="flex-1 py-2 px-3 bg-[#235E4B] hover:bg-[#1A4739] text-white font-bold text-xs uppercase tracking-wide transition-all flex items-center justify-center space-x-1.5 shadow"
            >
              <User className="w-3.5 h-3.5" />
              <span>Switch / Sign In</span>
            </button>

            <button
              onClick={onClose}
              className="py-2 px-3 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
