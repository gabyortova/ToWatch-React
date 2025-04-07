// const express = require('express');
// const router = express.Router();
// const { auth } = require('../utils');
// const { playlistController, videoController } = require('../controllers');

// // middleware that is specific to this router

// router.get('/', playlistController.getPlaylists);
// router.post('/', auth(), playlistController.createPlaylist);

// router.get('/:playlistId', playlistController.getPlaylist); //theme
// router.post('/:playlistId', auth(), videoController.createVideo); //theme
// router.put('/:playlistId', auth(), playlistController.subscribe); //theme
// router.put('/:playlistId/videos/:videoId', auth(), videoController.editVideo); //posts
// router.delete(
//   '/:playlistId/videos/:videoId',
//   auth(),
//   videoController.deleteVideo
// ); //posts

// // router.get('/my-trips/:id/reservations', auth(), playlistController.getReservations);

// module.exports = router;
