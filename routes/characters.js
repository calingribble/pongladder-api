var Character=require('../models/character');
var express=require('express');

var router=express.Router();

router.route('/characters')
.get(function(req,res){
  Character.find(function(err,characters){
    if(err) {
      res.send(err);
    }
    res.json(characters);
  });
})

.post(function(req,res){
  var character=new Character(req.body);
  character.save(function(err){
    if(err) {
      res.send(err);
    }
    res.send({message:'Character Added'});
  });
});

router.route('/characters/:id')
.put(function(req,res){
  Character.findOne({_id:req.params.id},function(err,character){
    if(err) {
      res.send(err);
    }

    for(prop in req.body){
      character[prop]=req.body[prop];
    }

    character.save(function(err) {

      if(err) {
        res.send(err);
      }
      res.json({ message: 'Character updated!' });
    });

  });
})

.get(function(req,res){
  Character.findOne({_id:req.params.id},function(err, character) {
    if(err) {
      res.send(err);
    }

    res.json(character);
  });
})

.delete(function(req,res){
  Character.remove({
    _id: req.params.id
  }, function(err, character) {
    if(err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports=router;
