const express        = require('express');
const redis          = require('redis');
const bodyParser     = require('body-parser');
const db             = require('./config/db');
var config           = require('./config/config')

var redisClient = redis.createClient(db.port, db.host);
    
const app            = express();


const port = config.server_port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

redisClient.on('connect', function() {
    console.log('Redis connected');
});

require('./app/routes')(app, redisClient);

var server = app.listen(port, () => {
  console.log('We are live on ' + port);
});

module.exports = server;