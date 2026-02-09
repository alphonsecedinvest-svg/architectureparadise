interface StarRatingProps {
  rating: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'gold' | 'trustpilot';
}

export default function StarRating({ rating, count, size = 'sm', variant = 'gold' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  const stars = Array.from({ length: 5 }, (_, i) => {
    const filled = rating >= i + 1;
    const half = !filled && rating >= i + 0.5;
    const active = filled || half;

    if (variant === 'trustpilot') {
      return (
        <span
          key={i}
          className={`inline-flex items-center justify-center rounded-[4px] ${
            size === 'lg' ? 'w-8 h-8' : size === 'md' ? 'w-6 h-6' : 'w-5 h-5'
          } ${active ? 'bg-trustpilot' : 'bg-[#E8E8E8]'}`}
        >
          <span className={`${active ? 'text-white' : 'text-[#C0C0C0]'} ${sizeClasses[size]} leading-none`}>★</span>
        </span>
      );
    }

    return (
      <span key={i} className={`${active ? 'text-star' : 'text-border'} ${sizeClasses[size]}`}>
        ★
      </span>
    );
  });

  return (
    <span className="inline-flex items-center gap-1">
      <span className={`flex ${variant === 'trustpilot' ? 'gap-1' : ''}`}>{stars}</span>
      {count !== undefined && (
        <span className="text-text-secondary text-xs">({count})</span>
      )}
    </span>
  );
}
