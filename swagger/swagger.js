const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./src/routes/index.js'];

const options = {
    info: {
        title: 'My API',
        description: 'Description',
    },
    host: 'localhost:3000',
    openapi: 'Enable'
};

swaggerAutogen(outputFile, endpointsFiles, options);