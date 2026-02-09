import { SkeletonGrid } from '@/components/ui/Skeleton';

export default function BoutiqueLoading() {
  return (
    <div className="px-4 py-4">
      <div className="h-8 bg-surface-alt rounded w-48 mb-4 animate-pulse" />
      <SkeletonGrid count={8} />
    </div>
  );
}
