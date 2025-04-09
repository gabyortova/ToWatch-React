import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useDeleteVideo,
  useLikeStatus,
  useLikeVideo,
  useUnlikeVideo,
  useVideo,
  useGetLikeCount,
} from "../../api/videoApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import useAuth from "../hooks/useAuth";
import "./Details.css";
import { useUserContext } from "../contexts/UserContex";

export default function Details() {
  const { videoId } = useParams();
  const { video } = useVideo(videoId);

  const { isAuthenticated } = useAuth();
  const { _id } = useUserContext()

  const { deleteVideo } = useDeleteVideo();

  const { likeVideo } = useLikeVideo();
  const { unlikeVideo } = useUnlikeVideo();

  const { getLikeStatus } = useLikeStatus();
  const { getLikeCount } = useGetLikeCount();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await getLikeCount(videoId);
        setLikeCount(response.likeCount);
      } catch (error) {
        console.error("Error fetching like count: ", error);
      }
    };

    fetchLikeCount();
  }, [videoId, getLikeCount, isLiked]);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      const data = await getLikeStatus(videoId);
      setIsLiked(data.isLiked);
    };

    if (isAuthenticated) {
      fetchLikeStatus();
    }
  }, [videoId, getLikeStatus, isAuthenticated]);

  const deleteVideoHandler = () => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideo(videoId);

      navigate("/my-videos");
    }
  };

  const likeVideoHandler = async () => {
    try {
      await likeVideo(videoId);
      setIsLiked(true);
    } catch (error) {
      console.error("Error liking video: ", error);
    }
  };

  const unlikeVideoHandler = async () => {
    try {
      await unlikeVideo(videoId);
      setIsLiked(false);
    } catch (error) {
      console.error("Error unliking video: ", error);
    }
  };

  return (
    <div className="big-container details-container">
      <h1>Video Details</h1>
      <h2>Title:</h2>
      <p>{video.title}</p>

      <img src={video.imgUrl} alt="img" />
      <h2>Description:</h2>
      <p>{video.description}</p>

      <h2>Created at:</h2>
      <p>{video.created_at}</p>

      <div className="likes-container">
        <p>Likes {likeCount}</p>

        {isAuthenticated && (
          <button
            onClick={isLiked ? unlikeVideoHandler : likeVideoHandler}
            className="icon"
            title={isLiked ? "Unlike" : "Like"}
          >
            <FontAwesomeIcon
              icon={isLiked ? faHeart : faHeartRegular}
              style={{ color: "#612940" }}
            />
          </button>
        )}
      </div>

      <div className="buttons">
        <a href={video.videoUrl} className="button" target="_blank">
          Watch Video
        </a>

        {_id == video.userId && (
          <>
            <Link to={`/edit/${videoId}`} className="button">
              Edit
            </Link>
            <button onClick={deleteVideoHandler} className="button">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
