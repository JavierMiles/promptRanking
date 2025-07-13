'use client';

import { useState, useRef, useEffect } from 'react';
import { Icon } from './icon';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value?: string;
  selectedValues?: string[];
  onChange?: (value: string) => void;
  onSelectionChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export const Dropdown = ({ 
  label, 
  options, 
  value, 
  selectedValues = [],
  onChange, 
  onSelectionChange,
  placeholder = "Select an option...",
  disabled = false,
  multiple = false
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      onSelectionChange?.(optionValue);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleToggle = () => setIsOpen(!isOpen);

  const getDisplayText = () => {
    if (multiple) {
      return selectedOptions.map(option => option.label).join(', ') || placeholder;
    }

    return selectedOption ? selectedOption.label : placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`
          w-full px-4 py-2 border border-gray-700 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
          bg-gray-900/50 text-white placeholder-gray-400 
          disabled:opacity-50 disabled:cursor-not-allowed
          flex items-center justify-between
          ${isOpen ? 'ring-2 ring-blue-600 border-transparent' : ''}
        `}
      >
        <span className={`w-full truncate text-left ${selectedOptions.length > 0 || selectedOption ? 'text-white' : 'text-gray-400'}`}>
          {getDisplayText()}
        </span>
        <Icon 
          name={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} 
          size={1.5} 
          color="text-gray-400"
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-gray-400 text-sm">
              No options available
            </div>
          ) : (
            options.map((option) => {
              const isSelected = multiple 
                ? selectedValues.includes(option.value)
                : option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionClick(option.value)}
                  className={`
                    w-full px-4 py-3 text-left text-sm
                    hover:bg-gray-700 focus:outline-none
                    text-gray-300
                    flex items-center gap-3
                  `}
                >
                  <div className={`
                    w-3 h-3 rounded-full flex-shrink-0
                    ${isSelected ? 'bg-blue-500' : 'bg-gray-600'}
                  `} />
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}; 
