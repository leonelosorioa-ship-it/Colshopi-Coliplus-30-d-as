import React, { useState } from 'react';

interface BiankaAvatarProps {
  size?: number | string;
  className?: string;
  showBadge?: boolean;
  src?: string;
}

const STATIC_IMAGE_SOURCES = [
  '/Bianka en Circulo.jpg',
  '/bianka.jpg',
  '/bianka.png'
];

export const BiankaAvatar: React.FC<BiankaAvatarProps> = ({
  size = 56,
  className = '',
  showBadge = false,
  src
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const activeSrc = src || STATIC_IMAGE_SOURCES[currentSrcIndex];

  const handleImageError = () => {
    if (src) {
      setImageFailed(true);
      return;
    }
    if (currentSrcIndex < STATIC_IMAGE_SOURCES.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-[#38BDF8] shadow-md bg-[#131F2B] select-none ${className}`}
      style={{ width: dimension, height: dimension }}
      title="Bianka - Guía de Bienestar ColShopi Tienda"
    >
      {!imageFailed && activeSrc ? (
        <img
          src={activeSrc}
          alt="Bianka - Guía de Bienestar ColShopi"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full pointer-events-none"
          onError={handleImageError}
        />
      ) : (
        /* Permanent, High-Fidelity Vector Replica of Bianka en Circulo */
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full object-cover pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="circleFrame">
              <circle cx="250" cy="250" r="248" />
            </clipPath>

            {/* Neon Glow Filters */}
            <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="blur1" />
              <feGaussianBlur stdDeviation="3" result="blur2" />
              <feMerge>
                <feMergeNode in="blur1" />
                <feMergeNode in="blur2" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Color Gradients */}
            <linearGradient id="wallGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E2D3D" />
              <stop offset="50%" stopColor="#172433" />
              <stop offset="100%" stopColor="#0F1722" />
            </linearGradient>

            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#00E5FF" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            <linearGradient id="woodFinish" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C4915C" />
              <stop offset="50%" stopColor="#D8A46F" />
              <stop offset="100%" stopColor="#A87542" />
            </linearGradient>

            <linearGradient id="hairBase" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3A1F14" />
              <stop offset="50%" stopColor="#24130C" />
              <stop offset="100%" stopColor="#150B07" />
            </linearGradient>

            <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E3524" />
              <stop offset="100%" stopColor="#2A150D" />
            </linearGradient>

            <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE4D2" />
              <stop offset="65%" stopColor="#FDBF9A" />
              <stop offset="100%" stopColor="#F8A77E" />
            </linearGradient>

            <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="labCoat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="coatShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          <g clipPath="url(#circleFrame)">
            {/* 1. ROOM BACKGROUND */}
            <rect width="500" height="500" fill="url(#wallGradient)" />

            {/* 2. CIRCULAR NEON SIGN ON LEFT ("Colshopi Tienda By Leps Digital") */}
            <g id="neonSignGroup">
              {/* Outer Cyan Halo */}
              <circle
                cx="135"
                cy="135"
                r="110"
                fill="#0F172A"
                fillOpacity="0.8"
                stroke="url(#neonCyan)"
                strokeWidth="7"
                filter="url(#neonBlur)"
              />
              {/* Crisp Inner Ring */}
              <circle
                cx="135"
                cy="135"
                r="100"
                fill="none"
                stroke="#E0F7FA"
                strokeWidth="2"
                opacity="0.85"
              />

              {/* "Colshopi" Cursive Brand */}
              <text
                x="135"
                y="114"
                fill="#FFFFFF"
                fontSize="36"
                fontFamily="'Brush Script MT', 'Dancing Script', 'Pacifico', cursive, sans-serif"
                fontWeight="bold"
                textAnchor="middle"
                filter="url(#softGlow)"
              >
                Colshopi
              </text>

              {/* "— Tienda —" Subtitle with Horizontal Dividing Lines */}
              <line x1="68" y1="134" x2="98" y2="134" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
              <text
                x="135"
                y="139"
                fill="#38BDF8"
                fontSize="14"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="2.5"
              >
                TIENDA
              </text>
              <line x1="172" y1="134" x2="202" y2="134" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />

              {/* "By Leps Digital" Elegant Signature */}
              <text
                x="135"
                y="166"
                fill="#F0FDFA"
                fontSize="18"
                fontFamily="'Brush Script MT', 'Dancing Script', cursive, sans-serif"
                fontStyle="italic"
                textAnchor="middle"
              >
                By Leps Digital
              </text>
            </g>

            {/* 3. LEFT BACKGROUND (Shelves, Plants & Counter) */}
            <g id="leftShelvesAndCounter">
              {/* Lower Counter Edge */}
              <rect x="0" y="260" width="120" height="15" fill="url(#woodFinish)" />
              <line x1="0" y1="275" x2="120" y2="275" stroke="#78350F" strokeWidth="2" />

              {/* Green Potted Plant on Left Counter */}
              <ellipse cx="118" cy="260" rx="16" ry="11" fill="#E2E8F0" />
              <path d="M106 255 C96 238 108 220 118 226 C128 220 140 238 130 255 Z" fill="#10B981" />
              <path d="M118 255 C112 230 124 212 130 222 C136 230 128 250 118 255 Z" fill="#34D399" />
              <path d="M110 255 C100 242 108 228 114 236 Z" fill="#059669" />

              {/* Upper Left Shelf */}
              <rect x="0" y="225" width="85" height="10" fill="url(#woodFinish)" />
              {/* White bottles on upper shelf */}
              <rect x="10" y="198" width="16" height="27" rx="3" fill="#FFFFFF" />
              <rect x="12" y="206" width="12" height="14" fill="#0D9488" />
              <rect x="32" y="195" width="18" height="30" rx="3" fill="#FFFFFF" />
              <rect x="34" y="204" width="14" height="16" fill="#0284C7" />
              <rect x="56" y="200" width="15" height="25" rx="3" fill="#FFFFFF" />
              <rect x="58" y="207" width="11" height="13" fill="#10B981" />

              {/* Black Tub on Counter ("Tyruss") */}
              <rect x="32" y="305" width="46" height="65" rx="7" fill="#1E293B" stroke="#334155" strokeWidth="2" />
              <rect x="36" y="325" width="38" height="30" fill="#0F172A" />
              <text x="55" y="344" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Tyruss</text>
            </g>

            {/* 4. RIGHT BACKGROUND (Multi-Tier Boutique Health Shelves) */}
            <g id="rightShelves">
              {/* Black vertical metal supports */}
              <line x1="365" y1="30" x2="365" y2="480" stroke="#0F172A" strokeWidth="5" />
              <line x1="485" y1="30" x2="485" y2="480" stroke="#0F172A" strokeWidth="5" />

              {/* Shelf 1 (Top) */}
              <rect x="350" y="130" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="375" y="96" width="18" height="34" rx="3" fill="#FFFFFF" />
              <rect x="377" y="106" width="14" height="18" fill="#0284C7" />
              <rect x="400" y="98" width="20" height="32" rx="3" fill="#FFFFFF" />
              <rect x="402" y="108" width="16" height="16" fill="#10B981" />
              {/* Potted plant on top shelf */}
              <ellipse cx="440" cy="128" rx="15" ry="10" fill="#F8FAFC" />
              <path d="M432 124 C424 110 435 95 442 102 C450 95 460 110 452 124 Z" fill="#10B981" />

              {/* Shelf 2 (Mid-High: Kraft Standing Bags & Boxes) */}
              <rect x="350" y="210" width="150" height="12" fill="url(#woodFinish)" />
              {/* Kraft Bags */}
              <rect x="368" y="165" width="22" height="45" rx="3" fill="#C28E58" stroke="#9A6332" strokeWidth="1" />
              <rect x="372" y="180" width="14" height="20" fill="#F8FAFC" opacity="0.9" />
              <rect x="396" y="168" width="24" height="42" rx="3" fill="#D99B5C" stroke="#9A6332" strokeWidth="1" />
              <rect x="426" y="162" width="22" height="48" rx="2" fill="#0284C7" />
              <rect x="454" y="160" width="22" height="50" rx="3" fill="#0D9488" />

              {/* Shelf 3 (Dropper Bottles & White Jars) */}
              <rect x="350" y="295" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="365" y="258" width="18" height="37" rx="3" fill="#78350F" />
              <rect x="388" y="260" width="22" height="35" rx="3" fill="#FFFFFF" />
              <rect x="391" y="270" width="16" height="18" fill="#10B981" />
              <rect x="415" y="262" width="18" height="33" rx="3" fill="#78350F" />
              <rect x="438" y="258" width="24" height="37" rx="3" fill="#FFFFFF" />

              {/* Shelf 4 (Bottom) */}
              <rect x="350" y="380" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="368" y="348" width="20" height="32" rx="3" fill="#FFFFFF" />
              <rect x="394" y="345" width="22" height="35" rx="3" fill="#0D9488" />
              <rect x="422" y="348" width="20" height="32" rx="3" fill="#FFFFFF" />
            </g>

            {/* 5. BIANKA - CHARACTER PORTRAIT */}

            {/* Back Hair Underlay */}
            <path
              d="M170 180 C135 220 130 300 160 340 C200 375 300 375 340 340 C370 300 365 220 330 180 Z"
              fill="url(#hairBase)"
            />

            {/* Body - White Doctor's Lab Coat Shoulders */}
            <path
              d="M95 500 L120 330 C150 290 210 275 250 275 C290 275 350 290 380 330 L405 500 Z"
              fill="url(#labCoat)"
            />

            {/* Inner White Blouse / Top */}
            <path
              d="M216 260 L250 260 L284 260 L270 320 L230 320 Z"
              fill="#FFFFFF"
            />
            <line x1="250" y1="262" x2="250" y2="320" stroke="#E2E8F0" strokeWidth="2" />

            {/* Neck */}
            <path
              d="M222 225 L222 272 C236 285 264 285 278 272 L278 225 Z"
              fill="url(#skinTone)"
            />
            {/* Neck Shadow under Chin */}
            <path
              d="M224 225 C236 248 264 248 276 225 Z"
              fill="#F29D78"
              opacity="0.6"
            />

            {/* Face Oval */}
            <ellipse cx="250" cy="180" rx="64" ry="76" fill="url(#skinTone)" />

            {/* Cheeks Rosy Blush */}
            <circle cx="210" cy="195" r="22" fill="url(#cheekBlush)" />
            <circle cx="290" cy="195" r="22" fill="url(#cheekBlush)" />

            {/* Almond Eyes (Warm Hazel-Brown) */}
            {/* Left Eye */}
            <g id="leftEye">
              <path d="M205 168 Q222 160 236 168 Q222 178 205 168 Z" fill="#FFFFFF" />
              <ellipse cx="221" cy="168" rx="8.5" ry="8.5" fill="#4A1E07" />
              <circle cx="221" cy="168" r="4.5" fill="#1C0A02" />
              {/* Sparkle Catchlight */}
              <circle cx="224" cy="165" r="2.8" fill="#FFFFFF" />
              <circle cx="218" cy="171" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyeliner & Lashes */}
              <path d="M203 167 Q222 157 238 167" stroke="#24130C" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              {/* Eyelid crease */}
              <path d="M207 159 Q222 153 234 160" stroke="#D18765" strokeWidth="1.8" fill="none" />
              {/* Eyebrow */}
              <path d="M200 148 Q220 141 237 147" stroke="#2E170E" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g id="rightEye">
              <path d="M264 168 Q278 160 295 168 Q278 178 264 168 Z" fill="#FFFFFF" />
              <ellipse cx="279" cy="168" rx="8.5" ry="8.5" fill="#4A1E07" />
              <circle cx="279" cy="168" r="4.5" fill="#1C0A02" />
              {/* Sparkle Catchlight */}
              <circle cx="282" cy="165" r="2.8" fill="#FFFFFF" />
              <circle cx="276" cy="171" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyeliner & Lashes */}
              <path d="M262 167 Q278 157 297 167" stroke="#24130C" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              {/* Eyelid crease */}
              <path d="M266 160 Q278 153 293 159" stroke="#D18765" strokeWidth="1.8" fill="none" />
              {/* Eyebrow */}
              <path d="M263 147 Q280 141 300 148" stroke="#2E170E" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            </g>

            {/* Slender Feminine Nose */}
            <path
              d="M250 168 L253 192 C254 197 246 200 243 198"
              stroke="#EA7D4A"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Warm Friendly Smile with Teeth */}
            <g id="biankaSmile">
              {/* Lip Contour Base */}
              <path
                d="M226 212 Q250 236 274 212 Q250 220 226 212 Z"
                fill="#D9485C"
              />
              {/* Pure White Upper Teeth */}
              <path
                d="M232 214 Q250 226 268 214 Q250 219 232 214 Z"
                fill="#FFFFFF"
              />
              {/* Subtle Teeth Dividers */}
              <line x1="250" y1="216" x2="250" y2="223" stroke="#F1F5F9" strokeWidth="1" />
              {/* Lower Lip fullness and gloss */}
              <path
                d="M233 222 Q250 236 267 222 Q250 231 233 222 Z"
                fill="#E11D48"
              />
              {/* Lip shine highlight */}
              <ellipse cx="250" cy="227" rx="7" ry="2" fill="#FDA4AF" opacity="0.6" />
            </g>

            {/* Brunette Bob Haircut with Silky Strands & Volume */}
            <path
              d="M185 170 C182 110 240 85 285 95 C320 102 334 135 330 175 C325 205 320 235 310 250 C300 235 295 195 290 175 C265 135 220 145 200 172 C192 184 188 205 184 225 C180 205 185 185 185 170 Z"
              fill="url(#hairBase)"
            />
            {/* Sweeping Fringe / Bang Highlight on Forehead */}
            <path
              d="M218 105 C255 105 300 120 312 152 C290 134 260 128 232 135 C218 140 210 148 202 160 C205 140 210 120 218 105 Z"
              fill="url(#hairHighlight)"
            />

            {/* Doctor's Lab Coat Lapels */}
            {/* Left Lapel (Viewer's Left) */}
            <path
              d="M165 315 L215 270 L242 330 L215 390 L150 360 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* Right Lapel (Viewer's Right) */}
            <path
              d="M335 315 L285 270 L258 330 L285 390 L350 360 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            {/* Name Badge ("BIANKA") on Right Lapel */}
            <g id="biankaNameTag">
              <rect
                x="280"
                y="325"
                width="64"
                height="24"
                rx="4"
                fill="#FFFFFF"
                stroke="#0284C7"
                strokeWidth="2"
                filter="url(#softGlow)"
              />
              <text
                x="312"
                y="341"
                fill="#0F172A"
                fontSize="12"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="900"
                textAnchor="middle"
                letterSpacing="1.5"
              >
                BIANKA
              </text>
            </g>

            {/* CROSSED ARMS (Signature Professional Pose) */}
            {/* Left Forearm Folded Under */}
            <path
              d="M130 355 C130 415 170 440 235 440 L325 435 L325 395 L235 400 C190 400 170 380 160 355 Z"
              fill="url(#coatShadow)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Right Forearm Folded Across Over */}
            <path
              d="M370 355 C370 415 325 445 255 445 L175 435 L175 395 L255 400 C305 400 330 380 340 355 Z"
              fill="url(#labCoat)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Hands Gently Resting on Folded Arms */}
            <ellipse cx="170" cy="415" rx="16" ry="12" fill="url(#skinTone)" />
            <ellipse cx="330" cy="415" rx="16" ry="12" fill="url(#skinTone)" />
          </g>
        </svg>
      )}

      {/* Online Status Dot */}
      {showBadge && (
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full shadow-xs pointer-events-none"
          title="En línea"
        />
      )}
    </div>
  );
};
