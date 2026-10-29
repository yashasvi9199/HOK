import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDeviceLayout } from './hooks/useDeviceLayout';
import { DesktopShell } from './views/desktop/DesktopShell';
import { MobileShell } from './views/mobile/MobileShell';
import { DeviceSwitcherPill } from './components/DeviceSwitcherPill';

// Helper component to handle legacy path redirects to anchor sections
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/gallery') {
      navigate('/', { replace: true });
      setTimeout(() => {
        document.getElementById('parallax-cards-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (pathname === '/contact' || pathname === '/faq') {
      navigate('/', { replace: true });
      setTimeout(() => {
        document.getElementById('consultation-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, navigate]);

  return null;
}

// Inner App Content routed through presentation shells
function AppContent() {
  const { isMobile, device, overrideMode, setOverrideMode } = useDeviceLayout();

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />

      {/* Hard Platform Split Presentation Shells */}
      {isMobile ? <MobileShell /> : <DesktopShell />}

      {/* Interactive Device Switcher Pill for reviewer convenience */}
      <DeviceSwitcherPill
        overrideMode={overrideMode}
        setOverrideMode={setOverrideMode}
        currentDevice={device}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}
