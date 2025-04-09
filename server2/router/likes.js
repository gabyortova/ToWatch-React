const express = require("express");
const router = express.Router();
const { auth } = require("../utils");
const { videoController } = require("../controllers");

// middleware that is specific to this router

router.get("/like-count/:videoId", auth(), videoController.getLikeCount);

router.get("/like-status/:videoId", auth(), videoController.likeStatus);

router.post("/like/:videoId", auth(), videoController.like); //post
router.post("/unlike/:videoId", auth(), videoController.unlike); //post

module.exports = router;
