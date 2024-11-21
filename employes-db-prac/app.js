const express = require('express');
const app = express();
const connectDatabase = require('./connet-db/connect-db');
const employeesRoutes = require('./routes/employees-routes');

require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/v1/employees', employeesRoutes);

const port = 3000;

const startServer = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    // Consider more specific error handling, e.g., logging to a file or sending error notifications
  }
};

startServer();