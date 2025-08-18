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

    // Calculate start date based on timeRange
    let startDate = new Date();
    let groupFormat = {};

    if (timeRange === 'hour') {
      startDate.setHours(startDate.getHours() - 1);
      groupFormat = { $hour: "$timestamp" };
    } else if (timeRange === 'day') {
      startDate.setDate(startDate.getDate() - 1);
      groupFormat = { $hour: "$timestamp" }; // Each hour in the day
    } else if (timeRange === 'week') {
      startDate.setDate(startDate.getDate() - 7);
      groupFormat = { $dayOfMonth: "$timestamp" }; // Each day in the week
    } else if (timeRange === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
      groupFormat = { $dayOfMonth: "$timestamp" }; // Each day in the month
    } else {
      startDate.setDate(startDate.getDate() - 1);
      groupFormat = { $hour: "$timestamp" };
    }

    // MongoDB aggregation: group by time interval, count status
    const chartData = await InterfaceLog.aggregate([
      { $match: { timestamp: { $gte: startDate } } },
      { $group: {
          _id: groupFormat,
          success: { $sum: { $cond: [ { $eq: ["$status", "success"] }, 1, 0 ] } },
          failure: { $sum: { $cond: [ { $eq: ["$status", "failure"] }, 1, 0 ] } },
          warning: { $sum: { $cond: [ { $eq: ["$status", "warning"] }, 1, 0 ] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format the result for frontend chart
    const formattedChartData = chartData.map(item => ({
      time: item._id.toString(),
      success: item.success,
      failure: item.failure,
      warning: item.warning
    }));

    res.json(formattedChartData);

  } catch (error) {
    console.error('Error getting chart data:', error);
    res.status(500).json({ error: 'Failed to get chart data' });
  }
});

export default router;
