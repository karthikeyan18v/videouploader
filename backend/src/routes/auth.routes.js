// strmly-backend/src/routes/auth.routes.js
const router   = require('express').Router();
const authCtrl = require('../controllers/auth.controller');
const auth     = require('../middleware/auth');

router.post('/signup', authCtrl.signup);
router.post('/login',  authCtrl.login);
router.get('/profile', auth, authCtrl.profile);

module.exports = router;
