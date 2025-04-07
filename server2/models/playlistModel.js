const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const playlistSchema = new mongoose.Schema({
    playlistName: {
        type: String,
        required: true
    },
    // subscribers: [{
    //     type: ObjectId,
    //     ref: "User"
    // }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    videos: [{
        type: ObjectId,
        ref: "Video"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Playlist', playlistSchema);
