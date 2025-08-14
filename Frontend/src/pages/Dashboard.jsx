import React, { useState } from 'react';
import { Activity, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MetricsCard from '../components/dashboard/MetricsCard';
import ChartCard from '../components/dashboard/ChartCard';
import TimeFilter from '../components/dashboard/TimeFilter';
import { useDashboardData } from '../hooks/useDashboardData';
import { useLogsData } from '../hooks/useLogsData';
import {LogsTable} from '../components/logs/LogsTable.jsx';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('day');
  const { metrics, chartData, loading: dashboardLoading } = useDashboardData(timeRange);
  const { logs, totalLogs, loading: logsLoading, currentPage, totalPages, setCurrentPage } = useLogsData(timeRange);

  const handleTimeRangeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Interface Monitoring Dashboard</h1>
          <p className="text-gray-400">Monitor and analyze your HR integrations in real-time</p>
        </div>
        <TimeFilter timeRange={timeRange} onTimeRangeChange={handleTimeRangeChange} />
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard
          title="Total Executions"
          value={metrics?.totalExecutions?.toLocaleString() || '0'}
          subtitle="All interfaces"
          icon={Activity}
          color="blue"
          isLoading={dashboardLoading}
        />
        <MetricsCard
          title="Success Rate"
          value={`${metrics?.successRate || '0'}%`}
          subtitle={`${metrics?.successCount || 0} successful`}
          trend="up"
          trendValue="5.2"
          icon={CheckCircle}
          color="green"
          isLoading={dashboardLoading}
        />
        <MetricsCard
          title="Failed Executions"
          value={metrics?.failureCount?.toLocaleString() || '0'}
          subtitle="Requires attention"
          trend="down"
          trendValue="2.1"
          icon={XCircle}
          color="red"
          isLoading={dashboardLoading}
        />
        <MetricsCard
          title="Warnings"
          value={metrics?.warningCount?.toLocaleString() || '0'}
          subtitle="Partial success"
          icon={AlertTriangle}
          color="yellow"
          isLoading={dashboardLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <ChartCard
            title="Execution Trends"
            data={chartData}
            type="line"
            isLoading={dashboardLoading}
          />
        </div>
        <ChartCard
          title="Status Distribution"
          data={chartData}
          type="pie"
          isLoading={dashboardLoading}
        />
      </div>

      {/* Additional Chart Row */}
      <div className="mb-8">
        <ChartCard
          title="Execution Volume by Time"
          data={chartData}
          type="bar"
          isLoading={dashboardLoading}
        />
      </div>

      {/* Logs Table */}
      <LogsTable
        logs={logs}
        totalLogs={totalLogs}
        loading={logsLoading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};

export default Dashboard;
