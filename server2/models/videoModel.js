const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
    },
    isPublic: {
      type: Boolean,
    },
    likes: [{
      type: ObjectId,
      ref: 'User',
    }],
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    // playlistId: {
    //     type: ObjectId,
    //     ref: "Playlist"
    // },
  },
  { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Video', videoSchema);
