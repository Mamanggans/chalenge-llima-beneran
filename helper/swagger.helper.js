const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation for challenge 5 ',
      version: '1.0.0',
      description: 'API Documentation for challenge 5',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
        description: 'challenge 5 digitalent kominfo',
      },
    ],
  },
  apis: ['./routes/user.route.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;