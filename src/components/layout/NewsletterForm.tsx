'use client';

import { useState } from 'react';
import { track } from '@/lib/utils/analytics';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    console.log('[Newsletter] Signup:', email);
    track('newsletter_signup', { method: 'footer' });
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <p className="text-sm text-success">✓ Thanks for subscribing!</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 px-3 py-2 rounded-button bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-bold rounded-button transition-colors"
      >
        Subscribe
      </button>
    </form>
  );
}
