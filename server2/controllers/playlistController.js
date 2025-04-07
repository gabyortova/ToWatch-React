const { playlistModel } = require('../models');
const { newVideo } = require('./videoController');

function getPlaylists(req, res, next) {
  playlistModel
    .find()
    .populate('userId')
    .then((playlists) => res.json(playlists))
    .catch(next);
}

function getPlaylist(req, res, next) {
  const { playlistID } = req.params;

  playlistModel
    .findById(playlistID)
    .populate({
      path: 'videos',
      populate: {
        path: 'userId',
      },
    })
    .then((playlist) => res.json(playlist))
    .catch(next);
}

function createPlaylist(req, res, next) {
  const { playlistName, videoText } = req.body;
  const { _id: userId } = req.user;

  playlistModel
    .create({ playlistName, userId, subscribers: [userId] })
    .then((playlist) => {
      newVideo(videoText, userId, playlist._id).then(([_, updatedPlaylist]) =>
        res.status(200).json(updatedPlaylist)
      );
    })
    .catch(next);
}

function subscribe(req, res, next) {
  const playlistID = req.params.playlistID;
  const { _id: userId } = req.user;
  playlistModel
    .findByIdAndUpdate(
      { _id: playlistID },
      { $addToSet: { subscribers: userId } },
      { new: true }
    )
    .then((updatedPlaylist) => {
      res.status(200).json(updatedPlaylist);
    })
    .catch(next);
}

module.exports = {
  getPlaylists,
  createPlaylist,
  getPlaylist,
  subscribe,
};
