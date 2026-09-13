import React, { useRef, useEffect } from 'react';

interface SixDigitInputProps {
  value: string;
  onChange: (code: string) => void;
  error?: string;
  onEnterPress?: () => void;
}

export const SixDigitInput: React.FC<SixDigitInputProps> = ({
  value,
  onChange,
  error,
  onEnterPress
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Split value into 6 slots
  const digits = value.slice(0, 6).split('');
  while (digits.length < 6) {
    digits.push('');
  }

  const handleDigitChange = (index: number, digit: string) => {
    // Only accept numbers
    const cleanDigit = digit.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits];
    newDigits[index] = cleanDigit;
    const newCode = newDigits.join('').slice(0, 6);
    onChange(newCode);

    // Auto move to next input if digit was entered
    if (cleanDigit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        onChange(newDigits.join('').slice(0, 6));
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (e.key === 'Enter') {
      if (onEnterPress) onEnterPress();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted) {
      onChange(pasted);
      const targetIndex = Math.min(pasted.length, 5);
      inputRefs.current[targetIndex]?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`flex items-center justify-between p-3.5 sm:p-4 bg-[#F8FAFC] rounded-2xl border-2 transition-all ${
          error
            ? 'border-red-400 bg-red-50/40 ring-1 ring-red-300'
            : value.length === 6
            ? 'border-[#0F766E] bg-[#F0FDF4] ring-2 ring-[#0F766E]/20'
            : 'border-[#CBD5E1] focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/20'
        }`}
        onPaste={handlePaste}
      >
        <div className="flex items-center justify-around w-full gap-2 sm:gap-3">
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const hasChar = !!digits[index];
            return (
              <div key={index} className="relative flex items-center justify-center flex-1">
                <input
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digits[index]}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => e.target.select()}
                  className={`w-10 h-12 sm:w-12 sm:h-14 text-center font-mono font-bold text-xl sm:text-2xl rounded-xl border bg-white shadow-inner focus:outline-hidden transition-all ${
                    hasChar
                      ? 'text-[#0F172A] border-[#0F766E] bg-white shadow-xs'
                      : 'text-transparent border-[#E2E8F0] focus:border-[#0F766E]'
                  }`}
                  aria-label={`Dígito ${index + 1}`}
                />
                {!hasChar && (
                  <span className="pointer-events-none absolute text-2xl font-black text-[#94A3B8]/60 select-none">
                    •
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium flex items-center pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5" />
          {error}
        </p>
      )}
    </div>
  );
};
