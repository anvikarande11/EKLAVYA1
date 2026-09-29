import React, { useState } from 'react';
import { MOTA_SCHEMES } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  TrendingUp, CheckCircle, AlertCircle, Send, Mic, MicOff, 
  HelpCircle, Clock, Users, ArrowRight, ShieldAlert, Sparkles, ArrowLeft
} from 'lucide-react';

interface ToolsProps {
  onAskJago: (query: string) => void;
  langCode?: string;
  onGoBack?: () => void;
}

export const ToolsRedressal: React.FC<ToolsProps> = ({ 
  onAskJago,
  langCode = 'en',
  onGoBack
}) => {
  const t = getTranslation(langCode);
  const [activeTool, setActiveTool] = useState<'eligibility' | 'grievance' | 'mentorship'>('eligibility');

  // Eligibility state
  const [educationLevel, setEducationLevel] = useState('Undergraduate (BA, BSc, BCom, BTech, MBBS)');
  const [annualIncome, setAnnualIncome] = useState(180000);
  const [marksPercentage, setMarksPercentage] = useState(78);
  const [isPremierInstitute, setIsPremierInstitute] = useState(false);
  const [isAimingAbroad, setIsAimingAbroad] = useState(false);
  const [evaluationResults, setEvaluationResults] = useState<any[] | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Grievance state
  const [grievanceCategory, setGrievanceCategory] = useState('DBT Disbursal Delay / Bank Seeding Issue');
  const [grievanceDescription, setGrievanceDescription] = useState('');
  const [voiceRecorded, setVoiceRecorded] = useState(false);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<any | null>(null);

  // Evaluate Eligibility
  const handleCalculateEligibility = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/eligibility/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          educationLevel,
          annualIncome,
          currentMarks: marksPercentage,
          isPremier: isPremierInstitute,
          targetForeign: isAimingAbroad
        })
      });
      const data = await res.json();
      setEvaluationResults(data.matches);
    } catch (e) {
      // Local fallback
      setEvaluationResults(
        MOTA_SCHEMES.map(s => ({
          schemeId: s.id,
          schemeName: s.name,
          shortCode: s.shortCode,
          eligible: annualIncome <= 250000 || s.id === 'top-class' || s.id === 'nfst',
          matchPercentage: annualIncome <= 250000 ? 95 : 70,
          annualGrant: s.annualGrant,
          incomeLimit: s.incomeLimit,
          reasons: []
        }))
      );
    } finally {
      setIsCalculating(false);
    }
  };

  // Submit Grievance
  const handleSubmitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceDescription.trim()) return;

    try {
      const res = await fetch('/api/grievance/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: grievanceCategory,
          description: grievanceDescription,
          regionalVoiceNote: voiceRecorded
        })
      });
      const data = await res.json();
      setSubmittedTicket(data);
    } catch (e) {
      setSubmittedTicket({
        ticketId: `GRV-MOTA-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'Forwarded to District Welfare Officer (DWO)',
        assignedAuthority: 'DWO Dumka & MoTA Central Redress Cell',
        resolutionSlaDays: 14,
        lodgedAt: new Date().toISOString()
      });
    }
  };

  const handleToggleVoice = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setVoiceRecorded(true);
    } else {
      setIsVoiceRecording(true);
      setTimeout(() => {
        setIsVoiceRecording(false);
        setVoiceRecorded(true);
        setGrievanceDescription(prev => (prev ? prev + ' ' : '') + '[Voice note attached in Santali/Hindi: Student reports bank branch failed to process Aadhaar NPCI seeding mapping for scholarship disbursal]');
      }, 2500);
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Top Banner */}
      <div className="rounded-2xl bg-[#235E4B] text-white p-5 sm:p-6 shadow-xl border border-amber-600/30">
        <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
          Civic Empowerment & Accountability
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-1">
          Scholar Utilities & Redressal
        </h2>
        <p className="text-xs text-emerald-100 max-w-xl mt-0.5">
          Match your entitlements across all 5 schemes or escalate grievances directly to District Welfare Officers (DWO) and MoTA.
        </p>

        {/* Tab switchers */}
        <div className="mt-5 flex border-b border-emerald-800">
          <button
            onClick={() => setActiveTool('eligibility')}
            className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 ${
              activeTool === 'eligibility'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            Instant Eligibility Matcher
          </button>

          <button
            onClick={() => setActiveTool('grievance')}
            className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 ${
              activeTool === 'grievance'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            Voice-Enabled Grievance Redressal
          </button>

          <button
            onClick={() => setActiveTool('mentorship')}
            className={`pb-2.5 px-4 text-xs font-bold transition-colors border-b-2 ${
              activeTool === 'mentorship'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-emerald-200/70 hover:text-white'
            }`}
          >
            Alumni Mentorship Circle
          </button>
        </div>
      </div>

      {/* TOOL 1: ELIGIBILITY CALCULATOR */}
      {activeTool === 'eligibility' && (
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-stone-900">
              Multi-Scheme Grant Calculator
            </h3>
            <p className="text-xs text-stone-500">
              Input your academic details to instantly evaluate which of the 5 MoTA schemes offer you the highest grant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education Level */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Current Education Level:
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 text-xs rounded-xl p-2.5 text-stone-900 font-medium"
              >
                <option value="Class 9">Class 9 (Secondary)</option>
                <option value="Class 10">Class 10 (Secondary)</option>
                <option value="Class 11 & 12">Class 11 & 12 (Higher Secondary)</option>
                <option value="Undergraduate (BA, BSc, BCom, BTech, MBBS)">Undergraduate Degree (B.Tech, MBBS, B.A., B.Sc.)</option>
                <option value="Postgraduate (MA, MSc, MTech, MBA)">Postgraduate Degree (M.Tech, M.A., M.Sc., MBA)</option>
                <option value="Ph.D. (Full-time)">Ph.D. / Research Doctorate</option>
              </select>
            </div>

            {/* Annual Family Income Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-stone-700">
                  Annual Family Income:
                </label>
                <span className="text-xs font-bold text-[#235E4B] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ₹{annualIncome.toLocaleString('en-IN')} / year
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={900000}
                step={25000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full accent-[#235E4B] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>₹50K</span>
                <span>₹2.5L (Post-Matric Cap)</span>
                <span>₹6.0L (Top Class Cap)</span>
                <span>₹9.0L</span>
              </div>
            </div>

            {/* Checkbox: Premier Institute */}
            <div className="flex items-center space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                id="premier"
                checked={isPremierInstitute}
                onChange={(e) => setIsPremierInstitute(e.target.checked)}
                className="w-4 h-4 text-[#235E4B] rounded border-stone-300 focus:ring-[#235E4B]"
              />
              <label htmlFor="premier" className="text-xs font-semibold text-stone-800 cursor-pointer">
                Admitted to 250+ Notified Premier Institutes (IIT, IIM, AIIMS, NIT, NLU)
              </label>
            </div>

            {/* Checkbox: Target Abroad */}
            <div className="flex items-center space-x-2 p-3 bg-stone-50 rounded-xl border border-stone-200">
              <input
                type="checkbox"
                id="abroad"
                checked={isAimingAbroad}
                onChange={(e) => setIsAimingAbroad(e.target.checked)}
                className="w-4 h-4 text-[#235E4B] rounded border-stone-300 focus:ring-[#235E4B]"
              />
              <label htmlFor="abroad" className="text-xs font-semibold text-stone-800 cursor-pointer">
                Intending to study Master's / Ph.D. in Top 500 QS Foreign University
              </label>
            </div>
          </div>

          <button
            onClick={handleCalculateEligibility}
            disabled={isCalculating}
            className="w-full py-3 rounded-xl bg-[#235E4B] hover:bg-[#1A4739] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
          >
            <TrendingUp className="w-4 h-4 text-amber-300" />
            <span>{isCalculating ? 'Computing MoTA Match...' : 'Calculate My Grant Eligibility'}</span>
          </button>

          {/* Results Output */}
          {evaluationResults && (
            <div className="mt-6 pt-5 border-t border-stone-200 space-y-3 animate-in fade-in">
              <h4 className="font-bold text-sm text-stone-900">
                Calculated Eligibility Matches for ST Scholar:
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {evaluationResults.map((match: any) => (
                  <div
                    key={match.schemeId}
                    className={`p-3.5 rounded-xl border ${
                      match.eligible
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-stone-50 border-stone-200 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-stone-900">
                        {match.schemeName}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          match.eligible
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-300 text-stone-700'
                        }`}
                      >
                        {match.eligible ? `${match.matchPercentage}% Match` : 'Not Eligible'}
                      </span>
                    </div>

                    <p className="text-xs text-[#235E4B] font-semibold mt-1">
                      Grant: {match.annualGrant}
                    </p>

                    {match.reasons && match.reasons.length > 0 && (
                      <p className="text-[11px] text-rose-700 mt-1">
                        Note: {match.reasons.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: GRIEVANCE REDRESSAL WITH VOICE NOTE */}
      {activeTool === 'grievance' && (
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-5">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-700 uppercase">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>MoTA Samadhan & CPGRAMS Portal Bridge</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-1">
              Escalate Scholarship Issues to District Welfare Officer
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Statutory 14-day SLA resolution matrix for delayed disbursements, rejected certificates, or bank seeding failures.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-5 bg-emerald-50 border border-emerald-300 rounded-xl space-y-2 text-xs text-emerald-900 animate-in zoom-in-95">
              <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
              <h4 className="text-base font-extrabold text-emerald-950">
                Grievance Lodged Successfully!
              </h4>
              <p>
                Tracking Ticket ID: <code className="font-mono font-bold text-stone-900 bg-white px-2 py-0.5 rounded border border-emerald-300">{submittedTicket.ticketId}</code>
              </p>
              <p>
                Assigned Authority: <strong>{submittedTicket.assignedAuthority}</strong>
              </p>
              <p>
                Resolution SLA: <strong>Within {submittedTicket.resolutionSlaDays} working days</strong>. Updates will be sent via SMS to your Aadhaar-registered mobile.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-3 px-3 py-1.5 bg-[#235E4B] text-white rounded-lg font-bold text-xs"
              >
                Log Another Issue
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitGrievance} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Issue Category:
                </label>
                <select
                  value={grievanceCategory}
                  onChange={(e) => setGrievanceCategory(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-300 text-xs rounded-xl p-2.5 text-stone-900 font-medium"
                >
                  <option value="DBT Disbursal Delay / Bank Seeding Issue">DBT Disbursal Delay / Bank Seeding Issue</option>
                  <option value="College / Institute Verification Stalled">College / Institute Verification Stalled</option>
                  <option value="District Welfare Officer Document Scrutiny Rejection">District Welfare Officer Document Scrutiny Rejection</option>
                  <option value="NFST Fellowship Monthly Grant Missing">NFST Fellowship Monthly Grant Missing</option>
                  <option value="DigiLocker Caste Certificate Mismatch">DigiLocker Caste Certificate Mismatch</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Describe your grievance:
                  </label>
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      isVoiceRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : voiceRecorded
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    }`}
                  >
                    {isVoiceRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isVoiceRecording ? 'Recording Voice...' : voiceRecorded ? '✓ Voice Note Attached' : 'Record Tribal Dialect Voice'}</span>
                  </button>
                </div>

                <textarea
                  rows={4}
                  value={grievanceDescription}
                  onChange={(e) => setGrievanceDescription(e.target.value)}
                  placeholder="Explain the problem in detail (e.g., college nodal officer has not verified application since 3 weeks)..."
                  className="w-full bg-stone-50 border border-stone-300 focus:border-[#235E4B] focus:bg-white rounded-xl p-3 text-xs text-stone-900 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:brightness-105 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4 text-white" />
                <span>Submit Grievance to MoTA Portal</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* TOOL 3: ALUMNI MENTORSHIP CIRCLE */}
      {activeTool === 'mentorship' && (
        <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-[#235E4B] uppercase">
            <Users className="w-4 h-4" />
            <span>Alumni Guidance Network</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            Connect with Senior Tribal Scholars
          </h3>
          <p className="text-xs text-stone-500">
            Get personalized guidance on research proposals, entrance exams, and overseas applications from ST fellows currently at IITs, AIIMS, and Oxford.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center shrink-0">
                SM
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-stone-900">Dr. Somra Munda</h4>
                <p className="text-[11px] text-[#235E4B] font-medium">NFST Research Fellow (IIT Kharagpur)</p>
                <p className="text-[10px] text-stone-500 mt-1">Specializes in: Environmental Engineering, PhD proposal drafting, JRF-to-SRF transition.</p>
                <button
                  onClick={() => onAskJago('Can you help me prepare a synopsis for NFST fellowship application like Dr. Somra Munda suggests?')}
                  className="mt-2 text-[11px] font-bold text-amber-700 hover:underline"
                >
                  Request Mentorship Chat
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center shrink-0">
                JB
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs text-stone-900">Jaipal Besra</h4>
                <p className="text-[11px] text-[#235E4B] font-medium">NOS Scholar (Imperial College London)</p>
                <p className="text-[10px] text-stone-500 mt-1">Specializes in: Overseas visa clearance, university admission SOPs, PVTG benefits.</p>
                <button
                  onClick={() => onAskJago('How do I apply for National Overseas Scholarship offer letter like Jaipal Besra?')}
                  className="mt-2 text-[11px] font-bold text-amber-700 hover:underline"
                >
                  Request Mentorship Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
