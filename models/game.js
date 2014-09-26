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
  }
});

module.exports=mongoose.model('Game', gameSchema);
