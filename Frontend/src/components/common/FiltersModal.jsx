import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';

const FiltersModal = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      status: '',
      interfaceName: '',
      integrationKey: '',
      dateRange: { start: '', end: '' }
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative glass-card p-6 w-full max-w-md border border-white/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Advanced Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-smooth"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Filter Options */}
        <div className="space-y-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select
              value={localFilters.status}
              onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value })}
              className="w-full px-3 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="">All Statuses</option>
              <option value="success">Success</option>
              <option value="failure">Failure</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          {/* Interface Name Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Interface Name</label>
            <input
              type="text"
              value={localFilters.interfaceName}
              onChange={(e) => setLocalFilters({ ...localFilters, interfaceName: e.target.value })}
              placeholder="Search interface names..."
              className="w-full px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Integration Key Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Integration Key</label>
            <input
              type="text"
              value={localFilters.integrationKey}
              onChange={(e) => setLocalFilters({ ...localFilters, integrationKey: e.target.value })}
              placeholder="Search integration keys..."
              className="w-full px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="datetime-local"
                value={localFilters.dateRange?.start || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  dateRange: { ...localFilters.dateRange, start: e.target.value }
                })}
                className="px-3 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <input
                type="datetime-local"
                value={localFilters.dateRange?.end || ''}
                onChange={(e) => setLocalFilters({ 
                  ...localFilters, 
                  dateRange: { ...localFilters.dateRange, end: e.target.value }
                })}
                className="px-3 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-6">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-gray-400 hover:text-white transition-smooth"
          >
            Reset All
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 glass rounded-lg hover:bg-white/10 transition-smooth text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-smooth text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
