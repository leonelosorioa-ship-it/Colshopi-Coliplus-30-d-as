import React from 'react';

interface BiankaAvatarProps {
  size?: number | string;
  className?: string;
  showBadge?: boolean;
}

export const BiankaAvatar: React.FC<BiankaAvatarProps> = ({
  size = 56,
  className = '',
  showBadge = false
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-[#10B981] shadow-md bg-linear-to-b from-[#0F766E] to-[#042F2E] ${className}`}
      style={{ width: dimension, height: dimension }}
      title="Bianka - Guía de Bienestar & Hábitos Saludables ColShopi"
    >
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full object-cover"
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#0F766E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#042F2E" stopOpacity="1" />
          </radialGradient>
          {/* Cyan Neon Circle in Background like the uploaded photo */}
          <linearGradient id="neonCircle" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBD38D" />
            <stop offset="100%" stopColor="#E2A66C" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#271815" />
          </linearGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
        </defs>

        {/* Store background & subtle wooden shelves effect */}
        <rect width="160" height="160" fill="url(#bgGlow)" />
        <rect x="0" y="30" width="40" height="4" fill="#78350F" opacity="0.3" />
        <rect x="120" y="30" width="40" height="4" fill="#78350F" opacity="0.3" />
        <rect x="0" y="60" width="35" height="4" fill="#78350F" opacity="0.3" />
        <rect x="125" y="60" width="35" height="4" fill="#78350F" opacity="0.3" />

        {/* Neon Halo / Circular Sign in background */}
        <circle cx="35" cy="40" r="30" fill="none" stroke="url(#neonCircle)" strokeWidth="3" opacity="0.65" />
        <text x="35" y="42" fill="#22D3EE" fontSize="7" fontWeight="bold" textAnchor="middle" opacity="0.75">ColShopi</text>

        {/* Back Hair */}
        <path d="M40 70 Q35 110 50 125 Q80 135 110 125 Q125 110 120 70 Z" fill="url(#hairGrad)" />

        {/* Shoulders & White Medical/Wellness Lab Coat */}
        <path
          d="M20 160 L30 115 Q50 102 80 102 Q110 102 130 115 L140 160 Z"
          fill="url(#coatGrad)"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        {/* Inner Shirt (Coli Plus teal) */}
        <path d="M68 102 L80 125 L92 102 Z" fill="#0D9488" />

        {/* Lab Coat Lapels */}
        <path d="M52 105 L72 135 L62 160 L28 160 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />
        <path d="M108 105 L88 135 L98 160 L132 160 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="0.5" />

        {/* Neck */}
        <path d="M70 82 L70 106 Q80 112 90 106 L90 82 Z" fill="url(#skinGrad)" />

        {/* Face */}
        <ellipse cx="80" cy="72" rx="25" ry="30" fill="url(#skinGrad)" />

        {/* Warm Smiling Eyes */}
        <ellipse cx="69" cy="68" rx="4" ry="2.6" fill="#271815" />
        <circle cx="70.5" cy="67" r="1.2" fill="#FFFFFF" />
        <ellipse cx="91" cy="68" rx="4" ry="2.6" fill="#271815" />
        <circle cx="92.5" cy="67" r="1.2" fill="#FFFFFF" />

        {/* Eyebrows */}
        <path d="M63 62 Q70 60 76 63" stroke="#271815" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M84 63 Q90 60 97 62" stroke="#271815" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <path d="M80 70 Q81 76 78 77 Q82 78 84 76" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.6" />

        {/* Warm Smiling Mouth with friendly teeth and rosy lips */}
        <path d="M71 83 Q80 93 89 83 Q80 87 71 83 Z" fill="#E11D48" />
        <path d="M74 84 Q80 87 86 84" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />

        {/* Rosy Cheeks */}
        <ellipse cx="63" cy="76" rx="4.5" ry="2.5" fill="#FDA4AF" opacity="0.5" />
        <ellipse cx="97" cy="76" rx="4.5" ry="2.5" fill="#FDA4AF" opacity="0.5" />

        {/* Front Stylish Brunette Hair with side part */}
        <path
          d="M55 60 C55 35 105 35 105 60 C108 72 108 85 104 94 C99 90 97 75 97 70 C90 52 70 52 60 62 C57 74 58 88 56 94 C52 85 52 72 55 60 Z"
          fill="url(#hairGrad)"
        />

        {/* Name Tag Badge on Lab Coat: "BIANKA" */}
        <rect x="94" y="118" width="30" height="11" rx="2" fill="#0B132B" stroke="#00E5FF" strokeWidth="0.8" />
        <text x="109" y="126" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.8">
          BIANKA
        </text>
      </svg>

      {showBadge && (
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full shadow-xs" title="En línea para acompañarte" />
      )}
    </div>
  );
};
