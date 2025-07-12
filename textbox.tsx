export interface TextboxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Textbox = ({ 
  value, 
  onChange, 
  placeholder = "Type your prompt here...", 
  disabled = false 
}: TextboxProps) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full p-4 border border-gray-700 rounded-lg resize-none
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
        bg-gray-900/50 text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed
      `}
      rows={3}
      style={{ minHeight: '60px', maxHeight: '200px' }}
    />
  );
}; 