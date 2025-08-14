import { useState, useEffect } from 'react';

export const useDashboardData = (timeRange) => {
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Replace mock data with real API calls
        const [metricsRes, chartRes] = await Promise.all([
          fetch(`http://localhost:5000/api/dashboard/metrics?timeRange=${timeRange}`),
          fetch(`http://localhost:5000/api/dashboard/chart-data?timeRange=${timeRange}`)
        ]);

        const newMetrics = await metricsRes.json();
        const newChartData = await chartRes.json();
        
        setMetrics(newMetrics);
        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  return { metrics, chartData, loading };
};
