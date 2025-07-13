export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  name?: string;
  id?: string;
}

export const Input = ({ 
  value, 
  onChange, 
  placeholder = "Enter text...", 
  disabled = false,
  type = 'text',
  name,
  id
}: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      name={name}
      id={id}
      className={`
        w-full p-4 border border-gray-700 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
        bg-gray-900/50 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
      `}
    />
  );
}; 