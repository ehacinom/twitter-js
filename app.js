// creates an instance of an express application
const express = require( 'express' );
const app = express(); 

// templating
var nunjucks = require('nunjucks');

// routing
const routes = require('./routes');
app.use('/', routes);

// logging
var morgan = require('morgan');
app.use('/special', morgan('tiny'));

// static files
app.use(express.static('public'));


// BEGIN NUNJUCKS SECTION
// *************************
var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
///// alt nunjucks configuration
// point nunjucks to the proper directory for templates
// nunjucks.configure('views'); 

// have res.render work with html files
app.set('view engine', 'html'); 
// when giving html files to res.render, tell it to use nunjucks
app.engine('html', nunjucks.render); 
nunjucks.configure('views', {noCache: true,
                             express: app});


// END NUNJUCKS SECTION
// *************************

app.get('/',function(request,response){
    response.render('index', locals);
});

app.listen(3000);
