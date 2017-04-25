// express routing
const router = require('express').Router();

// utils
const tweetBank = require('../tweetBank.js');

// main page
router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets , showForm: true });
});

// person tweets
router.get('/users/:name', function (req, res) {
    let tweets = tweetBank.find({name: req.params.name});
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
    let name = req.body.name, 
        tweet = req.body.text;
    tweetBank.add(name, tweet);
    res.redirect('/users/'+name);
});

// export to app.js
module.exports = router;
