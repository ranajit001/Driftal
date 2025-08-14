import React from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const StatusTag = ({ status }) => {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-500/20',
      text: 'text-green-400',
      border: 'border-green-500/30',
      label: 'Success'
    },
    failure: {
      icon: XCircle,
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
      label: 'Failure'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-500/20',
      text: 'text-yellow-400',
      border: 'border-yellow-500/30',
      label: 'Warning'
    }
  };

  const config = statusConfig[status] || statusConfig.success;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${config.bg} ${config.text} ${config.border}`}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </span>
  );
};

export default StatusTag;
