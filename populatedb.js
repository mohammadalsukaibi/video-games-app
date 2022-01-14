var async = require('async')
var Game = require('./models/game')
var Genre = require('./models/genre')
const mongoose = require('mongoose')

const mongoDB = 'mongodb+srv://mohammad:1q2w3e4r5t@cluster0.9g8rd.mongodb.net/Cluster1?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// run();

// async function run(){

//   const game = await Game.create({title : 'gameTitle2', summary: 'this is a summary2','Action' })
//   console.log(game);
// }

var genres = []
var games = []


function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function gameCreate(title, summary, genre, cb) {
  gamedetail = { 
    title: title,
    summary: summary,
  }
  if (genre != false) gamedetail.genre = genre
    
  var game = new Game(gamedetail);    
  game.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New game: ' + game);
    games.push(game)
    cb(null, game)
  }  );
}



function createGenre(cb) {
    async.series([
        function(callback) {
          genreCreate("Horror", callback);
        },
        function(callback) {
          genreCreate("Sandbox", callback);
        },
        function(callback) {
          genreCreate("Action", callback);
        },
        ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel([
        function(callback) {
          gameCreate('Test Book 1', 'Summary of test book 1', [genres[0],genres[1]], callback);
        },
        function(callback) {
          gameCreate('Test Book 2', 'Summary of test book 2', [genres[2]], callback)
        }
        ],
        // optional callback
        cb);
}


async.series([
    createGenre,
    createBooks,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


