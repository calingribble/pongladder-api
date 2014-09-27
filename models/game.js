var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema=new Schema({
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  winnerPoints: {
    type: Number,
    default: 21,
    required: true
  },
  loserPoints: {
    type: Number,
    default: 0,
    required: true
  }
});

module.exports=mongoose.model('Game', gameSchema);
