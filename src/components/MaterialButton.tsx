import { ButtonHTMLAttributes } from 'react';

interface MaterialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outlined' | 'text';
  fullWidth?: boolean;
}

export function MaterialButton({
  variant = 'filled',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: MaterialButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    filled: 'bg-blue-600 text-white shadow-md hover:shadow-lg hover:bg-blue-700',
    outlined: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:bg-blue-50'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
