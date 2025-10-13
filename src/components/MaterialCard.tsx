import { ReactNode } from 'react';

interface MaterialCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
}

export function MaterialCard({ children, className = '', elevated = true }: MaterialCardProps) {
  const shadowClass = elevated ? 'shadow-lg' : 'shadow-md';

  return (
    <div className={`bg-white rounded-2xl ${shadowClass} ${className}`}>
      {children}
    </div>
  );
}
