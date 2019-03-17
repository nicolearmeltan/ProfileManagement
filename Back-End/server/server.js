let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let db = require('../configs/dbConfig');
let app = express();
const config = require('../configs/config');
const routes = require('../routes/routes');
const port = config.app_port;

db();

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => console.log(`App Running on port: ${port}`));