const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const applicationRoutes = require('./routes/applications');

dotenv.config();

const app = express();
app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// API routes
app.use('/api', applicationRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Job Application API!');
});

module.exports = app;
