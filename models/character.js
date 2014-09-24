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
    message: 'Name should contain alphabetic characters only'
  })
];

var characterSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: nameValidator
  },
  experience: {
    type: Number,
    default: 0
  }
});

module.exports=mongoose.model('Character', characterSchema);
