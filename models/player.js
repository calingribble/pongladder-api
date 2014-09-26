var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema = mongoose.Schema;

var nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [2, 20],
    message: 'Name should be between 2 and 20 characters'
  }),
  validate({
    validator: 'matches',
    arguments: /^[A-z]+$/,
    passIfEmpty: true,
    message: 'Name should contain alphabetic players only'
  })
];

var playerSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 1500
  }
});


module.exports=mongoose.model('Player', playerSchema);
