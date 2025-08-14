import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database.js';
import cors from 'cors';

// Import routes
import dashboardRoutes from './routes/dashboard.js';
import logsRoutes from './routes/logs.js';
import { seedDatabase } from './utils/seedData.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database


// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Interface Monitoring API is running!',
    version: '1.0.0',
    endpoints: {
      dashboard: '/api/dashboard',
      logs: '/api/logs'
    }
  });
});

// API routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/logs', logsRoutes);

// Start server
app.listen(PORT, async() => {
    await connectDB();
    await seedDatabase();
  console.log(` Server running on port ${PORT}`);
  console.log(` Dashboard API: http://localhost:${PORT}/api/dashboard`);
  console.log(` Logs API: http://localhost:${PORT}/api/logs`);
});
