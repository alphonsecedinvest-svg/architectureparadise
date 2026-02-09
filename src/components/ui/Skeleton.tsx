export function SkeletonCard() {
  return (
    <div className="bg-card rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden animate-pulse">
      <div className="aspect-[3/2] bg-surface-alt" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-surface-alt rounded w-2/3" />
        <div className="h-4 bg-surface-alt rounded w-full" />
        <div className="h-4 bg-surface-alt rounded w-3/4" />
        <div className="h-3 bg-surface-alt rounded w-1/3" />
        <div className="h-6 bg-surface-alt rounded w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 px-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
