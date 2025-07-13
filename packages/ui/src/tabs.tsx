import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
}

export const Tabs = ({
  items,
  defaultTab,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id || '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const currentTab = items.find(item => item.id === activeTab);

  return (
    <div className="w-full">
      <div className="flex border-b border-gray-700 mb-6">
        {items.map((item, index) => {
          const isActive = item.id === activeTab;

          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`
                relative px-6 py-3 text-sm font-medium transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'text-blue-400 border-b-2 border-blue-400 bg-blue-400/10'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900
                ${index === 0 ? 'rounded-tl-md' : ''}
                ${index === items.length - 1 ? 'rounded-tr-md' : ''}
              `}
            >
              <p className={isActive ? "font-bold" : ""}>
                {item.label}
              </p>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {currentTab?.content}
      </div>
    </div>
  );
}; 