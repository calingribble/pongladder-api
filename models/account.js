var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var validateUniqueEmail = function(value, callback) {
  var Account = mongoose.model('Account');
  Account.find({
    $and: [{
      email: value }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, account) {
    callback(err || account.length === 0);
  });
};

var passwordExistenceValidator = [
  validate({
    validator: function(v){
      return v;
    },
    message: 'You must provide a password'
  })
];

var characterLimitValidator = [
  validate({
    validator: function(v){
      return v.length > 10;
    },
    message: 'You can only have 10 characters per account'
  })
];

var accountSchema=new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: [validateUniqueEmail, 'E-mail address is already in-use'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  hashed_password: {
    type: String,
    validate: passwordExistenceValidator
  },
  salt: {
    type: String
  },
  roles: {
    type: Array,
    default: ['authenticated']
  },
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
    validate: characterLimitValidator
  }]
});

accountSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.hashPassword(password);
})
.get(function() {
  return this._password;
});

accountSchema.methods = {
  authenticate: function(plainText) {
    return this.hashPassword(plainText) === this.hashed_password;
  },
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },
  hashPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
}

module.exports=mongoose.model('Account', accountSchema);
