import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, MoreVertical } from 'lucide-react';
import StatusTag from './StatusTag';
import FiltersModal from './FiltersModal';

const LogsTable = ({ logs, totalLogs, loading, currentPage, totalPages, onPageChange }) => {
  const [columnFilters, setColumnFilters] = useState({
    interfaceName: '',
    integrationKey: '',
    status: '',
    message: ''
  });
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    status: '',
    interfaceName: '',
    integrationKey: '',
    dateRange: { start: '', end: '' }
  });

  const handleColumnFilter = (column, value) => {
    setColumnFilters(prev => ({ ...prev, [column]: value }));
  };

  if (loading) {
    return (
      <div className="glass-card p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card">
      {/* Table Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Interface Logs</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">{totalLogs} total logs</span>
            <button
              onClick={() => setShowFiltersModal(true)}
              className="flex items-center space-x-2 px-3 py-2 glass rounded-lg hover:bg-white/10 transition-smooth"
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Advanced Filters</span>
            </button>
          </div>
        </div>

        {/* Column Filters */}
        <div className="grid grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter interface..."
              value={columnFilters.interfaceName}
              onChange={(e) => handleColumnFilter('interfaceName', e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter key..."
              value={columnFilters.integrationKey}
              onChange={(e) => handleColumnFilter('integrationKey', e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <select
            value={columnFilters.status}
            onChange={(e) => handleColumnFilter('status', e.target.value)}
            className="w-full px-3 py-2 glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="failure">Failure</option>
            <option value="warning">Warning</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter message..."
              value={columnFilters.message}
              onChange={(e) => handleColumnFilter('message', e.target.value)}
              className="w-full pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Interface Name</th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Integration Key</th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Status</th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Message</th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Timestamp</th>
              <th className="text-left py-4 px-6 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id || log._id} className="border-b border-white/5 hover:bg-white/5 transition-smooth">
                <td className="py-4 px-6 text-white font-medium">{log.interfaceName}</td>
                <td className="py-4 px-6">
                  <code className="px-2 py-1 bg-gray-700/50 rounded text-blue-400 text-sm">
                    {log.integrationKey}
                  </code>
                </td>
                <td className="py-4 px-6">
                  <StatusTag status={log.status} />
                </td>
                <td className="py-4 px-6 text-gray-300 max-w-xs truncate" title={log.message}>
                  {log.message}
                </td>
                <td className="py-4 px-6 text-gray-400 text-sm">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="py-4 px-6">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Modal */}
      <FiltersModal
        isOpen={showFiltersModal}
        onClose={() => setShowFiltersModal(false)}
        filters={advancedFilters}
        onFiltersChange={setAdvancedFilters}
      />
    </div>
  );
};

LogsTable.displayName = 'LogsTable';

export default LogsTable;