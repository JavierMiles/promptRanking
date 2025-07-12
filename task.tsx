import { Icon } from './icon';

export type TaskVariant = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow';

export interface TaskProps {
  label: string;
  onClick: () => void;
  completed?: boolean;
  variant?: TaskVariant;
}

const variants: Record<NonNullable<TaskProps['variant']>, string> = {
  blue: 'border-blue-500 bg-blue-900/20 hover:bg-blue-900/40',
  green: 'border-green-500 bg-green-900/20 hover:bg-green-900/40',
  purple: 'border-purple-500 bg-purple-900/20 hover:bg-purple-900/40',
  orange: 'border-orange-500 bg-orange-900/20 hover:bg-orange-900/40',
  red: 'border-red-500 bg-red-900/20 hover:bg-red-900/40',
  yellow: 'border-yellow-500 bg-yellow-900/20 hover:bg-yellow-900/40',
};

export const Task = ({ 
  label, 
  onClick, 
  completed = false, 
  variant = 'purple' 
}: TaskProps) => {
  const completedClasses = completed ? 'opacity-60' : 'hover:scale-105';
  const iconName = completed ? 'done_outline' : 'check_box_outline_blank';

  return (
    <button
      className={`
        w-full p-4 border rounded-lg cursor-pointer
        transition-all duration-200
        flex items-center justify-between
        relative text-white
        disabled:cursor-default
        ${variants[variant]}
        ${completedClasses}
      `}
      onClick={onClick}
      type="button"
      disabled={completed}
    >
      <span className="font-medium">{label}</span>
      <Icon name={iconName} size={2} color={completed ? "text-green-400" : "text-white"} />
    </button>
  );
}; 