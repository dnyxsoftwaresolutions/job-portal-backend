const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const applicationRoutes = require('./routes/applications');
const cors = require('cors');

dotenv.config();

const app = express();

// ✅ Allow only specific origins
const allowedOrigins = [
  "http://localhost:8000",
  "http://localhost:5173",  "http://localhost:8080",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  }
}));

// ✅ Parse JSON request bodies
app.use(express.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// API routes
app.use('/api', applicationRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Job Application API!');
});

module.exports = app;
