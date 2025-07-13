'use client';

import { useState } from 'react';
import { Icon } from './icon';

export interface AccordionProps {
  title: string;
  children: React.ReactNode;
  winner?: string;
  looser?: string;
}

const getBorderColor = (winner?: string, looser?: string) => {
  if (winner) return 'border-green-500/50';
  if (looser) return 'border-red-500/50';
  return 'border-gray-700';
};

export const Accordion = ({ title, children, winner, looser }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const borderColor = getBorderColor(winner, looser);

  return (
    <div className={`border rounded-lg overflow-hidden ${borderColor}`}>
      <button
        onClick={toggleAccordion}
        className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between text-left"
      >
        <p className="text-white font-medium">{title}</p>
        {winner && (
          <p className="text-green-500 font-bold ml-auto mr-6 md:mr-18">
            {winner}
          </p>
        )}
        <div className="text-gray-400 transition-transform duration-200">
          <Icon
            name={isOpen ? "expand_less" : "expand_more"}
            size={1.5}
          />
        </div>
      </button>
      <div 
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className={`px-4 py-3 bg-gray-900 border-t ${borderColor}`}>
          {children}
        </div>
      </div>
    </div>
  );
}; 