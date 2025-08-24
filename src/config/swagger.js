const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Application API',
      version: '1.0.0',
      description: 'A simple Express.js API for handling job applications using Node.js, Express, MongoDB Atlas, Prisma, and Swagger UI.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`, // ✅ Local dev
      },
      {
        url: 'https://job-portal-backend-1j1p.onrender.com', // ✅ Render deployment
      },
    ],
  },
  // Path to your route files
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
