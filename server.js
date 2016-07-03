'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    path = require('path'),
    http = require('http'),
    configureRouter = require('./server/routes/api'),
    app = express();

var PUBLIC_PATH = path.join(__dirname, 'public');
var PORT = process.env.PORT || config.port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( PUBLIC_PATH ));

app.use('/api', configureRouter());

var server = http.createServer(app);

server.listen(PORT, function() {
    console.log('>>> Server started at port', PORT);
});