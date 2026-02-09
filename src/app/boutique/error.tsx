'use client';

export default function BoutiqueError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-4xl mb-3">📦</p>
      <h2 className="text-lg font-bold mb-2">Failed to load templates</h2>
      <button onClick={reset} className="px-5 py-2 bg-accent text-white font-bold rounded-button">
        Retry
      </button>
    </div>
  );
}
