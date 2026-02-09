interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md';
}

export default function StarRating({ rating, count, size = 'sm' }: StarRatingProps) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1;
    const half = !filled && rating >= i + 0.5;
    return (
      <span key={i} className={`${filled || half ? 'text-star' : 'text-border'} ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        ★
      </span>
    );
  });

  return (
    <span className="inline-flex items-center gap-1">
      <span className="flex">{stars}</span>
      {count !== undefined && (
        <span className="text-text-secondary text-xs">({count})</span>
      )}
    </span>
  );
}
