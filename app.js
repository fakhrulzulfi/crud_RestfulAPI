require('dotenv').config();
const express = require('express');     // --> import Express
const cors = require('cors');   // --> import CORS
const indexRouter = require('./src/routes/index');
const bodyParser = require('body-parser'); //  --> body-parser untuk membaca POST data

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json');


const app = express();

//  CORS
app.use(cors());

// Body-Parser
app.use(bodyParser.urlencoded({ extended: false })); // --> parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //  --> parse application/json

// swagger
const options = {
    customSiteTitle: 'RestAPI | Article'
}
app.use('/swagger/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

app.use('/api', indexRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});