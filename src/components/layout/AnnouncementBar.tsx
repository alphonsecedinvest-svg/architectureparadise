'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const wasDismissed = sessionStorage.getItem('ap-announce-dismissed') === 'true';
    setDismissed(wasDismissed);
    setMounted(true);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('ap-announce-dismissed', 'true');
  };

  if (!mounted || dismissed) return null;

  return (
    <div className="bg-primary text-white text-xs text-center py-2 px-4 relative">
      <Link href="/boutique/residential-pack-bundle" className="hover:underline">
        🔥 Residential Bundle: Save $13 — 3 block packs for the price of 2 → Shop now
      </Link>
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
