let mongoose = require('mongoose');
let chalk = require('chalk');
let config = require('../configs/config');
const dbUri = `mongodb://${config.host}:${config.port}/${config.database}`;
const reconnectTimeout = 5000;
const log = console.log;

const connect = () => {
    mongoose.connect(dbUri, { auto_reconnect: true, useNewUrlParser: true });
}

module.exports = () => {
    const db = mongoose.connection;

    db.on('connecting', () => log(chalk.blue('Connecting to the Database...')));

    db.on('connected', () => log(chalk.green('Database Connected!')));

    db.on('reconnected', () => log(chalk.green('Reconnection Success!')));

    db.on('error', (err) => { 
        log(chalk.red(`Error: ${err}`)); 
        mongoose.disconnect() 
    });

    db.on('disconnected', () => { 
        log(chalk.yellow(`Reconnecting to Database in ${reconnectTimeout / 1000}s...`));
        setTimeout(() => connect(), reconnectTimeout);
    });
    connect();
}