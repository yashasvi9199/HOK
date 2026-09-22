import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useDeviceLayout } from './hooks/useDeviceLayout';
import { DesktopShell } from './views/desktop/DesktopShell';
import { MobileShell } from './views/mobile/MobileShell';
import { GalleryPage } from './views/pages/GalleryPage';
import { FAQPage } from './views/pages/FAQPage';
import { ContactPage } from './views/pages/ContactPage';
import { TermsPage } from './views/pages/TermsPage';
import { PrivacyPage } from './views/pages/PrivacyPage';
import { DeviceSwitcherPill } from './components/DeviceSwitcherPill';

// Helper component to ensure window scrolls to top upon page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Inner App Content routed through presentation shells
function AppContent() {
  const { isMobile, device, overrideMode, setOverrideMode } = useDeviceLayout();

  const routes = (
    <Routes>
      <Route path="/" element={null} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      {/* Catch-all to home */}
      <Route path="*" element={null} />
    </Routes>
  );

  return (
    <div className="relative min-h-screen">
      <ScrollToTop />

      {/* Hard Platform Split Presentation Shells */}
      {isMobile ? (
        <MobileShell>{routes}</MobileShell>
      ) : (
        <DesktopShell>{routes}</DesktopShell>
      )}

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
      <AppContent />
    </BrowserRouter>
  );
}
