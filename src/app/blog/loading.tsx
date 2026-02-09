export default function BlogLoading() {
  return (
    <div className="animate-pulse px-4 py-8 max-w-[1200px] mx-auto space-y-6">
      <div className="h-8 bg-surface-alt rounded w-48" />
      <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-video bg-surface-alt rounded-card" />
            <div className="h-4 bg-surface-alt rounded w-3/4" />
            <div className="h-3 bg-surface-alt rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
