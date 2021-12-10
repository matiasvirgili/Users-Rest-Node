const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validationStringContainNumbers');

const validations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('lastName', 'Last name is required').notEmpty().isString().trim(),
    body('telephone', 'Telephone is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('direction', 'Direction  is required').notEmpty().isString().trim(),
    body('dni', 'Dni is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('email', 'Email is required').notEmpty().isEmail().trim(),
    body('password', 'Password is required').notEmpty().isString().trim(),
  ];
};

module.exports = validations;
