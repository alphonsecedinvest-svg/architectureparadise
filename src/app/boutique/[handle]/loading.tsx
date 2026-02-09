export default function ProductLoading() {
  return (
    <div className="animate-pulse px-4 py-6 space-y-4">
      <div className="aspect-square bg-surface-alt rounded-card" />
      <div className="h-6 bg-surface-alt rounded w-3/4" />
      <div className="h-4 bg-surface-alt rounded w-1/2" />
      <div className="h-10 bg-surface-alt rounded w-full mt-4" />
      <div className="space-y-2 mt-6">
        <div className="h-3 bg-surface-alt rounded w-full" />
        <div className="h-3 bg-surface-alt rounded w-5/6" />
        <div className="h-3 bg-surface-alt rounded w-4/6" />
      </div>
    </div>
  );
}
