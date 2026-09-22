import React from 'react';
import { Monitor, Smartphone, SlidersHorizontal } from 'lucide-react';
import { useDeviceLayout } from '../hooks/useDeviceLayout';

interface DeviceSwitcherPillProps {
  overrideMode: 'auto' | 'mobile' | 'desktop';
  setOverrideMode: (mode: 'auto' | 'mobile' | 'desktop') => void;
  currentDevice: string;
}

export const DeviceSwitcherPill: React.FC<DeviceSwitcherPillProps> = ({
  overrideMode,
  setOverrideMode,
  currentDevice,
}) => {
  return (
    <aside aria-label="Layout mode switcher" className="fixed bottom-4 right-4 z-40 bg-[#1C1917]/90 text-[#FAF7F2] backdrop-blur-md border border-[#C5A059]/40 shadow-xl px-3 py-1.5 flex items-center gap-2 text-xs font-sans">
      <div className="flex items-center gap-1.5 text-[#C5A059] border-r border-white/20 pr-2">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase tracking-wider font-semibold">
          {currentDevice.toUpperCase()} SHELL
        </span>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setOverrideMode('auto')}
          className={`px-2 py-0.5 text-[11px] transition-colors ${
            overrideMode === 'auto'
              ? 'bg-[#C5A059] text-white font-semibold'
              : 'text-stone-400 hover:text-white'
          }`}
          title="Responsive Auto-Detect"
        >
          Auto
        </button>
        <button
          onClick={() => setOverrideMode('desktop')}
          className={`px-2 py-0.5 text-[11px] flex items-center gap-1 transition-colors ${
            overrideMode === 'desktop'
              ? 'bg-[#C5A059] text-white font-semibold'
              : 'text-stone-400 hover:text-white'
          }`}
          title="Force Desktop Presentation Shell"
        >
          <Monitor className="w-3 h-3" />
          <span>Desktop</span>
        </button>
        <button
          onClick={() => setOverrideMode('mobile')}
          className={`px-2 py-0.5 text-[11px] flex items-center gap-1 transition-colors ${
            overrideMode === 'mobile'
              ? 'bg-[#C5A059] text-white font-semibold'
              : 'text-stone-400 hover:text-white'
          }`}
          title="Force Mobile Presentation Shell"
        >
          <Smartphone className="w-3 h-3" />
          <span>Mobile</span>
        </button>
      </div>
    </aside>
  );
};
