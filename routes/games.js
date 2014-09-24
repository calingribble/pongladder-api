var Game=require('../models/game');
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
  var game=new Game(req.body);
  game.save(function(err){
    if(err) {
      res.send(err);
    }
    res.send({message:'Game Added'});
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
