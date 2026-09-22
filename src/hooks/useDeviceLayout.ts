import { useState, useEffect, useCallback } from 'react';
import type { DeviceType } from '../features/device/device.types';

// * Device layout responsive breakpoint state contract
export interface DeviceLayoutState {
  readonly device: DeviceType;
  readonly isMobile: boolean;
  readonly isTablet: boolean;
  readonly isDesktop: boolean;
  readonly width: number;
  readonly overrideMode: 'auto' | 'mobile' | 'desktop';
  readonly setOverrideMode: (mode: 'auto' | 'mobile' | 'desktop') => void;
}

// * Hook tracking window resize events with SSR safe initializers and manual toggle override
export function useDeviceLayout(): DeviceLayoutState {
  const [width, setWidth] = useState<number>(() => {
    try {
      if (typeof window !== 'undefined') {
        return window.innerWidth;
      }
    } catch {
      // ! Default fallback for non-browser SSR execution
    }
    return 1200;
  });

  const [overrideMode, setOverrideModeState] = useState<'auto' | 'mobile' | 'desktop'>('auto');

  const setOverrideMode = useCallback((mode: 'auto' | 'mobile' | 'desktop') => {
    try {
      setOverrideModeState(mode);
    } catch (error) {
      console.error('Failed to set device override mode:', error);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      try {
        setWidth(window.innerWidth);
      } catch (error) {
        console.error('Error updating viewport width on resize:', error);
      }
    };

    try {
      window.addEventListener('resize', handleResize);
    } catch (error) {
      console.error('Error attaching resize event listener:', error);
    }

    return () => {
      try {
        window.removeEventListener('resize', handleResize);
      } catch (error) {
        console.error('Error removing resize event listener:', error);
      }
    };
  }, []);

  // * Strict breakpoint evaluations: Mobile < 768px, Tablet 768px - 1023px, Desktop >= 1024px
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
