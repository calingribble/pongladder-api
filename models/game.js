var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema=new Schema({
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  winnerPoints: {
    type: Number,
    default: 21
  },
  loserPoints: {
    type: Number,
    default: 0
  }
});

module.exports=mongoose.model('Game', gameSchema);
