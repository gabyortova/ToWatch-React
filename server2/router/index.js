const router = require('express').Router();
const users = require('./users');
// const playlists = require('./playlists');
const videos = require('./videos');
const likes = require('./likes');
const test = require('./test');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
// router.use('/collections', playlists); //themes
router.use('/videos', videos);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
