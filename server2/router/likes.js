const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { videoController } = require('../controllers');

// middleware that is specific to this router

router.put('/:videoId', auth(), videoController.like); //post

module.exports = router
