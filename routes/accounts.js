var Account=require('../models/account');
var express=require('express');

var router=express.Router();

router.route('/accounts')
.get(function(req,res){
  Account.find(function(err,accounts){
    if(err) {
      res.send(err);
    }
    res.json(accounts);
  });
})

.post(function(req,res){
  var account=new Account(req.body);
  account.save(function(err){
    if(err) {
      res.send(err);
    }
    res.send({message:'Account Added'});
  });
});

router.route('/accounts/:id')
.put(function(req,res){
  Account.findOne({_id:req.params.id},function(err,account){
    if(err) {
      res.send(err);
    }

    for(prop in req.body){
      account[prop]=req.body[prop];
    }

    account.save(function(err) {

      if(err) {
        res.send(err);
      }
      res.json({ message: 'Account updated!' });
    });

  });
})

.get(function(req,res){
  Account.findOne({_id:req.params.id},function(err, account) {
    if(err) {
      res.send(err);
    }

    res.json(account);
  });
})

.delete(function(req,res){
  Account.remove({
    _id: req.params.id
  }, function(err, account) {
    if(err) {
      res.send(err);
    }

    res.json({ message: 'Successfully deleted' });
  });
});

module.exports=router;
