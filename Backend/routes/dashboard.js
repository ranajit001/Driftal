import express from 'express';
import InterfaceLog from '../models/InterfaceLog.js';

const router = express.Router();

// GET /api/dashboard/metrics - Get dashboard metrics
router.get('/metrics', async (req, res) => {
  try {
    const { timeRange } = req.query; // 'hour', 'day', 'week', 'month'
    
    // Calculate date range based on timeRange
    let startDate = new Date();
    switch (timeRange) {
      case 'hour':
        startDate.setHours(startDate.getHours() - 1);
        break;
      case 'day':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        startDate.setDate(startDate.getDate() - 1);
    }

    // Get total counts using simple aggregation
    const metrics = await InterfaceLog.aggregate([
      {
        $match: {
          timestamp: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Process results into simple object
    const result = {
      totalExecutions: 0,
      successCount: 0,
      failureCount: 0,
      warningCount: 0,
      successRate: 0
    };

    metrics.forEach(metric => {
      result.totalExecutions += metric.count;
      result[`${metric._id}Count`] = metric.count;
    });

    // Calculate success rate
    if (result.totalExecutions > 0) {
      result.successRate = ((result.successCount / result.totalExecutions) * 100).toFixed(1);
    }
    console.log(result)

    res.json(result);

  } catch (error) {
    console.error('Error getting dashboard metrics:', error);
    res.status(500).json({ error: 'Failed to get dashboard metrics' });
  }
});

// GET /api/dashboard/chart-data - Get data for charts
router.get('/chart-data', async (req, res) => {
  try {
    const { timeRange } = req.query;
    
    // Simple chart data generation
    let hours = 24;
    if (timeRange === 'hour') hours = 1;
    if (timeRange === 'week') hours = 24 * 7;
    if (timeRange === 'month') hours = 24 * 30;

    const chartData = [];
    
    // Generate simple mock data for charts
    for (let i = 0; i < (timeRange === 'hour' ? 24 : timeRange === 'day' ? 24 : 30); i++) {
      chartData.push({
        time: timeRange === 'hour' ? `${i}:00` : timeRange === 'day' ? `${i}:00` : `Day ${i + 1}`,
        success: Math.floor(Math.random() * 100) + 50,
        failure: Math.floor(Math.random() * 20) + 5,
        warning: Math.floor(Math.random() * 10) + 2
      });
    }

    res.json(chartData);

  } catch (error) {
    console.error('Error getting chart data:', error);
    res.status(500).json({ error: 'Failed to get chart data' });
  }
});

export default router;
