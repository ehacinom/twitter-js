const express = require( 'express' );
// creates an instance of an express application
const app = express(); 
var morgan = require('morgan');
var nunjucks = require('nunjucks');

//app.use(morgan('tiny'));
app.use('/special',morgan('tiny'));

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
// have res.render work with html files
// app.set('view engine', 'html'); 
// when giving html files to res.render, tell it to use nunjucks
// app.engine('html', nunjucks.render); 
// point nunjucks to the proper directory for templates
// nunjucks.configure('views'); 
//
nunjucks.configure('views', {noCache: true,
                             express: app});


// END NUNJUCKS SECTION
// *************************

app.get('/',function(request,response){
    response.render('index.html',locals);
});

app.listen(3000);
