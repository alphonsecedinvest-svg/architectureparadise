const items = [
  { icon: '🇨🇭', title: 'Handcrafted', subtitle: 'by Swiss Designers' },
  { icon: '⚡', title: 'Instant', subtitle: 'Download' },
  { icon: '🖥️', title: 'All CAD', subtitle: 'Software' },
  { icon: '📐', title: 'Professional', subtitle: 'Use Licensed' },
];

export default function TrustBar() {
  return (
    <section className="bg-surface-alt py-6 px-4">
      <div className="flex gap-6 overflow-x-auto no-scrollbar max-w-[1200px] mx-auto justify-center">
        {items.map((item) => (
          <div key={item.title} className="flex-shrink-0 flex flex-col items-center text-center min-w-[72px]">
            <span className="text-2xl mb-1">{item.icon}</span>
            <span className="text-xs font-bold text-text-primary">{item.title}</span>
            <span className="text-xs text-text-secondary">{item.subtitle}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
