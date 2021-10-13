const { query, param } = require('express-validator');
const { Router } = require('express');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../Controllers/usersController');
const validations = require('../Middlewares/validations');
const fieldValidation = require('../Middlewares/fieldValidation');

const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
    query('lastName').isString().trim(),
    query('telephone').isString().trim(),
    query('direction').isString().trim(),
    query('dni').isString().trim(),
  ],
  getUsers
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getUser);