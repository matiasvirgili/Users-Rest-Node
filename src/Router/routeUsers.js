const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  login,
} = require('../Controller/usersController');
const validations = require('../Middlewares/validations');
const loginValidations = require('../Middlewares/loginvalidations');
const fieldValidation = require('../Middlewares/fieldValidations');
const isLoggedIn = require('../Middlewares/isLoggedIn');
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

router.get(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  getUser
);

router.post('/', [...validations(), fieldValidation], 
isLoggedIn, 
postUser);

router.put(
  '/:id',
  [param('id').isMongoId(), ...validations(), fieldValidation],
  isLoggedIn,
  putUser
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteUser
);

router.post('/login', [...loginValidations(), fieldValidation], login);

module.exports = router;
