// express routing
const router = require('express').Router();

// utils
const tweetBank = require('../tweetBank.js');

// export to app.js
// routing in here to make use of io
module.exports = function (io) { 
    // main page
    router.get('/', function (req, res) {
        let tweets = tweetBank.list();
        res.render('index', { tweets: tweets , showForm: true });
    });

    // person tweets
    router.get('/users/:name', function (req, res) {
        let tweets = tweetBank.find({ name: req.params.name });
        res.render('index', { tweets: tweets, 
                              showForm: true, 
                              name: req.params.name });
    });

    // individual tweets
    router.get('/tweets/:id', function (req, res) {
        res.render('index', { tweets: tweetBank.find( {id: +req.params.id} ) });
    });

    // posting a tweet
    router.post('/tweets', function (req, res) {
        // post!
        let name = req.body.name, 
            tweet = req.body.text;
        tweetBank.add(name, tweet);
        
        // emit to socket! YAY!
        // problems if exact same tweet???
        let newTweet = tweetBank.find( { name: name, content: tweet } )[0];
        io.sockets.emit('newTweet', newTweet);
        
        // redirect
        res.redirect('/users/' + name);
    });
    
    
    return router;
}
