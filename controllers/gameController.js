var Game = require('../models/game');
var Genre = require('../models/genre');
var async = require('async');



// homepage
exports.index = function(req, res){
    Genre.find({}).then(function (genres) {
        res.render('index', {genres: genres});
    });
}

// Display list of all games.
exports.game_list = function(req, res) {
    res.send('NOT IMPLEMENTED: game list');
};

// Display detail page for a specific game.
exports.game_detail = function(req, res) {

    Game.findById(req.params.id).then(function (game) {
        res.render('game_detail', {game: game});
    });

};

// Display game create form on GET.
exports.game_create_get = function(req, res) {
    Genre.find({}).then(function (genres) {
        res.render('game_form', {genres: genres});
    });
};

// Handle game create on POST.
exports.game_create_post = [
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre ==='undefined'){
                req.body.genre = [];
            }else{
                req.body.genre = new Array(req.body.genre);
            }
            
        }
        next();
    },

    (req, res, next) => {
        var game = new Game(
        {   title: req.body.title,
            summary: req.body.summary,
            genre: req.body.genre,
            image: req.body.image
        });

        game.save(function (err) {
            if (err) { return next(err); }
               //successful
               res.redirect(game.url);
            });
}
];

// Display game delete form on GET.
exports.game_delete_get = function(req, res) {
    Game.findById(req.params.id).then(function (game) {
        res.render('game_delete', {game: game});
    });
};

// Handle game delete on POST.
exports.game_delete_post = function(req, res) {
    Game.findByIdAndRemove(req.body.gameid, function deleteGame(err) {
        if (err) { return next(err); }
        // Success - go to author list
        res.redirect('/catalog')
    })
};

// Display game update form on GET.
exports.game_update_get = function(req, res) {


    async.parallel({
        game: function(callback) {
            Game.findById(req.params.id).exec(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
        }, function(err, results) {
            if (err) { return next(err); }
            if (results.game==null) { // No results.
                var err = new Error('game not found');
                err.status = 404;
                return next(err);
            }
            // Success.
            res.render('game_update_form', { genres: results.genres, game: results.game });
        });
};

// Handle game update on POST.
exports.game_update_post =[
    // Convert the genre to an array.
    (req, res, next) => {
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre ==='undefined'){
                req.body.genre = [];
            }else{
                req.body.genre = new Array(req.body.genre);
            }
            
        }
        next();
    },

    (req, res, next) => {
        var game = new Game(
        {   title: req.body.title,
            summary: req.body.summary,
            genre: req.body.genre,
            image: req.body.image,
            _id: req.params.id
        });

        Game.findByIdAndUpdate(req.params.id, game, {}, function (err) {
            if (err) { return next(err); }
               res.redirect(game.url);
        });
}
];