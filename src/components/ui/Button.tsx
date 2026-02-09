import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-[0_4px_12px_rgba(232,168,56,0.3)] hover:bg-accent-hover active:scale-[0.98] active:shadow-[0_2px_6px_rgba(232,168,56,0.2)]',
  secondary:
    'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:
    'bg-transparent text-primary text-sm font-medium hover:underline',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth = false, className = '', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-semibold text-base leading-none rounded-button min-h-[52px] px-8 py-4 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

    return (
      <button
        ref={ref}
        className={`${base} ${styles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
