// express routing
const router = require('express').Router();

// utils
const tweetBank = require('../tweetBank.js');

// main page
router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render('index', { tweets: tweets });
});


module.exports = router;
