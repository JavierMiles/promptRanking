export interface IconProps {
  name: string;
  size?: string | number;
  color?: `text-${string}`;
  spin?: boolean;
}

const getFontSize = (size: IconProps['size']) => {
  if (typeof size === 'number') return `${size}rem`;
  return size || '1.5rem';
};

export const Icon = ({
  name,
  size = '1.5rem',
  color = 'text-inherit',
  spin = false
}: IconProps) => {
  const fontSize = getFontSize(size);
  const spinClass = spin ? 'animate-spin' : '';

  return (
    <span
      className={`material-symbols-outlined transition-all ${color} ${spinClass}`}
      style={{ fontSize }}
    >
      {name}
    </span>
  );
}; 