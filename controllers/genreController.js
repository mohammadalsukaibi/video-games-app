var Genre = require('../models/genre');
var Game = require('../models/game');
var async = require('async');

// Display list of all Genre.
exports.genre_list = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre list');
};

// Display detail page for a specific Genre.
exports.genre_detail = function(req, res) {

    async.parallel({
        genre: function(callback){
            Genre.findById(req.params.id)
                .exec(callback)
        },

        genre_games: function(callback){
            Game.find({'genre': req.params.id})
                .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre==null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_games: results.genre_games } )
    })
};

// Display Genre create form on GET.
exports.genre_create_get = function(req, res) {
    
    res.render('genre_form')
};

// Handle Genre create on POST.
exports.genre_create_post = function(req, res) {

    var genre = new Genre({ 
        name: req.body.name,
        image: req.body.image 
        
        }
    );

    Genre.findOne({'name': req.body.name})
    .exec( function(err, found_genre) {
        if (err) { return next(err); }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        }
        else {

          genre.save(function (err) {
            if (err) { return next(err); }
            // Genre saved. Redirect to genre detail page.
            res.redirect('/catalog');
          });

        }

      });
};

// Display Genre delete form on GET.
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};