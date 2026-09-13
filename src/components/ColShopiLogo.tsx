import React from 'react';

interface ColShopiLogoProps {
  className?: string;
  size?: number;
}

export const ColShopiLogo: React.FC<ColShopiLogoProps> = ({
  className = '',
  size = 48
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="ColShopi Tienda By Leps Digital"
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.45)]"
      >
        <defs>
          {/* Glowing cyan gradients matching the 2026 transparent logo */}
          <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#0891B2" stopOpacity="0.08" />
            <stop offset="95%" stopColor="#00F0FF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cyanRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="50%" stopColor="#00F0FF" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <filter id="cyanNeonFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer ambient glow */}
        <circle cx="100" cy="100" r="94" fill="url(#neonGlow)" />

        {/* Circular Double Neon Ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#00E5FF"
          strokeWidth="4"
          filter="url(#cyanNeonFilter)"
        />
        <circle
          cx="100"
          cy="100"
          r="84"
          fill="#0B132B"
          stroke="#38BDF8"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Brand Text: Colshopi (Cursive / Script display) */}
        <text
          x="100"
          y="92"
          textAnchor="middle"
          fill="#00F0FF"
          stroke="#064E3B"
          strokeWidth="0.8"
          style={{
            fontFamily: "'Playfair Display', Georgia, cursive, serif",
            fontWeight: 800,
            fontSize: '37px',
            fontStyle: 'italic',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))'
          }}
        >
          Colshopi
        </text>

        {/* Horizontal Divider Lines & "Tienda" */}
        <line x1="28" y1="120" x2="65" y2="120" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />
        <text
          x="100"
          y="124"
          textAnchor="middle"
          fill="#FFFFFF"
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '5px'
          }}
        >
          TIENDA
        </text>
        <line x1="135" y1="120" x2="172" y2="120" stroke="#00E5FF" strokeWidth="2.5" strokeLinecap="round" />

        {/* By Leps Digital */}
        <text
          x="100"
          y="152"
          textAnchor="middle"
          fill="#22D3EE"
          style={{
            fontFamily: "'Dancing Script', cursive, serif",
            fontWeight: 700,
            fontSize: '19px',
            fontStyle: 'italic',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.7))'
          }}
        >
          By Leps Digital
        </text>
      </svg>
    </div>
  );
};
