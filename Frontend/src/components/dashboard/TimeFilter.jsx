import React, { useState } from 'react';
import { ChevronDown, Calendar } from 'lucide-react';

const TimeFilter = ({ timeRange, onTimeRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const timeRangeOptions = [
    { value: 'hour', label: 'Last Hour' },
    { value: 'day', label: 'Last 24 Hours' },
    { value: 'week', label: 'Last Week' },
    { value: 'month', label: 'Last Month' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const currentOption = timeRangeOptions.find(option => option.value === timeRange);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 glass-card hover:bg-white/10 transition-smooth"
      >
        <Calendar className="w-4 h-4 text-gray-400" />
        <span className="text-white">{currentOption?.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/20 z-10">
          <div className="py-2">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onTimeRangeChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-smooth ${
                  timeRange === option.value ? 'text-blue-400 bg-blue-600/20' : 'text-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeFilter;
