var Game=require('../models/game');
var Player=require('../models/player');
var elo = require('elo-rank')(15);
var express=require('express');

var router=express.Router();


//var playerA = 1200;
//var playerB = 1400;


////Gets expected score for first parameter
//var expectedScoreA = elo.getExpected(winnerdocs.rating,loserdocs.rating);
//var expectedScoreB = elo.getExpected(loserdocs.rating,winnerdocs.rating);

////update score, 1 if won 0 if lost
//winnerdocs.rating = elo.updateRating(expectedScoreA,1,winnerdocs.rating);
//loserdocs.rating = elo.updateRating(expectedScoreB,0,loserdocs.rating);

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
  var winnername = req.body.winner[0];
  var losername = req.body.loser[0];
  var game = new Game({});
  var loser, winner, pointsExchanged;
  Player.findOne({'name':winnername}, function(err,docswinner) {
    winner = docswinner;
    game.winner = winner;
    Player.findOne({'name':losername}, function(err,docsloser) {
      loser = docsloser;
      game.loser = loser;
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
        docsloser.losses-=1;
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
