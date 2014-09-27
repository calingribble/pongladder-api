var Game=require('../models/game');
var Player=require('../models/player');
var elo = require('elo-rank')(15);
var express=require('express');

var router=express.Router();

router.route('/games')
.get(function(req,res){
  Game.find(function(err,games){
    if(err) {
      res.send(err);
    }
    res.json(games);
  });
})

.post(function(req,res){
  if(req.body.winner[0] && req.body.loser[0]){
  var winnername = req.body.winner[0];
  var losername = req.body.loser[0];
  var winnerpoints = req.body.winnerPoints;
  var loserpoints = req.body.loserPoints;
  var game = new Game({});
  var loser, winner;
  Player.findOne({'name':winnername}, function(err,docswinner) {
    winner = docswinner;
    game.winner = winner;
    Player.findOne({'name':losername}, function(err,docsloser) {
      loser = docsloser;
      game.loser = loser;
      game.winnerPoints = winnerpoints;
      game.loserPoints = loserpoints;
      game.save(function(err){

      if(docswinner.rating < 2100){
        elo.setKFactor(32);
      }else if(docswinner.rating < 2400) {
        elo.setKFactor(24);
      } else {
        elo.setKFactor(16);
      }
      var expectedScoreWinner = elo.getExpected(docswinner.rating,docsloser.rating);
      if(docsloser.rating < 2100){
        elo.setKFactor(32);
      }else if(docsloser.rating < 2400) {
        elo.setKFactor(24);
      } else {
        elo.setKFactor(16);
      }
      var expectedScoreLoser = elo.getExpected(docsloser.rating,docswinner.rating);

      if(docswinner.rating < 2100){
        elo.setKFactor(32);
      }else if(docswinner.rating < 2400) {
        elo.setKFactor(24);
      } else {
        elo.setKFactor(16);
      }
      docswinner.rating = elo.updateRating(expectedScoreWinner,1,docswinner.rating);
      if(docsloser.rating < 2100){
        elo.setKFactor(32);
      }else if(docsloser.rating < 2400) {
        elo.setKFactor(24);
      } else {
        elo.setKFactor(16);
      }
      docsloser.rating = elo.updateRating(expectedScoreLoser,0,docsloser.rating);
        docswinner.wins+=1;
        docsloser.losses+=1;
        docswinner.pointsFor=Number(docswinner.pointsFor)+Number(winnerpoints);
        docswinner.pointsAgainst=Number(docswinner.pointsAgainst)+Number(loserpoints);
        docsloser.pointsFor=Number(docsloser.pointsFor)+Number(loserpoints);
        docsloser.pointsAgainst=Number(docsloser.pointsAgainst)+Number(winnerpoints);
        if(err) {
          res.send(err);
        }
        docswinner.save(function (err) {
          if (err) return handleError(err);
          res.send(docswinner);
        });
        docsloser.save(function (err) {
          if (err) return handleError(err);
          res.send(docswinner);
        });
        res.send({message:'Game Added'});
      });
    });
  });
  }
});

router.route('/games/:id')
.put(function(req,res){
  Game.findOne({_id:req.params.id},function(err,game){
    if(err) {
      res.send(err);
    }

    for(prop in req.body){
      game[prop]=req.body[prop];
    }

    game.save(function(err) {

      if(err) {
        res.send(err);
      }
      res.json({ message: 'Game updated!' });
    });

  });
})

.get(function(req,res){
  Game.findOne({_id:req.params.id},function(err, game) {
    if(err) {
      res.send(err);
    }

    res.json(game);
  });
})

.delete(function(req,res){
  Game.remove({
    _id: req.params.id
  }, function(err, game) {
    if(err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports=router;
