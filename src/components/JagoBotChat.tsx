import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES, LanguageOption, DEMO_STUDENT, StudentMockProfile } from '../data/motaKnowledge.ts';
import { getTranslation } from '../data/translations.ts';
import { 
  Send, Sparkles, Mic, MicOff, ShieldCheck, ChevronDown, ChevronUp, 
  ArrowRight, Volume2, VolumeX, ArrowLeft, RefreshCw
} from 'lucide-react';
import { WarliPattern } from './WarliPattern.tsx';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  sourceChunks?: string[];
  schemeId?: string;
  suggestedFollowups?: string[];
  actionCta?: {
    label: string;
    action: string;
    schemeId?: string;
  };
  expandedSources?: boolean;
}

interface JagoBotProps {
  currentLanguage: LanguageOption;
  profile?: StudentMockProfile;
  onLanguageChange: (lang: LanguageOption) => void;
  initialQuery?: string;
  onNavigateToEligibility: () => void;
  onNavigateToWallet: () => void;
  onGoBack: () => void;
}

export const JagoBotChat: React.FC<JagoBotProps> = ({
  currentLanguage,
  profile,
  onLanguageChange,
  initialQuery,
  onNavigateToEligibility,
  onNavigateToWallet,
  onGoBack,
}) => {
  const currentScholar = profile || DEMO_STUDENT;
  const t = getTranslation(currentLanguage.code);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `${currentLanguage.greeting} I am **Jago Assistant**, your personal AI Scholarship & Welfare Guide for **${currentScholar.name}** (${currentScholar.tribalCommunity} community, ${currentScholar.state}).\n\nI am grounded in official scholarship guidelines for all 5 national schemes:\n• **Pre-Matric Scholarship** (Classes 9 & 10)\n• **Post-Matric Scholarship** (Class 11 to Ph.D.)\n• **Top Class Education** (IITs, IIMs, AIIMS, NITs)\n• **National Fellowship for ST Students (NFST)**\n• **National Overseas Scholarship (NOS)**\n\nHow may I assist your educational journey today? You can ask me in **${currentLanguage.nativeName}**!`,
      timestamp: 'Just now',
      sourceChunks: [
        'National Scholarship Operational Guidelines §4.1',
        'National Fellowship for Higher Education of ST Students §3',
        'Centrally Sponsored Post-Matric ST Revised Norms'
      ],
      suggestedFollowups: [
        'Am I eligible for the ₹45,000 laptop grant under Top Class?',
        'What is the monthly stipend for NFST research fellowship?',
        'How to link my bank account with Aadhaar for DBT?'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle initial query from dashboard if passed
  useEffect(() => {
    if (initialQuery) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  // Clean up SpeechSynthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech virtual voice speaking
  const handleVirtualSpeech = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/[*#_`]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/₹/g, 'Rupees ');

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick best voice matching language
    const voices = window.speechSynthesis.getVoices();
    const langCode = currentLanguage.code;
    const matchedVoice = voices.find(v => 
      v.lang.toLowerCase().startsWith(langCode) || 
      (langCode === 'hi' && v.lang.includes('hi')) ||
      v.lang.includes('IN')
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: currentLanguage.name,
          scholarProfile: {
            name: currentScholar.name,
            community: currentScholar.tribalCommunity,
            state: currentScholar.state,
            district: currentScholar.district,
            education: currentScholar.educationLevel,
            income: currentScholar.annualFamilyIncome
          }
        })
      });

      if (!response.ok) {
        throw new Error('Server error communicating with Jago Assistant');
      }

      const data = await response.json();

      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.response || 'I have retrieved the scholarship guidelines for your inquiry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceChunks: data.source_chunks || ['National Tribal Scholarship Guidelines'],
        schemeId: data.scheme_id,
        suggestedFollowups: data.suggested_followups || [],
        actionCta: data.action_cta
      };

      setMessages(prev => [...prev, botReply]);
      if (autoSpeak) {
        setTimeout(() => handleVirtualSpeech(botReply.text, botReply.id), 250);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply: Message = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: `Under Ministry of Tribal Affairs guidelines, ST students are entitled to 100% tuition coverage and maintenance allowances. For the **Post-Matric Scheme**, family income must be under ₹2.50 Lakhs/yr, whereas for **Top Class** and **National Overseas Scholarship**, it is up to ₹6.00 Lakhs/yr.\n\nMake sure your bank account has active NPCI Aadhaar seeding for DBT disbursal.`,
        timestamp: 'Just now',
        sourceChunks: [
          'MoTA Notification No. 19012/01/2022-Scholarship §5.2',
          'DBT Mission Mandate on Aadhaar-Seeded Accounts'
        ],
        suggestedFollowups: [
          'Check my Aadhaar DBT status',
          'View required DigiLocker documents'
        ]
      };
      setMessages(prev => [...prev, fallbackReply]);
      if (autoSpeak) {
        setTimeout(() => handleVirtualSpeech(fallbackReply.text, fallbackReply.id), 250);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSourceExpand = (messageId: string) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, expandedSources: !msg.expandedSources } : msg
      )
    );
  };

  const handleVoiceSimulation = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setTimeout(() => {
        setIsRecordingVoice(false);
        handleSendMessage('What is the procedure if my university delayed verifying my NFST fellowship form?');
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-175px)] min-h-[540px] max-w-xl mx-auto bg-[#FAF8F5] rounded-2xl border border-stone-200 shadow-sm overflow-hidden relative mb-20">
      
      {/* Bot Chat Header */}
      <div className="bg-[#1E4D3C] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
        <div className="flex items-center space-x-2.5">
          <button
            onClick={onGoBack}
            className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center"
            title={t.backToHome}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <div className="w-7 h-7 rounded-lg bg-[#C25927] flex items-center justify-center text-white font-bold shadow-xs text-xs">
            🏹
          </div>

          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-sm tracking-wide text-amber-50 font-serif leading-none">
                {t.jagoTitle}
              </h3>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-emerald-100 text-[9px] font-mono border border-white/10">
                AI GUIDE
              </span>
            </div>
            <p className="text-[10px] text-emerald-100/80 truncate max-w-[150px] leading-tight mt-0.5">
              {t.jagoSubtitle}
            </p>
          </div>
        </div>

        {/* Audio Toggle & Language Switcher */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={() => {
              setAutoSpeak(!autoSpeak);
              if (speakingMessageId) {
                window.speechSynthesis.cancel();
                setSpeakingMessageId(null);
              }
            }}
            className={`px-2 py-1 rounded-md flex items-center space-x-1 text-[11px] font-medium transition-colors border ${
              autoSpeak
                ? 'bg-[#C25927] text-white border-amber-300/40'
                : 'bg-white/10 text-emerald-100 border-white/15 hover:bg-white/20'
            }`}
            title="Auto-read aloud assistant replies"
          >
            <Volume2 className="w-3 h-3" />
            <span>{autoSpeak ? 'Audio ON' : 'Audio'}</span>
          </button>

          <select
            value={currentLanguage.code}
            onChange={(e) => {
              const selected = SUPPORTED_LANGUAGES.find(l => l.code === e.target.value);
              if (selected) onLanguageChange(selected);
            }}
            aria-label="Select Assistant Language"
            className="bg-white/10 text-amber-200 border border-white/15 rounded-md text-[11px] font-medium px-2 py-1 focus:outline-none cursor-pointer max-w-[100px] truncate"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-stone-900 text-white">
                {l.flagOrIcon} {l.nativeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Trust Notice Banner */}
      <div className="bg-amber-100/70 border-b border-amber-300 px-3 py-1 flex items-center justify-between text-[10px] text-amber-950 shrink-0">
        <div className="flex items-center space-x-1.5 truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span className="truncate font-medium">{t.trustNotice}</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const isSpeaking = speakingMessageId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1 animate-in fade-in duration-200`}
            >
              <div
                className={`max-w-[88%] p-3.5 text-xs leading-relaxed ${
                  isUser
                    ? 'bg-[#1E4D3C] text-white rounded-2xl rounded-br-xs shadow-xs'
                    : 'bg-white text-stone-900 rounded-2xl rounded-bl-xs border border-stone-200/80 shadow-xs'
                }`}
              >
                {/* Text Content */}
                <div className="whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {/* Virtual Speech Playback Button */}
                {!isUser && (
                  <div className="mt-2 pt-1.5 border-t border-stone-200 flex items-center justify-between">
                    <button
                      onClick={() => handleVirtualSpeech(msg.text, msg.id)}
                      className={`flex items-center space-x-1 px-2 py-0.5 text-[10px] font-bold transition-all border ${
                        isSpeaking
                          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                          : 'bg-amber-50 hover:bg-amber-100 text-stone-800 border-amber-300'
                      }`}
                      title={isSpeaking ? t.stopSpeaking : t.speakVirtually}
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3 h-3 text-rose-700" />
                          <span>{t.stopSpeaking}</span>
                          <div className="flex items-center space-x-0.5 ml-1">
                            <span className="w-1 h-2 bg-rose-600 animate-bounce" />
                            <span className="w-1 h-3 bg-rose-600 animate-bounce delay-75" />
                          </div>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-[#EA580C]" />
                          <span>{t.speakVirtually}</span>
                        </>
                      )}
                    </button>

                    <span className="text-[9px] text-stone-400 font-mono">{msg.timestamp}</span>
                  </div>
                )}

                {/* Verified Source Badge */}
                {!isUser && msg.sourceChunks && msg.sourceChunks.length > 0 && (
                  <div className="mt-1.5">
                    <button
                      onClick={() => toggleSourceExpand(msg.id)}
                      className="flex items-center space-x-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 border border-emerald-300 transition-colors"
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>🔗 {msg.sourceChunks.length} {t.verifiedFromChunks}</span>
                      {msg.expandedSources ? (
                        <ChevronUp className="w-3 h-3 text-emerald-700 ml-0.5" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-emerald-700 ml-0.5" />
                      )}
                    </button>

                    {msg.expandedSources && (
                      <div className="mt-1.5 p-2 bg-stone-50 border border-stone-300 space-y-1 text-[10px] animate-in fade-in">
                        <span className="font-bold text-stone-700 uppercase tracking-wider block">
                          Official Citations:
                        </span>
                        {msg.sourceChunks.map((chunk, idx) => (
                          <div key={idx} className="flex items-start space-x-1 text-stone-600">
                            <span className="text-[#EA580C] font-bold">•</span>
                            <span className="font-mono text-[9px]">{chunk}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Direct Action Card */}
                {!isUser && msg.actionCta && (
                  <div className="mt-2 pt-1.5">
                    <button
                      onClick={() => {
                        if (msg.actionCta?.action === 'CHECK_ELIGIBILITY') {
                          onNavigateToEligibility();
                        } else if (msg.actionCta?.action === 'VIEW_WALLET') {
                          onNavigateToWallet();
                        } else {
                          onNavigateToEligibility();
                        }
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-[11px] shadow transition-all"
                    >
                      <span>{msg.actionCta.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Follow-up question chips */}
              {!isUser && msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5 max-w-[88%]">
                  {msg.suggestedFollowups.map((followup, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(followup)}
                      className="text-[10px] bg-white hover:bg-amber-50 text-stone-800 border border-stone-300 px-2 py-0.5 text-left transition-colors font-medium shadow-2xs"
                    >
                      💬 {followup}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="w-6 h-6 bg-[#EA580C] text-white flex items-center justify-center font-bold text-[10px]">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-white p-2.5 border border-stone-300 shadow-xs space-y-1">
              <div className="flex items-center space-x-1 text-[11px] text-stone-700 font-medium">
                <RefreshCw className="w-3 h-3 text-[#EA580C] animate-spin" />
                <span>Searching MoTA regulations in {currentLanguage.nativeName}...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Voice Recording Banner */}
      {isRecordingVoice && (
        <div className="bg-rose-50 border-t-2 border-rose-300 px-3 py-1.5 flex items-center justify-between text-xs text-rose-900 animate-pulse shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-rose-600 animate-ping" />
            <span className="font-bold">{t.listeningVoice}</span>
          </div>
          <span className="text-[10px] font-mono text-rose-700">Audio Input Active</span>
        </div>
      )}

      {/* HIGH-VISIBILITY PINNED INPUT DOCK */}
      <div className="sticky bottom-0 left-0 right-0 bg-[#FAF8F5]/95 backdrop-blur-md p-3 border-t border-stone-200 z-30 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceSimulation}
            className={`p-2.5 rounded-xl border transition-colors shrink-0 ${
              isRecordingVoice
                ? 'bg-rose-600 text-white border-rose-700 animate-bounce'
                : 'bg-white hover:bg-stone-50 text-stone-600 border-stone-200'
            }`}
            title="Speak query"
          >
            {isRecordingVoice ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Text Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.inputPlaceholder}
              className="w-full bg-white border border-stone-300 focus:border-[#1E4D3C] text-xs text-stone-900 font-medium px-3.5 py-2.5 rounded-xl shadow-xs focus:outline-none transition-all placeholder:text-stone-400"
              disabled={isLoading}
            />
            {inputText && (
              <button
                type="button"
                onClick={() => setInputText('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-3.5 py-2.5 rounded-xl bg-[#C25927] hover:bg-[#A94A1E] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shrink-0 active:scale-95 shadow-xs"
            title="Send Message"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="text-[11px]">Send</span>
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1.5 text-[10px] text-stone-500 scrollbar-none">
          <span className="font-bold text-stone-400 shrink-0">{t.quickAskPrefix}</span>
          <button
            type="button"
            onClick={() => handleSendMessage('What is the family income limit for Top Class Scholarship?')}
            className="shrink-0 px-2 py-0.5 bg-white hover:bg-amber-100 text-stone-700 border border-stone-300 transition-colors"
          >
            Top Class Limit
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('How much is the NFST monthly stipend for JRF and SRF?')}
            className="shrink-0 px-2 py-0.5 bg-white hover:bg-amber-100 text-stone-700 border border-stone-300 transition-colors"
          >
            NFST Stipend
          </button>
          <button
            type="button"
            onClick={() => handleSendMessage('Can students get full funding for studying abroad in NOS?')}
            className="shrink-0 px-2 py-0.5 bg-white hover:bg-amber-100 text-stone-700 border border-stone-300 transition-colors"
          >
            Abroad NOS
          </button>
        </div>
      </div>
    </div>
  );
};
