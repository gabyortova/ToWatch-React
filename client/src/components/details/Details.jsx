import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  useDeleteVideo,
  useLikeStatus,
  useLikeVideo,
  useUnlikeVideo,
  useVideo,
  useGetLikeCount,
} from "../../api/videoApi";
import { useUserContext } from "../contexts/UserContex";
import useAuth from "../hooks/useAuth";
import "./Details.css";

export default function Details() {
  const { videoId } = useParams();
  const { data: video } = useVideo(videoId);

  const { isAuthenticated } = useAuth();
  const { _id } = useUserContext();

  const { mutate: deleteVideo } = useDeleteVideo();

  const { mutate: likeVideo } = useLikeVideo();
  const { mutate: unlikeVideo } = useUnlikeVideo();

  const { data: likeCountData } = useGetLikeCount(videoId);
  const { data: likeStatusData } = useLikeStatus(videoId);

  const navigate = useNavigate();

  const isLiked = likeStatusData?.isLiked ?? false;
  const likeCount = likeCountData?.likeCount ?? 0;

  const deleteVideoHandler = () => {
    if (confirm("Are you sure you want to delete this video?")) {
      deleteVideo(videoId);

      navigate("/my-videos");
    }
  };

  const likeVideoHandler = async () => {
    try {
      await likeVideo(videoId);
    } catch (error) {
      console.error("Error liking video: ", error);
    }
  };

  const unlikeVideoHandler = async () => {
    try {
      await unlikeVideo(videoId);
    } catch (error) {
      console.error("Error unliking video: ", error);
    }
  };

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }

  // if (!video) {
  //   return <h1>Video not found</h1>;
  // }

  return (
    <div className="big-container details-container">
      <h1>Video Details</h1>

      <h2>Title:</h2>
      <p>{video?.title}</p>

      <img src={video?.imgUrl} alt="img" />

      <h2>Description:</h2>
      <p>{video?.description}</p>

      <h2>Created at:</h2>
      <p>{video?.created_at}</p>

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
        <a href={video?.videoUrl} className="button" target="_blank">
          Watch Video
        </a>

        {_id == video?.userId && (
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
