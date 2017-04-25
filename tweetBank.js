const _ = require('lodash')

var data = [];
var counter = 0;

function add(name, content) {
    data.push({id: counter++, name: name, content: content});
}

function list() {
    return _.cloneDeep(data);
}

function find (properties) {
    return _.cloneDeep(_.filter(data, properties));
}

// 
module.exports = { add: add, list: list, find: find };


///// populate with tweets
const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 
    'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 
    'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 
    'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + 
    "! The instructors are just so " + randArrayEl(awesome_adj) + 
    ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}
module.exports.add( 'Ashialll', 'this is it');


// test
// console.log('hi')
// console.log(list())
// console.log(module.exports.find({name: 'Ashialll'}))