import React, { useState, useEffect, useRef } from 'react';

interface BiankaAvatarProps {
  id?: string;
  size?: number | string;
  className?: string;
  showBadge?: boolean;
  src?: string;
  interactive?: boolean;
}

const STATIC_IMAGE_SOURCES = [
  '/Bianka en Circulo.jpg',
  '/bianka.jpg',
  '/bianka.png',
  '/api/avatar'
];

export const BiankaAvatar: React.FC<BiankaAvatarProps> = ({
  id,
  size = 56,
  className = '',
  showBadge = false,
  src,
  interactive = true
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentSrcIndex, setCurrentSrcIndex] = useState<number>(0);
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  const [customAvatar, setCustomAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bianka_avatar_custom');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const handleAvatarUpdate = () => {
      try {
        const stored = localStorage.getItem('bianka_avatar_custom');
        if (stored) {
          setCustomAvatar(stored);
          setImageFailed(false);
          setCurrentSrcIndex(0);
        }
      } catch (e) {
        console.error('Error reading custom avatar:', e);
      }
    };

    window.addEventListener('bianka_avatar_updated', handleAvatarUpdate);
    return () => window.removeEventListener('bianka_avatar_updated', handleAvatarUpdate);
  }, []);

  // Priority: 1) explicit src prop -> 2) custom avatar in localStorage -> 3) static file routes
  const activeSrc = src || customAvatar || STATIC_IMAGE_SOURCES[currentSrcIndex];

  const handleImageError = () => {
    if (src) {
      setImageFailed(true);
      return;
    }
    if (customAvatar && activeSrc === customAvatar) {
      setCustomAvatar(null);
      setCurrentSrcIndex(0);
      return;
    }
    if (currentSrcIndex < STATIC_IMAGE_SOURCES.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        localStorage.setItem('bianka_avatar_custom', base64);
        setCustomAvatar(base64);
        setImageFailed(false);
        window.dispatchEvent(new Event('bianka_avatar_updated'));

        await fetch('/api/upload-avatar', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: base64 })
        });
      } catch (e) {
        console.error('Error uploading avatar:', e);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!interactive) return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDoubleClick = () => {
    if (interactive && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div
      id={id}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDoubleClick={handleDoubleClick}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-[#38BDF8] shadow-md bg-[#131F2B] select-none ${className}`}
      style={{ width: dimension, height: dimension }}
      title="Bianka - Guía Oficial de Bienestar ColShopi Tienda"
    >
      {/* Hidden file picker allowing fast owner updates by double-clicking or dragging */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
        aria-hidden="true"
      />

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
            <filter id="neonGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur1" />
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
              <stop offset="50%" stopColor="#162330" />
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
              <stop offset="0%" stopColor="#351C12" />
              <stop offset="50%" stopColor="#22110A" />
              <stop offset="100%" stopColor="#140905" />
            </linearGradient>

            <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5E3524" />
              <stop offset="100%" stopColor="#2A150D" />
            </linearGradient>

            <linearGradient id="skinTone" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE6D5" />
              <stop offset="65%" stopColor="#FDC29E" />
              <stop offset="100%" stopColor="#F8A77E" />
            </linearGradient>

            <radialGradient id="cheekBlush" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.35" />
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
                cx="120"
                cy="145"
                r="105"
                fill="#0F172A"
                fillOpacity="0.85"
                stroke="url(#neonCyan)"
                strokeWidth="6"
                filter="url(#neonGlow)"
              />
              {/* Crisp Inner Ring */}
              <circle
                cx="120"
                cy="145"
                r="96"
                fill="none"
                stroke="#E0F7FA"
                strokeWidth="1.8"
                opacity="0.8"
              />

              {/* "Colshopi" Cursive Brand */}
              <text
                x="120"
                y="126"
                fill="#FFFFFF"
                fontSize="34"
                fontFamily="'Brush Script MT', 'Dancing Script', 'Pacifico', cursive, sans-serif"
                fontWeight="bold"
                textAnchor="middle"
                filter="url(#softGlow)"
              >
                Colshopi
              </text>

              {/* "— Tienda —" Subtitle with Horizontal Lines */}
              <line x1="58" y1="146" x2="84" y2="146" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
              <text
                x="120"
                y="151"
                fill="#38BDF8"
                fontSize="13"
                fontFamily="system-ui, -apple-system, sans-serif"
                fontWeight="800"
                textAnchor="middle"
                letterSpacing="2.2"
              >
                TIENDA
              </text>
              <line x1="156" y1="146" x2="182" y2="146" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />

              {/* "By Leps Digital" Signature */}
              <text
                x="120"
                y="176"
                fill="#F0FDFA"
                fontSize="17"
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
              <rect x="0" y="260" width="115" height="15" fill="url(#woodFinish)" />
              <line x1="0" y1="275" x2="115" y2="275" stroke="#78350F" strokeWidth="2" />

              {/* Green Potted Plant on Left Counter */}
              <ellipse cx="112" cy="260" rx="15" ry="10" fill="#E2E8F0" />
              <path d="M102 255 C92 238 104 220 114 226 C124 220 134 238 124 255 Z" fill="#10B981" />
              <path d="M112 255 C108 230 118 214 124 224 C130 230 122 250 112 255 Z" fill="#34D399" />

              {/* Upper Left Shelf */}
              <rect x="0" y="225" width="80" height="10" fill="url(#woodFinish)" />
              {/* White bottles on upper shelf */}
              <rect x="10" y="200" width="15" height="25" rx="3" fill="#FFFFFF" />
              <rect x="12" y="208" width="11" height="12" fill="#0D9488" />
              <rect x="30" y="196" width="16" height="29" rx="3" fill="#FFFFFF" />
              <rect x="32" y="205" width="12" height="14" fill="#0284C7" />
              <rect x="52" y="202" width="14" height="23" rx="3" fill="#FFFFFF" />

              {/* Black Tub on Counter ("Tyruss") */}
              <rect x="25" y="305" width="46" height="65" rx="7" fill="#1E293B" stroke="#334155" strokeWidth="2" />
              <rect x="29" y="325" width="38" height="28" fill="#0F172A" />
              <text x="48" y="343" fill="#FFFFFF" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">Tyruss</text>
            </g>

            {/* 4. RIGHT BACKGROUND (Multi-Tier Boutique Health Shelves) */}
            <g id="rightShelves">
              {/* Black vertical metal supports */}
              <line x1="365" y1="30" x2="365" y2="480" stroke="#0F172A" strokeWidth="5" />
              <line x1="485" y1="30" x2="485" y2="480" stroke="#0F172A" strokeWidth="5" />

              {/* Shelf 1 (Top) */}
              <rect x="350" y="125" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="375" y="93" width="18" height="32" rx="3" fill="#FFFFFF" />
              <rect x="377" y="103" width="14" height="16" fill="#0284C7" />
              <rect x="400" y="95" width="20" height="30" rx="3" fill="#FFFFFF" />
              <rect x="402" y="105" width="16" height="15" fill="#10B981" />
              {/* Potted plant on top shelf */}
              <ellipse cx="440" cy="123" rx="14" ry="9" fill="#F8FAFC" />
              <path d="M433 120 C426 108 436 94 442 101 C449 94 458 108 451 120 Z" fill="#10B981" />

              {/* Shelf 2 (Kraft Standing Pouches) */}
              <rect x="350" y="205" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="368" y="160" width="22" height="45" rx="3" fill="#C28E58" stroke="#9A6332" strokeWidth="1" />
              <rect x="372" y="175" width="14" height="20" fill="#F8FAFC" opacity="0.9" />
              <rect x="396" y="163" width="24" height="42" rx="3" fill="#D99B5C" stroke="#9A6332" strokeWidth="1" />
              <rect x="426" y="157" width="22" height="48" rx="2" fill="#0284C7" />
              <rect x="454" y="155" width="22" height="50" rx="3" fill="#0D9488" />

              {/* Shelf 3 (Dropper Bottles & Jars) */}
              <rect x="350" y="290" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="365" y="253" width="18" height="37" rx="3" fill="#78350F" />
              <rect x="388" y="255" width="22" height="35" rx="3" fill="#FFFFFF" />
              <rect x="391" y="265" width="16" height="18" fill="#10B981" />
              <rect x="415" y="257" width="18" height="33" rx="3" fill="#78350F" />
              <rect x="438" y="253" width="24" height="37" rx="3" fill="#FFFFFF" />

              {/* Shelf 4 (Bottom) */}
              <rect x="350" y="375" width="150" height="12" fill="url(#woodFinish)" />
              <rect x="368" y="343" width="20" height="32" rx="3" fill="#FFFFFF" />
              <rect x="394" y="340" width="22" height="35" rx="3" fill="#0D9488" />
              <rect x="422" y="343" width="20" height="32" rx="3" fill="#FFFFFF" />
            </g>

            {/* 5. BIANKA - CHARACTER PORTRAIT (Positioned center-right at x=280) */}

            {/* Back Hair Underlay */}
            <path
              d="M195 180 C165 220 160 300 190 335 C230 370 325 370 365 335 C395 295 390 220 355 180 Z"
              fill="url(#hairBase)"
            />

            {/* Body - White Doctor's Lab Coat Shoulders */}
            <path
              d="M125 500 L145 330 C175 290 240 275 280 275 C320 275 380 290 410 330 L435 500 Z"
              fill="url(#labCoat)"
            />

            {/* Inner White Blouse / Top */}
            <path
              d="M246 260 L280 260 L314 260 L300 320 L260 320 Z"
              fill="#FFFFFF"
            />
            <line x1="280" y1="262" x2="280" y2="320" stroke="#E2E8F0" strokeWidth="2" />

            {/* Neck */}
            <path
              d="M252 225 L252 272 C266 285 294 285 308 272 L308 225 Z"
              fill="url(#skinTone)"
            />
            {/* Neck Shadow under Chin */}
            <path
              d="M254 225 C266 248 294 248 306 225 Z"
              fill="#F29D78"
              opacity="0.6"
            />

            {/* Face Oval */}
            <ellipse cx="280" cy="180" rx="64" ry="76" fill="url(#skinTone)" />

            {/* Cheeks Rosy Blush */}
            <circle cx="240" cy="195" r="22" fill="url(#cheekBlush)" />
            <circle cx="320" cy="195" r="22" fill="url(#cheekBlush)" />

            {/* Almond Eyes (Warm Hazel-Brown) */}
            {/* Left Eye */}
            <g id="leftEye">
              <path d="M235 168 Q252 160 266 168 Q252 178 235 168 Z" fill="#FFFFFF" />
              <ellipse cx="251" cy="168" rx="8.5" ry="8.5" fill="#4A1E07" />
              <circle cx="251" cy="168" r="4.5" fill="#1C0A02" />
              {/* Sparkle Catchlight */}
              <circle cx="254" cy="165" r="2.8" fill="#FFFFFF" />
              <circle cx="248" cy="171" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyeliner & Lashes */}
              <path d="M233 167 Q252 157 268 167" stroke="#24130C" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              {/* Eyelid crease */}
              <path d="M237 159 Q252 153 264 160" stroke="#D18765" strokeWidth="1.8" fill="none" />
              {/* Eyebrow */}
              <path d="M230 148 Q250 141 267 147" stroke="#2E170E" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            </g>

            {/* Right Eye */}
            <g id="rightEye">
              <path d="M294 168 Q308 160 325 168 Q308 178 294 168 Z" fill="#FFFFFF" />
              <ellipse cx="309" cy="168" rx="8.5" ry="8.5" fill="#4A1E07" />
              <circle cx="309" cy="168" r="4.5" fill="#1C0A02" />
              {/* Sparkle Catchlight */}
              <circle cx="312" cy="165" r="2.8" fill="#FFFFFF" />
              <circle cx="306" cy="171" r="1.2" fill="#FFFFFF" opacity="0.8" />
              {/* Eyeliner & Lashes */}
              <path d="M292 167 Q308 157 327 167" stroke="#24130C" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              {/* Eyelid crease */}
              <path d="M296 160 Q308 153 323 159" stroke="#D18765" strokeWidth="1.8" fill="none" />
              {/* Eyebrow */}
              <path d="M293 147 Q310 141 330 148" stroke="#2E170E" strokeWidth="4.2" fill="none" strokeLinecap="round" />
            </g>

            {/* Slender Feminine Nose */}
            <path
              d="M280 168 L283 192 C284 197 276 200 273 198"
              stroke="#EA7D4A"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Warm Friendly Smile with Teeth */}
            <g id="biankaSmile">
              {/* Lip Contour Base */}
              <path
                d="M256 212 Q280 236 304 212 Q280 220 256 212 Z"
                fill="#D9485C"
              />
              {/* Pure White Upper Teeth */}
              <path
                d="M262 214 Q280 226 298 214 Q280 219 262 214 Z"
                fill="#FFFFFF"
              />
              {/* Teeth Divider */}
              <line x1="280" y1="216" x2="280" y2="223" stroke="#F1F5F9" strokeWidth="1" />
              {/* Lower Lip gloss */}
              <path
                d="M263 222 Q280 236 297 222 Q280 231 263 222 Z"
                fill="#E11D48"
              />
              <ellipse cx="280" cy="227" rx="7" ry="2" fill="#FDA4AF" opacity="0.6" />
            </g>

            {/* Brunette Bob Haircut with Volume and Curved Strands */}
            <path
              d="M215 170 C212 110 270 85 315 95 C350 102 364 135 360 175 C355 205 350 235 340 250 C330 235 325 195 320 175 C295 135 250 145 230 172 C222 184 218 205 214 225 C210 205 215 185 215 170 Z"
              fill="url(#hairBase)"
            />
            {/* Fringe Highlight */}
            <path
              d="M248 105 C285 105 330 120 342 152 C320 134 290 128 262 135 C248 140 240 148 232 160 C235 140 240 120 248 105 Z"
              fill="url(#hairHighlight)"
            />

            {/* Doctor's Lab Coat Lapels */}
            {/* Left Lapel (Viewer's Left) */}
            <path
              d="M195 315 L245 270 L272 330 L245 390 L180 360 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* Right Lapel (Viewer's Right) */}
            <path
              d="M365 315 L315 270 L288 330 L315 390 L380 360 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="2"
            />

            {/* Name Badge ("BIANKA") on Right Lapel */}
            <g id="biankaNameTag">
              <rect
                x="305"
                y="325"
                width="66"
                height="24"
                rx="4"
                fill="#FFFFFF"
                stroke="#0284C7"
                strokeWidth="2"
                filter="url(#softGlow)"
              />
              <text
                x="338"
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

            {/* CROSSED ARMS (Professional Pose) */}
            {/* Left Forearm Under */}
            <path
              d="M160 355 C160 415 200 440 265 440 L355 435 L355 395 L265 400 C220 400 200 380 190 355 Z"
              fill="url(#coatShadow)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Right Forearm Over */}
            <path
              d="M400 355 C400 415 355 445 285 445 L205 435 L205 395 L285 400 C335 400 360 380 370 355 Z"
              fill="url(#labCoat)"
              stroke="#CBD5E1"
              strokeWidth="2"
            />
            {/* Hands Resting on Arms */}
            <ellipse cx="200" cy="415" rx="16" ry="12" fill="url(#skinTone)" />
            <ellipse cx="360" cy="415" rx="16" ry="12" fill="url(#skinTone)" />
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
