type BadgeVariant = 'bestseller' | 'new' | 'discount' | 'software';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  bestseller: 'bg-accent text-white',
  new: 'bg-primary text-white',
  discount: 'bg-error text-white',
  software: 'bg-surface-alt text-primary border border-border',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-block uppercase text-[11px] font-semibold leading-none px-2 py-1 rounded-badge ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
