const express = require( 'express' );
const app = express(); // creates an instance of an express application
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
// ALTERNATE
// app.set('view engine', 'html'); // have res.render work with html files
// app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
// nunjucks.configure('views'); // point nunjucks to the proper directory for templates
//
nunjucks.configure('views', {noCache: true,
                             express: app});


// END NUNJUCKS SECTION
// *************************

app.get('/',function(request,response){
    response.render('index.html',locals);
});

app.listen(3000);
