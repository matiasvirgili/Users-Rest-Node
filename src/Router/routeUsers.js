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

const passport = require('passport')

router.get('/signup', (req, res, next) => {
  res.render('index')
});
router.post('/signup', passport.authenticate('local-singup', {
  successRedirect: '/',
  failureRedirect: '/singup',
  passReqToCallback: true
}));
router.get('/sigin', (req, res, next) =>{
  res.render('singup')
});
router.post('/signin', passport.authenticate('local-singin',{
  successRedirect: '/profile',
  failureRedirect: '/singin',
  passReqToCallback: true
}) );

router.get('/logout', (req, res, next) =>{
  req.logOut();
  res.redirect('/');
})

router.get('/profile', isAuthenticated, (req, res, next) => {
  res.render('profile');
})

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/')
}


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

router.put(
  '/:id',
  [param('id').isMongoId(), ...validations(), fieldValidation],
  putUser
);

router.delete('/:id', [param('id').isMongoId(), fieldValidation], deleteUser);

module.exports = router;
