'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    setDismissed(localStorage.getItem('ap-announce-dismissed') === 'true');
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem('ap-announce-dismissed', 'true');
  };

  if (dismissed) return null;

  return (
    <div className="bg-primary text-white text-xs text-center py-2 px-4 relative">
      <span>🇨🇭 Handcrafted by Swiss designers · Instant download · Professional use licensed</span>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
