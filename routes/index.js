// express routing
const router = require('express').Router();

// utils
const tweetBank = require('../tweetBank.js');

// database client
const client = require('../db');

// export to app.js
// routing in here to make use of io
module.exports = function (io) { 
    // main page
    router.get('/', function (req, res) {
        // without database
        // let tweets = tweetBank.list();
        // res.render('index', { tweets: tweets , showForm: true });
        
        // with database
        let q = 'select * from tweets inner join users on users.id = tweets.user_id;';
        client.query(q, function (err, result) {
            if (err) throw err;
            res.render('index', { tweets: result.rows, showForm: true });
        });
    });

    // person tweets
    router.get('/users/:name', function (req, res) {
        // without database
        // let tweets = tweetBank.find({ name: req.params.name });
        // res.render('index', { tweets: tweets,
        //                       showForm: true,
        //                       name: req.params.name });
        
        // with database
        let name = req.params.name;
        let q = 'select * from tweets inner join users on ' + 
                'users.id = tweets.user_id where name = $1';
        client.query(q, [name], function (err, result) {
            if (err) throw err;
            res.render('index', {tweets: result.rows, showForm: true, name: name});
        });
    });

    // individual tweets
    router.get('/tweets/:id', function (req, res) {
        let id = +req.params.id,
            q = 'select users.name, tweets.id, tweets.content from tweets ' + 
                'join users on users.id = tweets.user_id where tweets.id = $1';
        client.query(q, [id], function (err, result) {
            res.render('index', { tweets: result.rows });
        });
    });

    // posting a tweet
    router.post('/tweets', function (req, res) {
        let name = req.body.name, 
            tweet = req.body.text;
        
        // function to insert tweet
        var insertTweet = function (user_id) {
            // put into tweet table
            let q = 'insert into tweets (user_id, content) values ($1, $2);';
            client.query(q, [user_id, tweet], function (err, result) {
                // redirect to poster's userpage
                res.redirect('/users/' + name);
                
                // emit to socket for other clients not making the request!
                let q_new_tweet = 'select * from tweets join users on ' + 
                                  'tweets.user_id = users.id where ' + 
                                  'users.name = $1 and tweets.content = $2';
                client.query(q_new_tweet, [name, tweet], function (err, result) {
                    // emit new tweet
                    io.sockets.emit('newTweet', result.rows[0]);
                });
            });
        };
        
        // with database
        // does user exist?
        let q_user_exists = 'select id from users where name = $1';
        client.query(q_user_exists, [name], function (err, result) {
            if (err) throw err;
            let user_id = result.rows[0]; // und or {id: 4}
            
            // if user DNE
            if (!user_id) {
                // create new user
                let q_new_user = 'insert into users (name) values ($1) returning id;';
                client.query(q_new_user, [name], function (err, result) {
                    
                    // use returning value
                    let user_id = result.rows[0].id;
                    
                    // insert tweet
                    insertTweet(user_id);
                });
            } else {
                // get user id from query
                user_id = user_id.id;
                
                // insert tweet
                insertTweet(user_id);
            }

        });
        
    });
    
    return router;
}
