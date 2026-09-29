import React from 'react';
import { Home, MessageSquareQuote, WalletCards, BookOpenCheck, SlidersHorizontal } from 'lucide-react';
import { getTranslation } from '../data/translations.ts';

export type NavTab = 'dashboard' | 'chat' | 'wallet' | 'schemes' | 'tools';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  langCode: string;
  unreadChatBadge?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  langCode,
  unreadChatBadge = false
}) => {
  const t = getTranslation(langCode);

  const tabs = [
    {
      id: 'dashboard' as NavTab,
      label: t.home,
      icon: Home,
    },
    {
      id: 'chat' as NavTab,
      label: t.jagoBot,
      icon: MessageSquareQuote,
      badge: unreadChatBadge,
      highlight: true
    },
    {
      id: 'wallet' as NavTab,
      label: t.wallet,
      icon: WalletCards,
    },
    {
      id: 'schemes' as NavTab,
      label: t.schemes,
      icon: BookOpenCheck,
    },
    {
      id: 'tools' as NavTab,
      label: t.tools,
      icon: SlidersHorizontal,
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FAF7F2] border-t-2 border-[#235E4B] shadow-[0_-4px_20px_rgba(0,0,0,0.12)] py-1 px-2 safe-bottom">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 transition-all duration-150 flex-1 ${
                isActive
                  ? 'text-[#235E4B] font-extrabold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {/* Active top line accent */}
              {isActive && (
                <span className="absolute top-0 left-1/4 right-1/4 h-1 bg-[#EA580C]" />
              )}

              {/* Icon Container with Badge */}
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px] text-[#235E4B]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EA580C] animate-ping" />
                )}
                {tab.highlight && !isActive && (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#EA580C] text-white text-[7px] font-black leading-none">
                    AI
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-[10px] tracking-tight mt-0.5 truncate max-w-[64px] ${isActive ? 'text-[#235E4B] font-extrabold' : 'text-stone-600 font-medium'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
