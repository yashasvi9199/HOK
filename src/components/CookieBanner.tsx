import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, X } from 'lucide-react';
import type { CookieConsentStatus } from '../features/legal/legal.types';

const STORAGE_KEY = 'hok_cookie_consent';

// * DPDP-compliant aesthetic Cookie & Privacy Consent Banner
export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedPreference = localStorage.getItem(STORAGE_KEY);
      if (!storedPreference) {
        // Small delay so it transitions in gracefully
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (storageError) {
      console.warn('Unable to access localStorage for cookie consent:', storageError);
    }
  }, []);

  const handleConsent = (status: CookieConsentStatus) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          status,
          timestamp: new Date().toISOString(),
          version: 'dpdp-2023-v1',
        })
      );
      setIsVisible(false);
    } catch (storageError) {
      console.error('Failed to save cookie consent preference:', storageError);
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-50 bg-[#FFFFFF] border-2 border-[#C5A059]/40 shadow-2xl p-5 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#C5A059]" />
          <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
            Privacy & DPDP Notice
          </span>
        </div>
        <button
          onClick={() => handleConsent('declined')}
          className="text-stone-400 hover:text-[#1C1917] p-1 cursor-pointer transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-xs font-sans text-[#78716C] leading-relaxed mb-4">
        We respect your digital privacy. House of Kalakaar utilizes local storage and essential tools to deliver our atelier experience and honor your rights under India's <strong>DPDP Act, 2023</strong>. Learn more in our{' '}
        <Link to="/privacy" className="text-[#C5A059] font-medium underline">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="text-[#C5A059] font-medium underline">
          Terms
        </Link>.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => handleConsent('accepted')}
          className="flex-1 bg-[#1C1917] hover:bg-[#C5A059] text-[#FAF7F2] hover:text-[#1C1917] py-2 px-3 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs text-center"
        >
          Accept All
        </button>
        <button
          onClick={() => handleConsent('declined')}
          className="bg-[#FAF7F2] hover:bg-[#F0ECE1] text-[#78716C] hover:text-[#1C1917] border border-[#F0ECE1] py-2 px-3 text-xs font-medium transition-colors cursor-pointer text-center"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
};
