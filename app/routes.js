var Game = require('./models/game');
var moment = require('moment-timezone');
moment().format();

module.exports = function(app) {

  // api ---------------------------------------------------------------------
  // get all games
  app.get('/api/games', function(req, res) {

    // use mongoose to get all games in the database
    Game.find(function(err, games) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(games); // return all games in JSON format
    });
  });

  // create game and send back all games after creation
  app.post('/api/games', function(req, res) {

    // create a game, information comes from AJAX request from Angular
    Game.create({
      name: req.body.name,
      winner: req.body.winner,
      loser: req.body.loser,
      winner_score: req.body.winner_score,
      loser_score: req.body.loser_score,
      time: moment().tz("America/New_York").format("MMMM Do YYYY LT"),
      done: false
    }, function(err, game) {
      if (err)
        res.send(err);

      // get and return all the games after you create another
      Game.find(function(err, games) {
        if (err)
          res.send(err)
        res.json(games);
      });
    });

  });

  // delete a game
  app.delete('/api/games/:game_id', function(req, res) {
    Game.remove({
      _id : req.params.game_id
    }, function(err, game) {
      if (err)
        res.send(err);

      // get and return all the games after you create another
      Game.find(function(err, games) {
        if (err)
          res.send(err)
        res.json(games);
      });
    });
  });

  // application -------------------------------------------------------------
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
