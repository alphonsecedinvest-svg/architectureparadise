'use client';

import { useState } from 'react';

const tabs = ['All', 'AutoCAD', 'ArchiCAD', 'Revit', 'Illustrator', 'Photoshop'];

interface SoftwareTabsProps {
  onTabChange?: (tab: string) => void;
}

export default function SoftwareTabs({ onTabChange }: SoftwareTabsProps) {
  const [active, setActive] = useState('All');

  const handleClick = (tab: string) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="px-4 py-4">
      <div className="flex gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory max-w-[1200px] mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleClick(tab)}
            className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              active === tab
                ? 'bg-primary text-white'
                : 'bg-transparent border border-border text-primary hover:bg-surface-alt'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
