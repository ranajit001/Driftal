import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const ChartCard = React.memo(({ title, data, type = 'line', isLoading = false }) => {
  const colors = {
    success: '#10B981',
    failure: '#EF4444',
    warning: '#F59E0B'
  };

  const pieColors = ['#10B981', '#EF4444', '#F59E0B'];

  // Prepare pie chart data
  const pieData = data.length > 0 ? [
    { name: 'Success', value: data.reduce((acc, item) => acc + item.success, 0), color: colors.success },
    { name: 'Failure', value: data.reduce((acc, item) => acc + item.failure, 0), color: colors.failure },
    { name: 'Warning', value: data.reduce((acc, item) => acc + item.warning, 0), color: colors.warning }
  ] : [];

  if (isLoading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>
        <div className="w-full h-64 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="success" stroke={colors.success} strokeWidth={2} />
              <Line type="monotone" dataKey="failure" stroke={colors.failure} strokeWidth={2} />
              <Line type="monotone" dataKey="warning" stroke={colors.warning} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Legend />
              <Bar dataKey="success" fill={colors.success} />
              <Bar dataKey="failure" fill={colors.failure} />
              <Bar dataKey="warning" fill={colors.warning} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: 'none', 
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
});

ChartCard.displayName = 'ChartCard';

export default ChartCard;
