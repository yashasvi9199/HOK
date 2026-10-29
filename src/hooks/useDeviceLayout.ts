import { useState, useEffect } from 'react';
import { DeviceType } from '../types';

export interface DeviceLayoutState {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  overrideMode: 'auto' | 'mobile' | 'desktop';
  setOverrideMode: (mode: 'auto' | 'mobile' | 'desktop') => void;
}

export function useDeviceLayout(): DeviceLayoutState {
  const [width, setWidth] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return 1200;
  });

  const [overrideMode, setOverrideMode] = useState<'auto' | 'mobile' | 'desktop'>('auto');

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Breakpoints:
  // Mobile: < 768px
  // Tablet: >= 768px && < 1024px
  // Desktop: >= 1024px
  const detectedDevice: DeviceType =
    width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';

  const effectiveDevice: DeviceType =
    overrideMode === 'auto'
      ? detectedDevice
      : overrideMode === 'mobile'
      ? 'mobile'
      : 'desktop';

  return {
    device: effectiveDevice,
    isMobile: effectiveDevice === 'mobile',
    isTablet: effectiveDevice === 'tablet',
    isDesktop: effectiveDevice === 'desktop',
    width,
    overrideMode,
    setOverrideMode,
  };
}
