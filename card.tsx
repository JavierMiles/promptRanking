export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'combat';
  className?: string;
}

const variants: Record<NonNullable<CardProps['variant']>, string> = {
  default: 'bg-gray-900/50 border-gray-700 rounded-lg border shadow-sm p-6',
  combat: 'bg-gray-800 border-gray-600 shadow-lg p-4 border-2',
};

export const Card = ({ children, variant = 'default', className = '' }: CardProps) => {
  return (
    <section className={`${variants[variant]} ${className}`}>
      {children}
    </section>
  );
};
