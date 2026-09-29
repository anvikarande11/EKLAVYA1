import React from 'react';

interface WarliProps {
  className?: string;
  variant?: 'border' | 'mandala' | 'tree' | 'sun' | 'dancers';
  color?: string;
}

export const WarliPattern: React.FC<WarliProps> = ({ 
  className = '', 
  variant = 'border',
  color = 'currentColor' 
}) => {
  if (variant === 'border') {
    return (
      <svg 
        className={`w-full h-3 overflow-hidden ${className}`} 
        viewBox="0 0 600 20" 
        fill="none" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 10 L15 0 L30 10 L45 0 L60 10 L75 0 L90 10 L105 0 L120 10 L135 0 L150 10 L165 0 L180 10 L195 0 L210 10 L225 0 L240 10 L255 0 L270 10 L285 0 L300 10 L315 0 L330 10 L345 0 L360 10 L375 0 L390 10 L405 0 L420 10 L435 0 L450 10 L465 0 L480 10 L495 0 L510 10 L525 0 L540 10 L555 0 L570 10 L585 0 L600 10" 
          stroke={color} 
          strokeWidth="1.8" 
          strokeLinecap="round" 
        />
        <path 
          d="M0 15 L15 20 L30 15 L45 20 L60 15 L75 20 L90 15 L105 20 L120 15 L135 20 L150 15 L165 20 L180 15 L195 20 L210 15 L225 20 L240 15 L255 20 L270 15 L285 20 L300 15 L315 20 L330 15 L345 20 L360 15 L375 20 L390 15 L405 20 L420 15 L435 20 L450 15 L465 20 L480 15 L495 20 L510 15 L525 20 L540 15 L555 20 L570 15 L585 20 L600 15" 
          stroke={color} 
          strokeWidth="1.2" 
          strokeOpacity="0.6" 
          strokeLinecap="round" 
        />
      </svg>
    );
  }

  if (variant === 'sun') {
    return (
      <svg className={`w-12 h-12 ${className}`} viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="20" stroke={color} strokeWidth="3" />
        <circle cx="50" cy="50" r="10" fill={color} fillOpacity="0.2" />
        {/* Rays */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 50 + 26 * Math.cos(angle);
          const y1 = 50 + 26 * Math.sin(angle);
          const x2 = 50 + 40 * Math.cos(angle);
          const y2 = 50 + 40 * Math.sin(angle);
          return (
            <line 
              key={i} 
              x1={x1} 
              y1={y1} 
              x2={x2} 
              y2={y2} 
              stroke={color} 
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
          );
        })}
      </svg>
    );
  }

  if (variant === 'dancers') {
    return (
      <svg className={`h-8 w-28 ${className}`} viewBox="0 0 120 40" fill="none">
        {/* Warli Dancers in line holding hands */}
        {[15, 45, 75, 105].map((cx, i) => (
          <g key={i}>
            {/* Head */}
            <circle cx={cx} cy="10" r="4" fill={color} />
            {/* Upper triangle */}
            <polygon points={`${cx - 5},14 ${cx + 5},14 ${cx},22`} fill={color} />
            {/* Lower triangle */}
            <polygon points={`${cx},22 ${cx - 5},30 ${cx + 5},30`} fill={color} />
            {/* Legs */}
            <line x1={cx - 3} y1="30" x2={cx - 6} y2="38" stroke={color} strokeWidth="1.8" />
            <line x1={cx + 3} y1="30" x2={cx + 6} y2="38" stroke={color} strokeWidth="1.8" />
            {/* Arms connected */}
            <line x1={cx} y1="18" x2={cx + 15} y2="20" stroke={color} strokeWidth="1.5" />
            <line x1={cx} y1="18" x2={cx - 15} y2="20" stroke={color} strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    );
  }

  // Sacred Tree (Kalpavriksha)
  return (
    <svg className={`w-16 h-16 ${className}`} viewBox="0 0 100 100" fill="none">
      <line x1="50" y1="88" x2="50" y2="40" stroke={color} strokeWidth="4" strokeLinecap="round" />
      {/* Branches */}
      <path d="M50 70 Q30 55 20 45" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 70 Q70 55 80 45" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 55 Q35 40 28 25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 55 Q65 40 72 25" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 40 Q45 20 50 10" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves / Sacred dots */}
      <circle cx="20" cy="45" r="3.5" fill={color} />
      <circle cx="80" cy="45" r="3.5" fill={color} />
      <circle cx="28" cy="25" r="3.5" fill={color} />
      <circle cx="72" cy="25" r="3.5" fill={color} />
      <circle cx="50" cy="10" r="4" fill={color} />
      {/* Roots */}
      <path d="M50 88 L35 96 M50 88 L65 96 M50 88 L50 98" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};
