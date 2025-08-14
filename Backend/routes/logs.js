import express from 'express';
import InterfaceLog from '../models/InterfaceLog.js';

const router = express.Router();

// GET /api/logs - Get all logs with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Simple filtering
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.interfaceName) {
      filter.interfaceName = { $regex: req.query.interfaceName, $options: 'i' };
    }
    if (req.query.integrationKey) {
      filter.integrationKey = { $regex: req.query.integrationKey, $options: 'i' };
    }

    // Get logs with pagination
    const logs = await InterfaceLog.find(filter)
      .sort({ timestamp: -1 }) // Most recent first
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const totalLogs = await InterfaceLog.countDocuments(filter);
    const totalPages = Math.ceil(totalLogs / limit);

    res.json({
      logs,
      currentPage: page,
      totalPages,
      totalLogs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    });

  } catch (error) {
    console.error('Error getting logs:', error);
    res.status(500).json({ error: 'Failed to get logs' });
  }
});

// POST /api/logs - Create a new log entry
router.post('/', async (req, res) => {
  try {
    const { interfaceName, integrationKey, status, message, duration } = req.body;

    // Simple validation
    if (!interfaceName || !integrationKey || !status || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newLog = new InterfaceLog({
      interfaceName,
      integrationKey,
      status,
      message,
      duration: duration || 0
    });

    const savedLog = await newLog.save();
    res.status(201).json(savedLog);

  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({ error: 'Failed to create log' });
  }
});

export default router;
