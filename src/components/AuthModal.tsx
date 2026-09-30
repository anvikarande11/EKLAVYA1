import React, { useState } from 'react';
import { StudentMockProfile } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { User, ShieldCheck, CheckCircle2, ArrowRight, Lock, KeyRound, Sparkles, X, School, MapPin } from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (profile: StudentMockProfile) => void;
  currentProfile: StudentMockProfile;
  langCode: string;
}

const TRIBAL_COMMUNITIES = [
  'Santhal', 'Bhil', 'Gond', 'Munda', 'Khasi', 'Ho', 'Oraon',
  'Garo', 'Mizo', 'Bodo', 'Tripuri', 'Koya', 'Chenchu', 'Baiga', 'Sahariya', 'Other Tribal Community'
];

const STATES_LIST = [
  { state: 'Jharkhand', district: 'Dumka', code: 'JH' },
  { state: 'Madhya Pradesh', district: 'Mandla', code: 'MP' },
  { state: 'Odisha', district: 'Mayurbhanj', code: 'OD' },
  { state: 'Meghalaya', district: 'East Khasi Hills', code: 'ML' },
  { state: 'Gujarat', district: 'Dahod', code: 'GJ' },
  { state: 'Chhattisgarh', district: 'Bastar', code: 'CG' },
  { state: 'Mizoram', district: 'Aizawl', code: 'MZ' },
  { state: 'Assam', district: 'Kokrajhar', code: 'AS' },
  { state: 'Rajasthan', district: 'Banswara', code: 'RJ' },
  { state: 'Maharashtra', district: 'Gadchiroli', code: 'MH' },
];

