const { request, response } = require('express');
const { validationResult } = require('express-validator');

const fieldValidations = (req = request, res = response, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json(errors);
  }
};

module.exports = fieldValidations;