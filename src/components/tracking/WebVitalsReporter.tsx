'use client';

import { useEffect } from 'react';
import { initWebVitals } from '@/lib/utils/performance';

export default function WebVitalsReporter() {
  useEffect(() => {
    initWebVitals();
  }, []);

  return null;
}
