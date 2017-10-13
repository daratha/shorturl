const express        = require('express');
const redis          = require('redis');
const bodyParser     = require('body-parser');
var env = process.env.NODE_ENV || 'production';

console.log("Environment  :"+env);
var config = require('./config/config')[env];

var redisClient = redis.createClient(config.database.port, config.database.host);
    
const app            = express();


const port = config.server.server_port;

console.log(app.env);
console.log(process.env.NODE_ENV);


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