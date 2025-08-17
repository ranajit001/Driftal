import mongoose from 'mongoose';
import InterfaceLog from '../models/InterfaceLog.js';
import connectDB from '../database.js';

// Sample data to populate your database
const sampleLogs = [
  {
    interfaceName: 'Employee Sync',
    integrationKey: 'EMP_SYNC_001',
    status: 'success',
    message: 'Integration completed successfully',
    duration: 1250
  },
  {
    interfaceName: 'Payroll Integration',
    integrationKey: 'PAY_INT_002',
    status: 'failure',
    message: 'Connection timeout to external system',
    duration: 5000
  },
  {
    interfaceName: 'Time Tracking',
    integrationKey: 'TIME_TRK_003',
    status: 'warning',
    message: 'Some records skipped due to validation',
    duration: 2100
  },
  {
    interfaceName: 'Benefits Enrollment',
    integrationKey: 'BEN_ENR_004',
    status: 'success',
    message: 'Data synchronized without errors',
    duration: 890
  },
  {
    interfaceName: 'Performance Review',
    integrationKey: 'PERF_REV_005',
    status: 'success',
    message: 'All records processed successfully',
    duration: 1456
  }
];

// Function to seed the database
export const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await InterfaceLog.deleteMany({});
    console.log(' Cleared existing logs');

    // Generate more sample data
    const logs = [];
    for (let i = 0; i < 100; i++) {
      const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      const log = {
        ...randomLog,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000) // Random time in last 24 hours
      };
      logs.push(log);
    }

    // Insert sample data
    await InterfaceLog.insertMany(logs);
    console.log('Database seeded with 100 sample logs');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};


