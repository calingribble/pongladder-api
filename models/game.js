var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema=new Schema({
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  loser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }
});

module.exports=mongoose.model('Game', gameSchema);
