import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricsCard = React.memo(({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon: Icon, 
  color = 'blue',
  isLoading = false 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 neon-blue',
    green: 'from-green-500 to-green-600 neon-green',
    red: 'from-red-500 to-red-600 neon-red',
    yellow: 'from-yellow-500 to-yellow-600 neon-yellow'
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
        </div>
        <div className="w-16 h-8 bg-gray-300 rounded mb-2"></div>
        <div className="w-24 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 hover:scale-105 transition-smooth ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-300 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-white">{value}</p>
        {subtitle && (
          <p className="text-gray-400 text-sm">{subtitle}</p>
        )}
        
        {trend && trendValue && (
          <div className="flex items-center space-x-1">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trendValue}% from last period
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

MetricsCard.displayName = 'MetricsCard';

export default MetricsCard;
