var express = require('express');
var router = express.Router();

// Require controller modules.
var game_controller = require('../controllers/gameController');
var genre_controller = require('../controllers/genreController');

/// game ROUTES ///

// GET catalog home page.
router.get('/', game_controller.index);

// GET request for creating a game. NOTE This must come before routes that display game (uses id).
router.get('/game/create', game_controller.game_create_get);

// POST request for creating game.
router.post('/game/create', game_controller.game_create_post);

// GET request to delete game.
router.get('/game/:id/delete', game_controller.game_delete_get);

// POST request to delete game.
router.post('/game/:id/delete', game_controller.game_delete_post);

// GET request to update game.
router.get('/game/:id/update', game_controller.game_update_get);

// POST request to update game.
router.post('/game/:id/update', game_controller.game_update_post);

// GET request for one game.
router.get('/game/:id', game_controller.game_detail);


// /// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genre_controller.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', genre_controller.genre_create_post);

// GET request for one Genre.
router.get('/genre/:id', genre_controller.genre_detail);




module.exports = router;
