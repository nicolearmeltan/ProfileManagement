let express = require('express');
let logger = require('morgan');
let bodyParser = require('body-parser');
let db = require('../configs/dbConfig');
const config = require('../configs/config');
const port = config.app_port;

db();

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));

app.listen(port, () => console.log(`App Running on port: ${port}`));