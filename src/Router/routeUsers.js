const { query, param } = require('express-validator');
const { Router } = require('express');

const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
} = require('../Controller/usersController');
const validations = require('../Middlewares/validations');
const fieldValidation = require('../Middlewares/fieldValidations');

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

router.post('/', [...validations(), fieldValidation], postUser);

router.put('/:id', [param('id').isMongoId(), ...validations(), fieldValidation], putUser)

router.delete('/:id', [param('id').isMongoId(), fieldValidation], deleteUser);


module.exports = router;