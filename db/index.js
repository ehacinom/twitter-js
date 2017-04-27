const pg = require('pg')

let pgurl = "postgres://localhost:5432/twitterdb";
let client = new pg.Client(pgurl);

client.connect();
module.exports = client;