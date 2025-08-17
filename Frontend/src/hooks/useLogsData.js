import { useState, useEffect, useMemo } from 'react';
import { baseApi } from '../utils/baseApi';
export const useLogsData = (timeRange, filters = {}) => {
  const [logs, setLogs] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filtersString = JSON.stringify(filters);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      
      try {
        // Build query params
        const params = new URLSearchParams({
          page: currentPage,
          limit: 20,
          ...filters
        });

        const response = await fetch(`${baseApi}/api/logs?${params}`);
        const data = await response.json();
        console.log(data,'ddddaaaatttaaa');
        
        setLogs(data.logs);
        setTotalLogs(data.totalLogs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [timeRange, filtersString, currentPage]);

  return {
    logs,
    totalLogs,
    loading,
    currentPage,
    totalPages: Math.ceil(totalLogs / 20),
    setCurrentPage
  };
};
