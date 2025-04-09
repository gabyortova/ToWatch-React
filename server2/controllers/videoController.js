const { userModel, playlistModel, videoModel } = require('../models');

function newVideo(text, userId) {
  return videoModel.create({ text, userId }).then((video) => {
    return Promise.all([
      userModel.updateOne({ _id: userId }, { $push: { videos: video._id } }),
      // playlistModel.findByIdAndUpdate(
      //   { _id: playlistId },
      //   { $push: { videos: video._id }, $addToSet: { subscribers: userId } },
      //   { new: true }
      // ),
    ]);
  });
}

function getVideo(req, res, next) {
  const { videoId } = req.params;

  videoModel
    .findById(videoId)
    // .populate('userId') // Populate user details if needed
    .then((video) => {
      if (!video) {
        // If no video is found, send a 404 response
        return res.status(404).json({ message: 'Video not found' });
      }

      // Send the video details as the response
      res.status(200).json(video);
    })
    .catch((err) => {
      // Log the error and pass it to the error-handling middleware
      console.error('Error fetching video:', err);
      next(err);
    });
}

function getUserVideos(req, res, next) {
  const { _id: userId } = req.user;
  console.log('getUserVideos userid ' + userId);
  videoModel
    .find({ userId: userId })
    .sort({ created_at: -1 })
    // .populate('playlistId userId')
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch(next);
}

function getLatestsVideos(req, res, next) {
  const limit = Number(req.query.limit) || 0;

  videoModel
    .find({ isPublic: true })
    .sort({ created_at: -1 })
    .limit(limit)
    // .populate('playlistId userId')
    .then((videos) => {
      res.status(200).json(videos);
    })
    .catch(next);
}

function createVideo(req, res, next) {
  console.log('create');
  console.log('user' + req.user);
  
  const { title, videoUrl, description, imgUrl, isPublic } = req.body;
  const { _id: userId } = req.user;
  console.log('userid ' + userId);
  
  console.log(
    `title: ${title}, videoUrl: ${videoUrl}, description: ${description}, imgUrl: ${imgUrl}, userid: ${userId}`
  );
  
  videoModel
    .create({ userId, title, videoUrl, description, imgUrl, isPublic })
    .then((video) => {
      return res.status(200).json(video);
    })
    .catch(next);
}

function editVideo(req, res, next) {
  const { videoId } = req.params;
  const { title, videoUrl, description, imgUrl, isPublic } = req.body;
  const { _id: userId } = req.user;

  console.log('----------------');
  console.log('user id ' + userId);
  console.log('video id ' + videoId);
  console.log('----------------');

  

  videoModel
    .findOneAndUpdate(
      { _id: videoId, userId },
      { title, videoUrl, description, imgUrl, isPublic },
      { new: true, runValidators: true }
    )
    .then((updatedVideo) => {
      if (updatedVideo) {
        res.status(200).json(updatedVideo);
      } else {
        res
          .status(403)
          .json({ message: 'Not allowed! You are not the owner.' });
      }
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: 'Something went wrong.', error: err.message });
    });
}

function deleteVideo(req, res, next) {
  const { videoId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    videoModel.findOneAndDelete({ _id: videoId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { videos: videoId } }),
    // playlistModel.findOneAndUpdate(
      // { _id: playlistId },
    //   { $pull: { videos: videoId } }
    // ),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function like(req, res, next) {
  const { videoId } = req.params;
  const { _id: userId } = req.user;

  videoModel
    .updateOne(
      { _id: videoId },
      { $addToSet: { likes: userId } },
      { new: true }
    )
    .then(() => res.status(200).json({ message: 'Liked successful!' }))
    .catch(next);
}

function getPublicVideos(params) {
  
}

module.exports = {
  getVideo,
  getLatestsVideos,
  getUserVideos,
  newVideo,
  createVideo,
  editVideo,
  deleteVideo,
  like,
};
