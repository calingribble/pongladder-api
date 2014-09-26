var Player=require('../models/player');
var express=require('express');

var router=express.Router();


router.route('/players')
.get(function(req,res){
  Player.find(function(err,players){
    if(err) {
      res.send(err);
    }
    res.json(players);
  });
})

.post(function(req,res){
  var player=new Player(req.body);
  player.save(function(err){
    if(err) {
      res.send(err);
    }
    res.send({message:'Player Added'});
  });
});

router.route('/players/:id')
.put(function(req,res){
  Player.findOne({_id:req.params.id},function(err,player){
    if(err) {
      res.send(err);
    }

    for(prop in req.body){
      player[prop]=req.body[prop];
    }

    player.save(function(err) {

      if(err) {
        res.send(err);
      }
      res.json({ message: 'Player updated!' });
    });

  });
})

.get(function(req,res){
  Player.findOne({_id:req.params.id},function(err, player) {
    if(err) {
      res.send(err);
    }

    res.json(player);
  });
})

.delete(function(req,res){
  Player.remove({
    _id: req.params.id
  }, function(err, player) {
    if(err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports=router;
