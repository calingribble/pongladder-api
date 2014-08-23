var mongoose = require('mongoose');

module.exports = mongoose.model('Game', {
	name: {type : String, default: '' },
	time: {type : String, default: '' },
  winner: {type : String, default: ''},
  loser: {type : String, default: ''},
  winner_score: {type : Number, default: 0},
  loser_score: {type : Number, default: 0}
});