const EDUCATION_LEVELS = [
  'Class 9 & 10 (Secondary Pre-Matric)',
  'Class 11 & 12 (Higher Secondary)',
  'Undergraduate (B.Tech, MBBS, B.Sc, B.Com, B.A)',
  'Postgraduate (M.Tech, M.Sc, MBA, M.A)',
  'Ph.D. / Research Fellowship'
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate,
  currentProfile,
  langCode
}) => {
  const t = getTranslation(langCode);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  // Sign up form state
  const [fullName, setFullName] = useState('');
  const [community, setCommunity] = useState('Santhal');
  const [customCommunity, setCustomCommunity] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(STATES_LIST[0]);
  const [educationLevel, setEducationLevel] = useState(EDUCATION_LEVELS[2]);
  const [annualIncome, setAnnualIncome] = useState(180000);
  const [institution, setInstitution] = useState('');
  const [pin, setPin] = useState('123456');

  // Sign in form state
  const [signInId, setSignInId] = useState('');
  const [signInPin, setSignInPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Quick Demo Login
  const handleQuickDemo = (name: string, comm: string, stateName: string, dist: string, edu: string, income: number) => {
    const code = STATES_LIST.find(s => s.state === stateName)?.code || 'IN';
    const profile: StudentMockProfile = {
      id: `ST-${code}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name,
      tribalCommunity: comm,
      state: stateName,
      district: dist,
      pvtgStatus: false,
      educationLevel: edu,
      annualFamilyIncome: income,
      aadhaarLinked: true,
      digiLockerLinked: true,
      applicationStatuses: generateStatusesForEducation(edu, income)
    };
    onAuthenticate(profile);
    onClose();
  };

  // Helper to construct personalized scholarship application records based on education level
  function generateStatusesForEducation(edu: string, income: number) {
    if (edu.includes('Class 9') || edu.includes('Class 10')) {
      return [
        {
          schemeId: 'pre-matric',
          status: 'Disbursed' as const,
          disbursedAmount: '₹7,000 (Universal Pre-Matric Hosteller Grant)',
          currentStage: 5,
          lastUpdated: '18 Sep 2026',
          trackingId: `PRE-${Math.floor(100000 + Math.random() * 900000)}`,
          notes: 'Pre-Matric scholarship credited to verified Bank account via DBT.'
        },
        {
          schemeId: 'post-matric',
          status: 'Not Applied' as const,
          currentStage: 1,
          lastUpdated: '2026',
          trackingId: 'PMS-ELIGIBLE',
          notes: 'Eligible upon advancement to Class 11.'
        },
        {
          schemeId: 'top-class',
          status: 'Not Applied' as const,
          currentStage: 1,
          lastUpdated: '2026',
          trackingId: 'TCE-NA',
          notes: 'Applies for premier universities post Class 12.'
        },
        {
          schemeId: 'nfst',
          status: 'Not Applied' as const,
          currentStage: 1,
          lastUpdated: '2026',
          trackingId: 'NFST-NA',
          notes: 'Postgraduate research fellowship.'
        },
        {
          schemeId: 'nos',
          status: 'Not Applied' as const,
          currentStage: 1,
          lastUpdated: '2026',
          trackingId: 'NOS-NA',
          notes: 'Overseas Masters / Ph.D. program.'
        }
      ];
    }

    if (edu.includes('Ph.D') || edu.includes('Research')) {
      return [
        {
          schemeId: 'nfst',
          status: 'Sanctioned' as const,
          disbursedAmount: '₹37,000/mo (JRF Fellowship + ₹10,000 Contingency)',
          currentStage: 4,
          lastUpdated: '22 Sep 2026',
          trackingId: `NFST-${Math.floor(100000 + Math.random() * 900000)}`,
          notes: 'Sanctioned under National Fellowship for ST Scholars; Aadhaar bridge active.'
        },
        {
          schemeId: 'post-matric',
          status: 'Disbursed' as const,
          disbursedAmount: '₹48,000/yr',
          currentStage: 5,
          lastUpdated: '10 Aug 2026',
          trackingId: `PMS-${Math.floor(100000 + Math.random() * 900000)}`,
          notes: 'Post-Matric scholarship previously settled.'
        },
        {
          schemeId: 'nos',
          status: 'Under Verification' as const,
          currentStage: 3,
          lastUpdated: '25 Sep 2026',
          trackingId: `NOS-${Math.floor(100000 + Math.random() * 900000)}`,
          notes: 'Target foreign doctoral research exchange in progress.'
        },
        {
          schemeId: 'top-class',
          status: 'Not Applied' as const,
          currentStage: 1,
          lastUpdated: '2026',
          trackingId: 'TCE-NA',
          notes: 'Applicable for premier UG/PG degree colleges.'
        },
        {
          schemeId: 'pre-matric',
          status: 'Disbursed' as const,
          currentStage: 5,
          lastUpdated: 'Completed',
          trackingId: 'PRE-COMP',
          notes: 'Completed in earlier school curriculum.'
        }
      ];
    }

    // Default for Undergraduate / Higher Education
    return [
      {
        schemeId: 'post-matric',
        status: 'Disbursed' as const,
        disbursedAmount: '₹54,000 (Tuition + Maintenance Allowance)',
        currentStage: 5,
        lastUpdated: '24 Sep 2026',
        trackingId: `PMS-${selectedLocation.code}-${Math.floor(100000 + Math.random() * 900000)}`,
        notes: 'Credited directly via Aadhaar DBT Bridge into Bank account.'
      },
      {
        schemeId: 'top-class',
        status: 'Sanctioned' as const,
        disbursedAmount: '₹2,95,000 (Full Academic Fee + ₹45,000 Laptop Grant)',
        currentStage: 4,
        lastUpdated: '27 Sep 2026',
        trackingId: `TCE-${selectedLocation.code}-${Math.floor(100000 + Math.random() * 900000)}`,
        notes: 'Sanction order issued for premier institute degree.'
      },
      {
        schemeId: 'nfst',
        status: 'Not Applied' as const,
        currentStage: 1,
        lastUpdated: '2026',
        trackingId: 'NFST-ELIGIBLE',
        notes: 'Eligible upon advancement to M.Phil/Ph.D. research.'
      },
      {
        schemeId: 'nos',
        status: 'Not Applied' as const,
        currentStage: 1,
        lastUpdated: '2026',
        trackingId: 'NOS-ELIGIBLE',
        notes: 'Eligible for overseas Master’s degree funding.'
      },
      {
        schemeId: 'pre-matric',
        status: 'Disbursed' as const,
        currentStage: 5,
        lastUpdated: 'Completed',
        trackingId: 'PRE-COMP',
        notes: 'Completed in school.'
      }
    ];
  }

  // Handle New Registration
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }

    const finalCommunity = community === 'Other Tribal Community' && customCommunity.trim() 
      ? customCommunity.trim() 
      : community;

    const newProfile: StudentMockProfile = {
      id: `ST-${selectedLocation.code}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: fullName.trim(),
      tribalCommunity: finalCommunity,
      state: selectedLocation.state,
      district: selectedLocation.district,
      pvtgStatus: false,
      educationLevel: institution.trim() ? `${educationLevel} • ${institution.trim()}` : educationLevel,
      annualFamilyIncome: Number(annualIncome),
      aadhaarLinked: true,
      digiLockerLinked: true,
      applicationStatuses: generateStatusesForEducation(educationLevel, Number(annualIncome))
    };

    onAuthenticate(newProfile);
    onClose();
  };

  // Handle Sign In Submit
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInId.trim()) {
      setErrorMessage('Please enter your Scholar ID or Mobile Number');
      return;
    }

    // Authenticate and construct or reuse profile
    const profile: StudentMockProfile = {
      ...currentProfile,
      id: signInId.includes('ST-') ? signInId : `ST-${currentProfile.state.slice(0, 2).toUpperCase()}-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      name: signInId.includes('ST-') ? currentProfile.name : `Scholar ${signInId.slice(-4)}`,
    };
    onAuthenticate(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/55 backdrop-blur-xs animate-in fade-in select-none">
      <div className="bg-[#FAF8F5] w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col text-stone-900 border border-stone-200">
        
        {/* Header Strip */}
        <div className="bg-[#1E4D3C] text-white px-5 py-4 flex items-center justify-between rounded-t-2xl shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C25927] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              🏹
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide text-amber-50 font-serif leading-none">
                EKLAVYA SCHOLAR ACCESS
              </h3>
              <p className="text-[11px] text-emerald-100/80 leading-tight mt-1">
                Indigenous Scholarship & Welfare Account
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

        {/* Tab Toggle: Sign In vs Sign Up */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 p-1 shrink-0">
          <button
            type="button"
            onClick={() => { setAuthMode('signup'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signup'
                ? 'bg-white text-[#1E4D3C] shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Scholar Account (Sign Up)
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('signin'); setErrorMessage(null); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
              authMode === 'signin'
                ? 'bg-white text-[#1E4D3C] shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 space-y-4">
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              ⚠️ {errorMessage}
            </div>
          )}

          {/* Quick Demo 1-Tap Scholars */}
          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#C25927] block">
              ⚡ 1-Tap Quick Demo Scholars:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-left">
              <button
                type="button"
                onClick={() => handleQuickDemo('Birsa Marandi', 'Santhal', 'Jharkhand', 'Dumka', 'Undergraduate (B.Tech, 3rd Yr)', 185000)}
                className="p-2 rounded-lg bg-white hover:bg-amber-100/50 border border-stone-200 text-left text-[11px] transition-colors shadow-2xs"
              >
                <span className="font-semibold text-[#1E4D3C] block leading-tight">Birsa Marandi</span>
                <span className="text-[9px] text-stone-500 block mt-0.5">Santhal • Jharkhand (B.Tech)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('Sunita Gond', 'Gond', 'Madhya Pradesh', 'Mandla', 'Postgraduate (M.Sc Botany)', 120000)}
                className="p-2 rounded-lg bg-white hover:bg-amber-100/50 border border-stone-200 text-left text-[11px] transition-colors shadow-2xs"
              >
                <span className="font-semibold text-[#1E4D3C] block leading-tight">Sunita Gond</span>
                <span className="text-[9px] text-stone-500 block mt-0.5">Gond • MP (M.Sc)</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('Wanphrang Syiem', 'Khasi', 'Meghalaya', 'East Khasi Hills', 'Class 9 & 10 (Secondary Pre-Matric)', 85000)}
                className="p-2 rounded-lg bg-white hover:bg-amber-100/50 border border-stone-200 text-left text-[11px] transition-colors shadow-2xs"
              >
                <span className="font-semibold text-[#1E4D3C] block leading-tight">Wanphrang Syiem</span>
                <span className="text-[9px] text-stone-500 block mt-0.5">Khasi • Meghalaya (Class 10)</span>
              </button>
            </div>
          </div>

          {authMode === 'signup' ? (
            /* SIGN UP FORM */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Scholar Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Birsa Marandi / Sunita Gond"
                  className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] focus:ring-2 focus:ring-[#1E4D3C]/10 text-xs text-stone-900 font-medium px-3.5 py-2.5 outline-none transition-all"
                />
              </div>

              {/* Tribal Community & State Selection */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Tribal Community *
                  </label>
                  <select
                    value={community}
                    onChange={(e) => setCommunity(e.target.value)}
                    className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 font-medium px-3 py-2.5 outline-none cursor-pointer"
                  >
                    {TRIBAL_COMMUNITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    State & District *
                  </label>
                  <select
                    value={selectedLocation.state}
                    onChange={(e) => {
                      const loc = STATES_LIST.find(s => s.state === e.target.value);
                      if (loc) setSelectedLocation(loc);
                    }}
                    className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 font-medium px-3 py-2.5 outline-none cursor-pointer"
                  >
                    {STATES_LIST.map((loc) => (
                      <option key={loc.state} value={loc.state}>
                        {loc.state} ({loc.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {community === 'Other Tribal Community' && (
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Specify Your Tribal Group
                  </label>
                  <input
                    type="text"
                    value={customCommunity}
                    onChange={(e) => setCustomCommunity(e.target.value)}
                    placeholder="Enter tribe name"
                    className="w-full bg-white rounded-xl border border-stone-300 text-xs px-3.5 py-2 outline-none"
                  />
                </div>
              )}

              {/* Education Level */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Current Course / Education Level *
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 font-medium px-3 py-2.5 outline-none cursor-pointer"
                >
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>

              {/* Institution / College Name (Optional) */}
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  School / College / University Name
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. National Institute of Technology / Govt High School"
                  className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 px-3.5 py-2.5 outline-none"
                />
              </div>

              {/* Family Income & PIN */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Annual Income (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1000000"
                    step="5000"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value))}
                    className="w-full bg-white rounded-xl border border-stone-300 text-xs font-mono px-3.5 py-2.5 outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                    Security PIN (6 Digits)
                  </label>
                  <input
                    type="password"
                    maxLength={6}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full bg-white rounded-xl border border-stone-300 text-xs font-mono px-3.5 py-2.5 outline-none tracking-widest text-center"
                  />
                </div>
              </div>

              {/* DigiLocker & Aadhaar Notice */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Aadhaar NPCI bank link and DigiLocker caste certificate sync will be activated automatically for direct DBT disbursal.
                </span>
              </div>

              {/* Submit Sign Up Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#C25927] hover:bg-[#A94A1E] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Create My Scholar Profile</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          ) : (
            /* SIGN IN FORM */
            <form onSubmit={handleSignInSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Scholar ID or Registered Mobile
                </label>
                <input
                  type="text"
                  required
                  value={signInId}
                  onChange={(e) => setSignInId(e.target.value)}
                  placeholder="e.g. ST-JH-2026-98124 or 9876543210"
                  className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 font-medium px-3.5 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-700 block mb-1">
                  Security PIN / Password
                </label>
                <input
                  type="password"
                  required
                  maxLength={6}
                  value={signInPin}
                  onChange={(e) => setSignInPin(e.target.value)}
                  placeholder="••••••"
                  className="w-full bg-white rounded-xl border border-stone-300 focus:border-[#1E4D3C] text-xs font-mono px-3.5 py-2.5 outline-none tracking-widest"
                />
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
                <span>Default Test PIN: <code className="font-bold text-[#1E4D3C]">123456</code></span>
                <button
                  type="button"
                  onClick={() => { setSignInId(currentProfile.id); setSignInPin('123456'); }}
                  className="text-[#C25927] font-semibold hover:underline"
                >
                  Use Current Scholar ID
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#1E4D3C] hover:bg-[#163D2F] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center space-x-2 active:scale-98"
              >
                <span>Sign In to Scholar Portal</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
