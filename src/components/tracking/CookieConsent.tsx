'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ap-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ap-cookie-consent', 'accepted');
    setVisible(false);
    window.location.reload(); // Reload to init tracking scripts
  };

  const handleDecline = () => {
    localStorage.setItem('ap-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 print:hidden">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg border border-border p-4 flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:gap-4">
        <p className="text-sm text-text-secondary flex-1">
          We use cookies to improve your experience and analyze traffic.
        </p>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-button border border-border"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-bold text-white bg-accent hover:bg-accent-hover transition-colors rounded-button"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="p-1 text-text-muted hover:text-text-primary"
            aria-label="Dismiss cookie banner"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
