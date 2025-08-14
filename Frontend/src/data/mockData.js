// Mock data for simulating API responses
export const generateMockMetrics = (timeRange) => {
  const baseSuccess = Math.floor(Math.random() * 1000) + 500;
  const baseFailure = Math.floor(Math.random() * 100) + 20;
  const baseWarning = Math.floor(Math.random() * 50) + 10;

  return {
    totalExecutions: baseSuccess + baseFailure + baseWarning,
    successCount: baseSuccess,
    failureCount: baseFailure,
    warningCount: baseWarning,
    successRate: ((baseSuccess / (baseSuccess + baseFailure + baseWarning)) * 100).toFixed(1),
    lastUpdated: new Date().toISOString()
  };
};

export const generateMockChartData = (timeRange) => {
  const dataPoints = timeRange === 'hour' ? 24 : timeRange === 'day' ? 24 : 30;
  const data = [];
  
  for (let i = 0; i < dataPoints; i++) {
    data.push({
      time: timeRange === 'hour' ? `${i}:00` : timeRange === 'day' ? `${i}:00` : `Day ${i + 1}`,
      success: Math.floor(Math.random() * 100) + 50,
      failure: Math.floor(Math.random() * 20) + 5,
      warning: Math.floor(Math.random() * 10) + 2
    });
  }
  
  return data;
};

export const generateMockLogs = (count = 100) => {
  const interfaces = [
    'Employee Sync', 'Payroll Integration', 'Time Tracking', 'Benefits Enrollment',
    'Performance Review', 'Onboarding Process', 'Leave Management', 'Training Records'
  ];
  
  const integrationKeys = [
    'EMP_SYNC_001', 'PAY_INT_002', 'TIME_TRK_003', 'BEN_ENR_004',
    'PERF_REV_005', 'ONBOARD_006', 'LEAVE_MGT_007', 'TRAIN_REC_008'
  ];
  
  const statuses = ['success', 'failure', 'warning'];
  const messages = {
    success: [
      'Integration completed successfully',
      'Data synchronized without errors',
      'All records processed successfully',
      'Connection established and data transferred'
    ],
    failure: [
      'Connection timeout to external system',
      'Authentication failed',
      'Data validation errors found',
      'Network connection lost during transfer'
    ],
    warning: [
      'Some records skipped due to validation',
      'Partial data sync completed',
      'Rate limit approaching',
      'Non-critical errors encountered'
    ]
  };
  
  return Array.from({ length: count }, (_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const interfaceName = interfaces[Math.floor(Math.random() * interfaces.length)];
    const integrationKey = integrationKeys[Math.floor(Math.random() * integrationKeys.length)];
    const message = messages[status][Math.floor(Math.random() * messages[status].length)];
    
    return {
      id: index + 1,
      interfaceName,
      integrationKey,
      status,
      message,
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      duration: Math.floor(Math.random() * 5000) + 100 // milliseconds
    };
  });
};
