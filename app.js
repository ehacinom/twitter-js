// creates an instance of an express application
const express = require( 'express' );
const app = express(); 

// socket
const socketio = require('socket.io');

// templating
var nunjucks = require('nunjucks');

// body-parser
// html + json parsing
// middleware has to be before routing
const bodyParser = require('body-parser');
var urlEncoder = bodyParser.urlencoded({ extended: false });
var jsonEncoder = bodyParser.json();
app.use(urlEncoder);
app.use(jsonEncoder);

// logging
var morgan = require('morgan');
// app.use('/special', morgan('tiny'));

// static files
var path = require('path');
app.use('/static', express.static(path.join(__dirname, 'public')));

// nunjucks
/////// alt nunjucks configuration
///// point nunjucks to the proper directory for templates
///// nunjucks.configure('views'); 

// have res.render work with html files
app.set('view engine', 'html'); 
// when giving html files to res.render, tell it to use nunjucks
app.engine('html', nunjucks.render); 
nunjucks.configure('views', { noCache: true,
                              express: app });

// listening
var server = app.listen(3000);
var io = socketio.listen(server);

// routing with sockets
const routes = require('./routes');
app.use('/', routes(io));