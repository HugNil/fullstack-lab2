import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

import employeeRoutes from './routes/employee_routes.js';
import projectRoutes from './routes/project_routes.js';
import assignmentRoutes from './routes/projectAssignment_routes.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/', employeeRoutes);
app.use('/api/', projectRoutes);
app.use('/api/', assignmentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);  // Exit process
  });

  // If server takes too long to shut down, forcefully exit
  setTimeout(() => {
    console.error('Forceful shutdown due to timeout');
    process.exit(1);
  }, 10000);  // 10 seconds timeout before forcing shutdown
};

process.on('SIGINT', shutdown); // Ctrl+C
process.on('SIGTERM', shutdown); // System shutdown
