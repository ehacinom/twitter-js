const express = require( 'express' );
const app = express(); // creates an instance of an express application
var morgan = require('morgan');

//app.use(morgan('tiny'));
app.use('/special',morgan('tiny'));

app.get('/',function(request,response){
  response.send("HERRO!");
});

app.listen(3000);
