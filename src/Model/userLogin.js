const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userLogin = new Schema({
  email: String,
  password: String,
});

userLogin.methods.ecryptPassword = (password) => {
  return bcrypt.hashSync(password.bcrypt.getSaltSync(10));
};

userLogin.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('userLogin', userLogin);
