import React, { useState } from 'react';
import { MOCK_WALLET_DOCUMENTS, MOCK_VAULT_ITEMS, MOTA_SCHEMES } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  ShieldCheck, Lock, Unlock, KeyRound, Fingerprint, Eye, 
  Download, CheckCircle, RefreshCw, FileCheck2, AlertCircle, ArrowUpRight, Zap, Copy, ArrowLeft
} from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface WalletProps {
  onApplyInstant: (schemeId: string) => void;
  langCode?: string;
  onGoBack?: () => void;
}

export const DigiLockerWallet: React.FC<WalletProps> = ({ 
  onApplyInstant, 
  langCode = 'en',
  onGoBack
}) => {
  const t = getTranslation(langCode);
  const [activeSubTab, setActiveSubTab] = useState<'digilocker' | 'vault'>('digilocker');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedDocForPreview, setSelectedDocForPreview] = useState<any | null>(null);
  const [isApplyingModalOpen, setIsApplyingModalOpen] = useState(false);
  const [selectedSchemeToApply, setSelectedSchemeToApply] = useState(MOTA_SCHEMES[1].id);
  const [applySuccessMessage, setApplySuccessMessage] = useState<string | null>(null);

  const handleUnlockWithPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === '123456' || enteredPin.length === 6) {
      setIsVaultUnlocked(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      setPinError(true);
    }
  };

  const handleBiometricUnlock = () => {
    // Simulated instant biometric authentication
    setIsVaultUnlocked(true);
    setPinError(false);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard?.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleInstantApplySubmit = () => {
    const scheme = MOTA_SCHEMES.find(s => s.id === selectedSchemeToApply);
    setApplySuccessMessage(`Instant 1-Tap Application Submitted for ${scheme?.name || 'Scholarship'}! All 4 DigiLocker documents attached without re-upload.`);
    setTimeout(() => {
      setIsApplyingModalOpen(false);
      setApplySuccessMessage(null);
    }, 2800);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-[#235E4B] text-white p-5 sm:p-6 shadow-xl border border-amber-600/40">
        <div className="absolute right-0 top-0 opacity-15 pointer-events-none">
          <WarliPattern variant="sun" color="#FDE68A" className="w-24 h-24" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold border border-emerald-600/40">
                Cryptographic Sovereign Storage
              </span>
              <span className="text-xs text-amber-300 font-mono">DigiLocker Certified</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {t.walletTitle}
            </h2>
            <p className="text-xs text-emerald-100 max-w-md mt-0.5">
              {t.walletSubtitle}
            </p>
          </div>

          {/* 1-Tap Instant Apply Button */}
          <button
            onClick={() => setIsApplyingModalOpen(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 text-stone-950 fill-stone-950" />
            <span>{t.oneTapApplyActive}</span>
          </button>
        </div>

        {/* Tab Switcher: DigiLocker Verified Docs vs Biometric Private Vault */}
        <div className="mt-5 flex border-b border-emerald-800/80">
          <button
            onClick={() => setActiveSubTab('digilocker')}
            className={`flex items-center space-x-2 pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 ${
              activeSubTab === 'digilocker'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{t.digiLockerRepoTab} ({MOCK_WALLET_DOCUMENTS.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('vault')}
            className={`flex items-center space-x-2 pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 ${
              activeSubTab === 'vault'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{t.biometricVaultTab} ({MOCK_VAULT_ITEMS.length})</span>
            {isVaultUnlocked && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* SUBTAB 1: DIGILOCKER VERIFIED REPOSITORY */}
      {activeSubTab === 'digilocker' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span className="font-semibold text-stone-700">Pre-Verified Credentials (No re-upload needed)</span>
            <span className="text-emerald-700 font-medium flex items-center">
              <CheckCircle className="w-3.5 h-3.5 mr-1 text-emerald-600" />
              Auto-Synced with National Repositories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_WALLET_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {doc.badge}
                      </span>
                      <h4 className="font-bold text-stone-900 text-sm mt-1">
                        {doc.title}
                      </h4>
                    </div>
                    <FileCheck2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  </div>

                  <div className="mt-2.5 space-y-1 text-xs text-stone-600">
                    <p>
                      Doc No: <code className="font-mono text-stone-800 font-semibold">{doc.docNumber}</code>
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Authority: {doc.authority}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Issued / Valid: {doc.issuedDate}
                    </p>
                  </div>
                </div>

                {/* Hash and Preview actions */}
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedDocForPreview(doc)}
                    className="text-xs font-bold text-[#235E4B] hover:text-emerald-800 flex items-center"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    <span>Inspect Record</span>
                  </button>

                  <button
                    onClick={() => handleCopyHash(doc.hash)}
                    className="text-[11px] text-stone-500 hover:text-stone-800 font-mono flex items-center"
                    title="Copy SHA256 verification hash"
                  >
                    <Copy className="w-3 h-3 mr-1" />
                    <span>{copiedHash === doc.hash ? 'Hash Copied!' : 'Copy Hash'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: BIOMETRIC TRIBAL KEY VAULT */}
      {activeSubTab === 'vault' && (
        <div className="space-y-4">
          {!isVaultUnlocked ? (
            /* Locked State with PIN & Biometrics */
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center max-w-md mx-auto border border-stone-200 shadow-md">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-4 ring-8 ring-amber-50/50">
                <Lock className="w-8 h-8 text-[#D97706]" />
              </div>

              <h3 className="text-xl font-extrabold text-stone-900">
                Hardware-Secured Tribal Vault
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Protect sensitive ancestral forest land titles (FRA 2006) and personal banking records. Enter your 6-digit Vault PIN or use Biometrics.
              </p>

              {/* Demo PIN Hint */}
              <div className="mt-3 p-2 bg-amber-50 rounded-lg text-xs text-amber-900 border border-amber-200 font-mono">
                🔑 Demo Test PIN: <strong>123456</strong>
              </div>

              <form onSubmit={handleUnlockWithPin} className="mt-5 space-y-4">
                <input
                  type="password"
                  maxLength={6}
                  value={enteredPin}
                  onChange={(e) => {
                    setEnteredPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter 6-digit PIN"
                  className={`w-48 text-center tracking-widest text-lg font-bold py-2 border rounded-xl focus:outline-none focus:ring-2 ${
                    pinError
                      ? 'border-rose-500 focus:ring-rose-400 bg-rose-50'
                      : 'border-stone-300 focus:ring-amber-500 focus:border-amber-500'
                  }`}
                />

                {pinError && (
                  <p className="text-xs text-rose-600 font-medium">
                    Incorrect PIN. Please use 123456.
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#235E4B] hover:bg-[#1A4739] text-white font-bold text-xs shadow-md transition-all"
                  >
                    Unlock with PIN
                  </button>

                  <button
                    type="button"
                    onClick={handleBiometricUnlock}
                    className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                  >
                    <Fingerprint className="w-4 h-4 text-amber-700" />
                    <span>Touch ID / Face Biometrics</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Unlocked State - Sensitive Records Available */
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-xs">
                <div className="flex items-center space-x-2 text-emerald-900 font-bold">
                  <Unlock className="w-4 h-4 text-emerald-700" />
                  <span>Tribal Vault Unlocked (Hardware AES-256 Active)</span>
                </div>
                <button
                  onClick={() => setIsVaultUnlocked(false)}
                  className="px-2.5 py-1 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 text-[11px] font-semibold"
                >
                  Lock Vault
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_VAULT_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 border border-amber-300/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900">
                          {item.secureLevel}
                        </span>
                        <Lock className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="font-bold text-stone-900 text-sm mt-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>Type: {item.fileType}</span>
                      <button
                        onClick={() => alert(`Encrypted file securely cached: ${item.title}`)}
                        className="text-[#235E4B] font-bold hover:underline"
                      >
                        View Decrypted
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1-Tap Application Modal */}
      {isApplyingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setIsApplyingModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase">
              <Zap className="w-4 h-4 fill-amber-600" />
              <span>Zero-Friction 1-Tap Portal</span>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mt-1">
              Apply with DigiLocker Credentials
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              No paper scanning needed. Your pre-verified caste, income, and academic records will be bundled automatically.
            </p>

            {applySuccessMessage ? (
              <div className="mt-5 p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 font-medium space-y-1 animate-in zoom-in-95">
                <CheckCircle className="w-6 h-6 text-emerald-600 mb-1" />
                <p className="font-bold text-sm">Application Successfully Dispatched!</p>
                <p>{applySuccessMessage}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Select Target MoTA Scholarship Scheme:
                  </label>
                  <select
                    value={selectedSchemeToApply}
                    onChange={(e) => setSelectedSchemeToApply(e.target.value)}
                    className="w-full bg-stone-100 border border-stone-300 text-xs rounded-xl p-2.5 font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#235E4B]"
                  >
                    {MOTA_SCHEMES.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.annualGrant})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1.5">
                  <span className="font-bold text-stone-700 block">Documents to Auto-Attach:</span>
                  <div className="space-y-1 text-stone-600">
                    <div className="flex items-center text-emerald-700 font-medium">
                      ✓ ST Caste Certificate (SDO Dumka)
                    </div>
                    <div className="flex items-center text-emerald-700 font-medium">
                      ✓ Family Income Certificate (&lt; ₹2.50L)
                    </div>
                    <div className="flex items-center text-emerald-700 font-medium">
                      ✓ Class 12th Board Marksheet (JAC Distinction)
                    </div>
                    <div className="flex items-center text-emerald-700 font-medium">
                      ✓ Bank of India Passbook (NPCI DBT Active)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleInstantApplySubmit}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#235E4B] to-[#235848] hover:brightness-110 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>Confirm & Transmit via DigiLocker</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Document Inspector Modal */}
      {selectedDocForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-stone-200 relative">
            <button
              onClick={() => setSelectedDocForPreview(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {selectedDocForPreview.badge}
            </span>

            <h3 className="text-lg font-bold text-stone-900 mt-2">
              {selectedDocForPreview.title}
            </h3>

            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Certificate Number</span>
                <span className="font-mono font-bold text-stone-800">{selectedDocForPreview.docNumber}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Issuing Authority</span>
                <span className="font-medium text-stone-700">{selectedDocForPreview.authority}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px] uppercase">Cryptographic Integrity Hash</span>
                <span className="font-mono text-[10px] text-stone-600 break-all">{selectedDocForPreview.hash}</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => {
                  alert(`Downloading cryptographic e-signed certificate: ${selectedDocForPreview.title}`);
                  setSelectedDocForPreview(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#235E4B] hover:bg-[#1A4739] text-white font-bold text-xs shadow-md transition-all text-center flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download E-Signed PDF</span>
              </button>
              <button
                onClick={() => setSelectedDocForPreview(null)}
                className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
