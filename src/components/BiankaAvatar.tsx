import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'lucide-react';

interface BiankaAvatarProps {
  size?: number | string;
  className?: string;
  showBadge?: boolean;
  isEditable?: boolean;
  src?: string;
}

const CANDIDATE_IMAGE_URLS = [
  '/Bianka en Circulo.jpg',
  '/bianka.jpg',
  '/bianka.png',
  '/assets/bianka.jpg'
];

export const BiankaAvatar: React.FC<BiankaAvatarProps> = ({
  size = 56,
  className = '',
  showBadge = false,
  isEditable = true,
  src
}) => {
  const dimension = typeof size === 'number' ? `${size}px` : size;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem('bianka_custom_photo');
    } catch {
      return null;
    }
  });

  const [currentUrlIndex, setCurrentUrlIndex] = useState<number>(0);
  const [allImagesFailed, setAllImagesFailed] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const handlePhotoUpdated = () => {
      try {
        const stored = localStorage.getItem('bianka_custom_photo');
        setCustomPhoto(stored);
        setAllImagesFailed(false);
        setCurrentUrlIndex(0);
      } catch {
        // ignore
      }
    };

    window.addEventListener('bianka_photo_updated', handlePhotoUpdated);
    window.addEventListener('storage', handlePhotoUpdated);
    return () => {
      window.removeEventListener('bianka_photo_updated', handlePhotoUpdated);
      window.removeEventListener('storage', handlePhotoUpdated);
    };
  }, []);

  const activeSrc = src || customPhoto || CANDIDATE_IMAGE_URLS[currentUrlIndex];

  const handleImageError = () => {
    if (src || customPhoto) {
      if (customPhoto) setCustomPhoto(null);
      setCurrentUrlIndex(0);
      return;
    }

    if (currentUrlIndex < CANDIDATE_IMAGE_URLS.length - 1) {
      setCurrentUrlIndex((prev) => prev + 1);
    } else {
      setAllImagesFailed(true);
    }
  };

  const processAndSaveFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        try {
          localStorage.setItem('bianka_custom_photo', dataUrl);
          setCustomPhoto(dataUrl);
          setAllImagesFailed(false);
          window.dispatchEvent(new Event('bianka_photo_updated'));

          // Persist to server disk as well
          await fetch('/api/upload-avatar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageBase64: dataUrl })
          }).catch((err) => console.warn('Avatar server sync notice:', err));
        } catch (err) {
          console.error('Error saving custom photo:', err);
        } finally {
          setIsUploading(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSaveFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndSaveFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const triggerFilePicker = (e: React.MouseEvent) => {
    if (isEditable) {
      e.stopPropagation();
      fileInputRef.current?.click();
    }
  };

  return (
    <div
      className={`group relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden border-2 border-[#38BDF8] shadow-md bg-[#1E293B] select-none ${
        isEditable ? 'cursor-pointer hover:ring-2 hover:ring-[#38BDF8]/60 transition-all' : ''
      } ${className}`}
      style={{ width: dimension, height: dimension }}
      onClick={triggerFilePicker}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      title={isEditable ? 'Haz clic para cambiar la foto de Bianka (Sube Bianka en Circulo.jpg)' : 'Bianka - Guía de Bienestar ColShopi'}
    >
      {/* Hidden file input for one-click upload */}
      {isEditable && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
      )}

      {!allImagesFailed && activeSrc ? (
        <img
          src={activeSrc}
          alt="Bianka - Guía de Bienestar ColShopi"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full pointer-events-none"
          onError={handleImageError}
        />
      ) : (
        /* High-Fidelity Vector Replica of Bianka en Circulo */
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full object-cover pointer-events-none"
        >
          <defs>
            <clipPath id="circleClip">
              <circle cx="100" cy="100" r="100" />
            </clipPath>

            {/* Neon Glow Filter */}
            <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gradients */}
            <linearGradient id="wallBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="60%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="woodShelf" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400E" />
              <stop offset="50%" stopColor="#B45309" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>

            <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            <linearGradient id="biankaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#451A03" />
              <stop offset="50%" stopColor="#291104" />
              <stop offset="100%" stopColor="#1C0A00" />
            </linearGradient>

            <linearGradient id="hairHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5E2B08" />
              <stop offset="100%" stopColor="#291104" />
            </linearGradient>

            <linearGradient id="biankaSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FED7AA" />
              <stop offset="60%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>

            <linearGradient id="whiteCoat" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="65%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>

            <linearGradient id="coatShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          <g clipPath="url(#circleClip)">
            {/* Background Store Wall */}
            <rect width="200" height="200" fill="url(#wallBg)" />

            {/* Left Counter & Shelves */}
            <rect x="0" y="90" width="45" height="6" fill="url(#woodShelf)" />
            <rect x="0" y="55" width="40" height="5" fill="url(#woodShelf)" />

            {/* Small green plant on left shelf */}
            <ellipse cx="48" cy="108" rx="7" ry="5" fill="#E2E8F0" />
            <path d="M44 105 C40 98 44 92 48 94 C52 92 56 98 52 105 Z" fill="#10B981" />
            <path d="M48 105 C46 95 50 88 53 92 C56 95 52 103 48 105 Z" fill="#34D399" />

            {/* Left Bottles & Jars on shelves */}
            <rect x="5" y="44" width="7" height="11" rx="1.5" fill="#F8FAFC" />
            <rect x="6" y="42" width="5" height="3" fill="#0D9488" />
            <rect x="15" y="42" width="8" height="13" rx="2" fill="#78350F" />
            <rect x="16" y="40" width="6" height="3" fill="#F8FAFC" />
            <rect x="26" y="45" width="7" height="10" rx="1.5" fill="#F8FAFC" />

            {/* Counter glass cabinet line */}
            <line x1="0" y1="120" x2="60" y2="140" stroke="#38BDF8" strokeWidth="1" opacity="0.3" />

            {/* Big Circular Neon Sign on Left */}
            <circle cx="48" cy="56" r="38" fill="#0F172A" opacity="0.85" />
            <circle
              cx="48"
              cy="56"
              r="38"
              fill="none"
              stroke="url(#neonCyan)"
              strokeWidth="2.8"
              filter="url(#neonGlow)"
            />
            <circle
              cx="48"
              cy="56"
              r="34"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="1"
              opacity="0.6"
            />

            {/* Neon Sign Text */}
            <text
              x="48"
              y="45"
              fill="#E0F2FE"
              fontSize="12"
              fontFamily="Georgia, cursive, serif"
              fontStyle="italic"
              fontWeight="bold"
              textAnchor="middle"
              filter="url(#neonGlow)"
            >
              Colshopi
            </text>
            <text
              x="48"
              y="56"
              fill="#38BDF8"
              fontSize="5.5"
              fontFamily="system-ui, sans-serif"
              fontWeight="700"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              — TIENDA —
            </text>
            <text
              x="48"
              y="67"
              fill="#F0FDFA"
              fontSize="6"
              fontFamily="Georgia, cursive, serif"
              fontStyle="italic"
              textAnchor="middle"
            >
              By Leps Digital
            </text>

            {/* Right Multi-tier Shelves with Products */}
            <rect x="145" y="25" width="55" height="5" fill="url(#woodShelf)" />
            <rect x="142" y="60" width="58" height="5" fill="url(#woodShelf)" />
            <rect x="140" y="95" width="60" height="5" fill="url(#woodShelf)" />
            <rect x="138" y="130" width="62" height="5" fill="url(#woodShelf)" />

            {/* Top Shelf Products */}
            <rect x="150" y="15" width="8" height="10" rx="1.5" fill="#F8FAFC" />
            <rect x="151" y="13" width="6" height="2.5" fill="#0284C7" />
            <rect x="162" y="14" width="9" height="11" rx="1.5" fill="#F8FAFC" />
            <rect x="163" y="12" width="7" height="2.5" fill="#10B981" />
            <ellipse cx="178" cy="20" rx="6" ry="5" fill="#E2E8F0" />
            <path d="M176 17 C174 12 178 9 181 11 C184 13 182 17 178 19 Z" fill="#10B981" />

            {/* Mid Shelf Products */}
            <rect x="148" y="44" width="10" height="16" rx="1" fill="#D97706" opacity="0.9" />
            <rect x="160" y="46" width="11" height="14" rx="1" fill="#0284C7" opacity="0.9" />
            <rect x="173" y="48" width="8" height="12" rx="1.5" fill="#F8FAFC" />
            <rect x="183" y="47" width="9" height="13" rx="1.5" fill="#047857" />

            {/* Lower Shelf Products */}
            <rect x="146" y="80" width="11" height="15" rx="1" fill="#0D9488" />
            <rect x="159" y="81" width="10" height="14" rx="1" fill="#78350F" />
            <rect x="171" y="83" width="9" height="12" rx="1.5" fill="#F8FAFC" />

            {/* BIANKA CHARACTER */}
            {/* Back Hair Layer */}
            <path
              d="M74 85 C62 95 60 120 72 135 C90 148 135 148 152 135 C164 120 162 95 150 85 Z"
              fill="url(#biankaHair)"
            />

            {/* Shoulders / Upper Body */}
            <path
              d="M48 200 L56 142 C68 126 95 120 112 120 C129 120 156 126 168 142 L176 200 Z"
              fill="url(#whiteCoat)"
            />

            {/* Inner White Blouse Collar */}
            <path
              d="M96 112 L112 112 L128 112 L120 135 L104 135 Z"
              fill="#FFFFFF"
            />
            <line x1="112" y1="115" x2="112" y2="135" stroke="#E2E8F0" strokeWidth="1" />

            {/* Neck */}
            <path
              d="M99 98 L99 116 C105 122 119 122 125 116 L125 98 Z"
              fill="url(#biankaSkin)"
            />

            {/* Head / Face Oval */}
            <ellipse cx="112" cy="80" rx="28" ry="32" fill="url(#biankaSkin)" />

            {/* Cheeks & Blushing */}
            <ellipse cx="94" cy="86" rx="6" ry="3.5" fill="#F43F5E" opacity="0.25" />
            <ellipse cx="130" cy="86" rx="6" ry="3.5" fill="#F43F5E" opacity="0.25" />

            {/* Almond Eyes (Warm Brown) */}
            {/* Left Eye */}
            <path d="M92 74 Q100 70 106 74 Q100 78 92 74 Z" fill="#FFFFFF" />
            <ellipse cx="99" cy="74" rx="3.5" ry="3.5" fill="#451A03" />
            <circle cx="100.2" cy="72.8" r="1.2" fill="#FFFFFF" />
            <path d="M91 73 Q100 68 107 73" stroke="#262626" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Left Eyebrow */}
            <path d="M90 66 Q98 62 106 65" stroke="#291104" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Right Eye */}
            <path d="M118 74 Q124 70 132 74 Q124 78 118 74 Z" fill="#FFFFFF" />
            <ellipse cx="125" cy="74" rx="3.5" ry="3.5" fill="#451A03" />
            <circle cx="126.2" cy="72.8" r="1.2" fill="#FFFFFF" />
            <path d="M117 73 Q124 68 133 73" stroke="#262626" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Right Eyebrow */}
            <path d="M118 65 Q126 62 134 66" stroke="#291104" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Nose */}
            <path
              d="M112 75 L114 83 C114 85 110 86 109 85"
              stroke="#EA580C"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Warm Friendly Smile */}
            <path
              d="M101 92 Q112 102 123 92 Q112 96 101 92 Z"
              fill="#E11D48"
            />
            {/* Teeth */}
            <path
              d="M104 93 Q112 97 120 93 Q112 95 104 93 Z"
              fill="#FFFFFF"
            />

            {/* Ears */}
            <ellipse cx="83" cy="80" rx="3.5" ry="6.5" fill="url(#biankaSkin)" />
            <ellipse cx="141" cy="80" rx="3.5" ry="6.5" fill="url(#biankaSkin)" />

            {/* Brunette Bob Haircut with Side Part */}
            <path
              d="M83 75 C82 50 110 40 128 44 C142 47 148 60 146 76 C144 88 142 98 138 104 C134 98 132 82 130 75 C118 58 100 62 90 74 C86 79 84 88 82 96 C80 88 83 80 83 75 Z"
              fill="url(#biankaHair)"
            />
            {/* Hair bang highlight */}
            <path
              d="M98 48 C115 48 134 54 140 68 C130 60 116 57 104 60 C98 62 94 65 91 70 C92 62 94 54 98 48 Z"
              fill="url(#hairHighlight)"
            />

            {/* White Coat Lapels */}
            <path
              d="M74 135 L94 116 L108 140 L96 166 L68 152 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.8"
            />
            <path
              d="M150 135 L130 116 L116 140 L128 166 L156 152 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="0.8"
            />

            {/* Name Tag: "BIANKA" */}
            <rect
              x="126"
              y="142"
              width="26"
              height="10"
              rx="2"
              fill="#FFFFFF"
              stroke="#0284C7"
              strokeWidth="1"
            />
            <text
              x="139"
              y="149"
              fill="#0F172A"
              fontSize="5"
              fontFamily="Arial, system-ui, sans-serif"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.6"
            >
              BIANKA
            </text>

            {/* Crossed Arms */}
            <path
              d="M58 150 C58 175 75 186 105 186 L145 184 L145 168 L105 170 C85 170 76 162 72 150 Z"
              fill="url(#coatShadow)"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            <path
              d="M166 150 C166 175 145 188 112 188 L78 184 L78 168 L112 170 C134 170 148 162 152 150 Z"
              fill="url(#whiteCoat)"
              stroke="#CBD5E1"
              strokeWidth="0.8"
            />
            {/* Hands */}
            <ellipse cx="76" cy="176" rx="7" ry="5" fill="url(#biankaSkin)" />
            <ellipse cx="146" cy="176" rx="7" ry="5" fill="url(#biankaSkin)" />
          </g>
        </svg>
      )}

      {/* Hover Camera Overlay for Easy One-Click Replacement */}
      {isEditable && (
        <div className="absolute inset-0 bg-[#0F172A]/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity duration-200 text-white z-10">
          <Camera className="w-5 h-5 text-white drop-shadow-md animate-pulse" />
          <span className="text-[9px] font-bold mt-1 text-[#38BDF8] tracking-tight">
            {isUploading ? 'Subiendo...' : 'Cambiar Foto'}
          </span>
        </div>
      )}

      {showBadge && (
        <span
          className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full shadow-xs z-20"
          title="En línea para acompañarte"
        />
      )}
    </div>
  );
};
