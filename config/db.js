const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String
});

// Virtual field to store plain password entered by the user
userSchema.virtual('password')
.set(function(password) {
  this._password = password;
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hashed_password = this.encryptPassword(password);
})
.get(function() {
  return this._password;
});

// Methods to hash the password
userSchema.methods = {
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  }
};

module.exports = mongoose.model('User', userSchema);
