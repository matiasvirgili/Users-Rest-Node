const { body } = require('express-validator');

const loginValidations = () => {
  return [
    body('email', 'Email is required').notEmpty().isEmail().trim(),
    body('password', 'Password is required').notEmpty().isString().trim(),
  ];
};

module.exports = loginValidations;
