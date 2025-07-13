import { Icon } from './icon';

export interface ButtonProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'default' | 'square' | 'circle';
  icon?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  block?: boolean;
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  outline: 'border border-blue-600 bg-transparent hover:bg-blue-50 text-blue-600',
  ghost: 'hover:bg-gray-100 hover:text-gray-900 text-gray-200',
};

const getSizeClasses = (size: NonNullable<ButtonProps['size']>, shape: NonNullable<ButtonProps['shape']>) => {
  if (shape === 'square' || shape === 'circle') {
    const map = {
      sm: 'p-1 text-sm',
      md: 'p-2 text-md',
      lg: 'p-3 text-lg'
    };
    return map[size];
  }

  const defaultSizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
  };
  return defaultSizes[size];
};

const iconSizes: Record<NonNullable<ButtonProps['size']>, number> = {
  sm: 1,
  md: 1.5,
  lg: 2
};

const shapes: Record<NonNullable<ButtonProps['shape']>, string> = {
  default: 'rounded-md',
  square: 'rounded-md',
  circle: 'rounded-full',
};

const disabledClasses = 'opacity-50 pointer-events-none cursor-not-allowed';

export const Button = ({
  label, 
  onClick, 
  href, 
  variant = 'primary',
  size = 'md',
  shape = 'default',
  icon,
  disabled,
  loading,
  type = 'button',
  block
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200 cursor-pointer
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
    ${block ? 'w-full' : ''}
    ${variants[variant]}
    ${getSizeClasses(size, shape)}
    ${shapes[shape]}
  `;

  const content = (
    <span className={icon || loading ? 'flex flex-row gap-2 items-center' : ''}>
      {loading ? (
        <p>...</p>
      ) : (
        <>
          {icon && <Icon name={icon} size={iconSizes[size]} />}
          {label && <p>{label}</p>}
        </>
      )}
    </span>
  );
  
  if (href && !onClick) {
    return (
      <a href={href} className={`${baseClasses} ${disabled ? disabledClasses : ''}`}>
        {content}
      </a>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      className={baseClasses}
      disabled={disabled || loading}
      type={type}
    >
      {content}
    </button>
  );
}; 